import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventService {
  constructor(@InjectModel('Event') private eventModel: Model<Event>) {}
  async create(createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel(createEventDto);
    return await newEvent.save();
  }

  async findAll() {
    const allEvents = await this.eventModel.find()
    return allEvents;
  }

  
}
