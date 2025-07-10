import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService:ConfigService) => ({
      type: 'postgres',
      host: configService.get('POSTGRES_DB_HOST'),
      port: configService.get('POSTGRES_DB_PORT'),
      username: configService.get('POSTGRES_DB_USERNAME'),
      password: configService.get('POSTGRES_DB_PASSWORD'),
      database: configService.get('POSTGRES_DB_DATABASE'),
      entities: [Task],
      autoLoadEntities: true,
      synchronize: true,
   })
    }),
    TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
