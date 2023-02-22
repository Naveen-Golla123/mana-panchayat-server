import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import fastifyCookie from '@fastify/cookie';
import { contentParser } from 'fastify-file-interceptor';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {

  const CORS_OPTIONS = {
    origin: ['*'], // or '*' or whatever is required
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
    ],
    exposedHeaders: 'Authorization',
    credentials: true,
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  };

  const adapter = new FastifyAdapter();
  //adapter.enableCors(CORS_OPTIONS)
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );
  app.use(require('cookie-parser'));
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  var hbs = require('handlebars');

  hbs.registerHelper("readMeBlock", function (id) {
    console.log(id)
    var res = `http://localhost:3000/News/${id}`
    return res;
  });

  hbs.registerHelper("baseUrl", function (id) {
    var res = process.env.BASE_URL;
    return res;
  });

  app.setViewEngine({
    engine: {
      handlebars: hbs,
    },
    templates: join(__dirname, '..', 'views'),
  });
  app.register(contentParser);

  await app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });

  await app.listen(3000);
}

bootstrap();
