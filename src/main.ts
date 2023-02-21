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

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  app.use(cookieParser());
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
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
