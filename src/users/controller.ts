import {
    request,
    summary,
    query,
    tags,
    responses,
    description,
    middlewares,
} from 'koa-swagger-decorator';
import { Context } from 'koa';
import { commonResponse } from '../helpers/DocHelper';
import { UserService } from './service';

export class UserController {
    private _service: UserService;

    constructor(){
        this._service = new UserService;
    }

    @request('GET', '/users')
    @summary('Bridgefy users list')
    @description('Return the list of all the current users.')
    @responses(commonResponse)
    async list(ctx: Context) {
        const res = await this._service.all();
        ctx.status = res.status || 200;
        ctx.body = res.data || {};
    }

    @request('GET', '/users/:id')
    @summary('Bridgefy users detail')
    @description('Get the detail of a user query by id')
    @responses(commonResponse)
    async show(ctx: Context) {
        const res = await this._service.index(ctx.params.id);
        ctx.status = res.status || 200;
        ctx.body = res.data || {};
    }

    @request('POST', '/users')
    @summary('Create Bridgefy user')
    @description('Create a new bridgefy user.')
    @responses(commonResponse)
    async create(ctx: Context) {
        const res = await this._service.store(ctx.request.body);
        ctx.status = res.status || 201;
        ctx.body = res.data || {};
    }
}