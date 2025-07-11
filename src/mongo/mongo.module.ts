import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import { EventSchema } from "src/event/schemas/event.schema";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_DATABASE', {
          infer: true,
        }),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
  ],
})
export class MongoModule { }