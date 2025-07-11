import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventSchema } from "src/event/schemas/event.schema";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://delairi:delairi@localhost:27017/?authSource=admin'),
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
  ],
})
export class MongoModule {}