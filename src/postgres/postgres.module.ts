import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "src/tasks/entities/task.entity";

@Module({
  imports: [
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
    TypeOrmModule.forFeature([Task]),
  ],
})
export class PostgresModule {}