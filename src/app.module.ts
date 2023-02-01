import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './Controllers/Category/category.module';
import { LabelsModule } from './Controllers/Labels/labels.module';
import { NewsModule } from './Controllers/News/news.module';
import { Category } from './Entities/Category.entity';
import { Labels } from './Entities/Labels.entity';
import { News } from './Entities/News.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: "baasu.db.elephantsql.com",
      type: "postgres",
      username: 'pbomcruv',
      password: '6YqMz3n1BfiIZCnaFBTyXiURB6OQCGp9',
      database: 'pbomcruv',
      entities : [News,Category,Labels],
      synchronize: true
    }),
    CategoryModule,
    LabelsModule,
    NewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
