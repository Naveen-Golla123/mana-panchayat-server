import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
// import * as cookieParser from 'cookie-parser';
// import fastifyCookie from '@fastify/cookie';
// import { contentParser } from 'fastify-file-interceptor';
import * as hbs from 'express-handlebars';
import {
  FastifyAdapter
} from '@nestjs/platform-fastify';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {

  // const CORS_OPTIONS = {
  //   origin: ['*'], // or '*' or whatever is required
  //   allowedHeaders: [
  //     'Access-Control-Allow-Origin',
  //     'Origin',
  //     'X-Requested-With',
  //     'Accept',
  //     'Content-Type',
  //     'Authorization',
  //   ],
  //   exposedHeaders: 'Authorization',
  //   credentials: true,
  //   methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  // };

  const adapter = new FastifyAdapter();
  //adapter.enableCors(CORS_OPTIONS)
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.use(require('cookie-parser'));



  var hbs = require('express-handlebars');
  var helpers = {
    readMeBlock: (id)=>{
      console.log(id)
      var res = `http://localhost:3000/News/${id}`
      return res;
    }
  }
  // hbs.registerHelper("readMeBlock", function (id) {
  //   console.log(id)
  //   var res = `http://localhost:3000/News/${id}`
  //   return res;
  // });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine('hbs', hbs.engine({
    extname: 'hbs',
    helpers,
    defaultLayout: false
    // defaultLayout: 'layout',
    // layoutsDir: __dirname + '/views/layout/',
    // partialsDir: __dirname + '/views/partials'
  }));
  app.setViewEngine('hbs');
  await app.listen(80);
}

bootstrap();
