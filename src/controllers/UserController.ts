import {
    request,
    summary,
    responses,
    description,
    path,
    body,
} from 'koa-swagger-decorator';
import { Context } from 'koa';
import { commonResponse, updateBody, userBody } from '../helpers/DocHelper';
import { UserService } from '../services/UserService';

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

    @request('POST', '/users')
    @summary('Create user')
    @description('Create a new bridgefy user.')
    @body(userBody)
    @responses(commonResponse)
    async create(ctx: Context) {
        const body = ctx.validatedBody
        console.log(body);
        const res = await this._service.store(body);
        ctx.status = res.status || 201;
        ctx.body = res.data || {};
    }

    @request('GET', '/users/{id}')
    @summary('Get user detail')
    @description('Get the detail of a user query by id')
    @responses(commonResponse)
    @path({
        id: { type: 'string', required: true, description: 'id' },
      })
    async show(ctx: Context) {
        const { id } = ctx.validatedParams;
        const res = await this._service.show(id);
        ctx.status = res.status || 200;
        ctx.body = res.data || {};
    }

    @request('PUT', '/users/:id')
    @summary('Update user')
    @description('Get the detail of a user query by id')
    @body(updateBody)
    @responses(commonResponse)
    async update(ctx: Context) {
        const res = await this._service.update(ctx.params.id, ctx.request.body);
        ctx.status = res.status || 200;
        ctx.body = res.data || {};
    }

    @request('DELETE', '/users/:id')
    @summary('Delete user')
    @description('Delete a user query by id')
    @responses(commonResponse)
    async delete(ctx: Context) {
        const res = await this._service.destroy(ctx.params.id);
        ctx.status = res.status || 200;
        ctx.body = res.data || {};
    }
}