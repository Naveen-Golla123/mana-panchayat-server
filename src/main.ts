import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as hbs from 'hbs';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.use(cors());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.useStaticAssets(join(__dirname, '..', 'Public'));
  app.setBaseViewsDir(join(__dirname, '..', 'Views'));
  app.setViewEngine('hbs');

  app.enableCors({
    allowedHeaders: "*",
    //origin: ["https://naveen-golla123.github.io/"]
  });

  // Swagger setup 
  // const config = new DocumentBuilder()
  //   .setTitle('mana Panchayat')
  //   .setDescription('The cats API description')
  //   .setVersion('1.0')
  //   .addTag('Mana-panchayat')
  // //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
