import { SwaggerRouter } from 'koa-swagger-decorator';
import { UserController } from '../controllers/UserController';
import { SignController } from '../controllers/SignController';
import { validateToken } from '../middleware/Auth';
import { handler as ErrorHandler } from '../middleware/ErrorHandler';

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
apiRouter.map(SignController, { doValidation: true });

apiRouter.use(validateToken);
apiRouter.use(ErrorHandler);
apiRouter.map(UserController, { doValidation: true });

export { apiRouter };