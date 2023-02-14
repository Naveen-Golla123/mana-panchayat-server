import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cors());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.enableCors({
    allowedHeaders: "*",
    origin: ["https://naveen-golla123.github.io/"]
  });
  // Swagger setup 
  const config = new DocumentBuilder()
    .setTitle('mana Panchayat')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('Mana-panchayat')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
