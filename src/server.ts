import * as Koa from 'koa';
import * as koaBody  from 'koa-body';
import * as logger  from 'koa-logger';
require('dotenv').config()
import { apiRouter } from './router/api';
import { MongoConfig } from './config/db';
import { Mongo } from './mongo';


const PORT = process.env['PORT'] || 3001;
const app = new Koa();

let mongoConfig = new MongoConfig({ 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = new Mongo(mongoConfig);
db.connect();

app.use(koaBody({ multipart: true }));
app.use(logger((str:any, args:any) => {
    console.log(`🤘 Log: ${str} `);
}));
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

const server = app.listen(PORT).on("close", (err:any) => {
  db.close();
  console.log(`💣 Server terminated`);
  process.exit(0);
});

app.on('error', err => {
    console.error('server error', err);
  });

console.log(`🚀 Server running on port ${PORT}`);