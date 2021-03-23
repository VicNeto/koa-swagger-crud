import {
    request,
    summary,
    responses,
    description,
} from 'koa-swagger-decorator';
import { Context } from 'koa';
import { commonResponse } from '../helpers/DocHelper';
import { User } from '../models/User';
import { JWTHelper} from '../helpers/JWT';

export class SignController {
    private jwt: JWTHelper;
    constructor() {
        this.jwt = new JWTHelper();
    }

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
        
        let token, error;
        await this.jwt.sign(user, ctx.request.body.password)
            .then(res => token = res)
            .catch(err => {
                console.log(err);
                error = err;
            });
        if (error) {
            ctx.status = 401;
            ctx.body = {message: "Unauthorized", code: 401};
            return ctx;
        }

        ctx.body = {token: token, message: "Login succesful"};
    }
}