import { Context } from 'koa';
import { JWTHelper } from '../helpers/JWT';

export async function validateToken(ctx: Context, next) {
    const jwt = new JWTHelper();
    let token = ctx.headers['authorization'];
    if (!token) {
        ctx.status = 401;
        ctx.body = {code: 401, message: "Unauthorized, missing auth token"};
        return ctx;
    }

    token = token.replace('Bearer ', '');
    let error;
    
    await jwt.verify(token)
        .then()
        .catch(err => error = err)

    if (error) {
        ctx.status = 401;
        ctx.body = error;
        return ctx;
    }

    return next();
}