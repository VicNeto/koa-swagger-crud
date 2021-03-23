import * as Koa from 'koa';
import * as koaBody  from 'koa-body';
import * as logger  from 'koa-logger';
const cors = require('@koa/cors');
require('dotenv').config()
import { apiRouter } from './router/api';
import { MongoConfig } from './config/db';
import { Mongo } from './mongo';

const app = new Koa();

let mongoConfig = new MongoConfig({ 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
export const db = new Mongo(mongoConfig);

app.use(koaBody({ multipart: true }));
app.use(logger((str:any, args:any) => {
    console.log(`🤘 Log: ${str} `);
}));
app.use(cors({
        origin: '*',
    })
);
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

app.on('error', err => {
    console.error('server error', err);
});

export default app;