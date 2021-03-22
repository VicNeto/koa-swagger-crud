import * as Router from 'koa-router';
import { SwaggerRouter } from 'koa-swagger-decorator';
import { UserController } from '../users/controller';

const koaOpts = {
    prefix: '/api/v1',
};
const swaggerRouterOpts = {
    title: 'Bridgefy Users API',
    description: 'API DOC',
    version: '1.0.0',
    swaggerHtmlEndpoint: '/docs',
    swaggerJsonEndpoint: '/docs-json',
};

const apiRouter: any = new SwaggerRouter(koaOpts, swaggerRouterOpts);

apiRouter.swagger();

apiRouter.get('/version', async (ctx) => {
    ctx.body = {version:'1.0.0'};
});
apiRouter.get('/ping', async (ctx) => {
    ctx.body = "Pong";
});

apiRouter.map(UserController, { doValidation: false });

export { apiRouter };