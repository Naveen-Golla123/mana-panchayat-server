import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Controllers/Auth/auth.module';
import { CategoryModule } from './Controllers/Category/category.module';
import { LabelsModule } from './Controllers/Labels/labels.module';
import { NewsModule } from './Controllers/News/news.module';
import { Category } from './Entities/Category.entity';
import { Labels } from './Entities/Labels.entity';
import { News } from './Entities/News.entity';
import { Users } from './Entities/Users.entity';
import { SharedService } from './Shared/SharedService';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: "baasu.db.elephantsql.com",
      type: "postgres",
      username: 'pbomcruv',
      password: '6YqMz3n1BfiIZCnaFBTyXiURB6OQCGp9',
      database: 'pbomcruv',
      entities : [News,Category,Labels,Users],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Users]),
    CategoryModule,
    LabelsModule,
    NewsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
