import {
    request,
    summary,
    responses,
    description,
} from 'koa-swagger-decorator';
import { Context } from 'koa';
import { commonResponse } from '../helpers/DocHelper';
import { User } from '../models/User';
import { JWTHelper as jwt } from '../helpers/JWT';

export class SignController {
    constructor() {}

    @request('POST', '/login')
    @summary('Login')
    @description('Login and get a JWT')
    @responses(commonResponse)
    async login(ctx: Context) {
        let user;

        await User.findOne({email: ctx.request.body.email})
            .then(doc => {
                user = doc;
            })
            .catch(err => {
                console.log(err);
            });
        if (!user) {
            ctx.status = 404;
            ctx.body = {'message': 'User not found' };
            return ctx;
        }
        const match = await jwt.sign(user.hash, ctx.request.body.password);
        if (!match) {
            ctx.status = 401;
            ctx.body = "Unauthorized";
            return ctx;
        }

        ctx.body = "Cool";
        // ctx.status = res.status || 201;
        // ctx.body = res.data || {};
    }
}