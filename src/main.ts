import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
// import fastifyCookie from '@fastify/cookie';
// import { contentParser } from 'fastify-file-interceptor';
import * as hbs from 'express-handlebars';
import { ConfigService } from '@nestjs/config';
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
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const baseUrl = configService.get<string>('BASE_URL');
  var hbs = require('express-handlebars');
  var helpers = {
    readMeBlock: (id)=>{
      var res = `${baseUrl}/News/${id}`
      return res;
    }
  }
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine('hbs', hbs.engine({
    extname: 'hbs',
    helpers,
    defaultLayout: false
  }));
  app.setViewEngine('hbs');
  await app.listen(8000);
}

bootstrap();
