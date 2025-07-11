import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './postgres/postgres.module';
import { EventModule } from './event/event.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgresModule,
    MongoModule,
    TasksModule,
    EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
