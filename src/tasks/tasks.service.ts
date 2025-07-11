import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventService } from 'src/event/event.service';

@Injectable()
export class TasksService {

  service  = 'tasks';
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private eventService: EventService,
  ) { }
  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create(createTaskDto);
    const savedTask = await this.tasksRepository.save(task);
    await this.eventService.create({
      service: this.service,
      action: 'create',
      date: new Date(),
      changes: savedTask
    })
    return savedTask;
  }

  async findAll() {
    return await this.tasksRepository.find();
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    Object.assign(task, updateTaskDto);
    await this.eventService.create({
      service: this.service,
      action: 'update',
      date: new Date(),
      changes: task
    })
    return await this.tasksRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    const removedTask = await this.tasksRepository.remove(task);
    await this.eventService.create({
      service: this.service,
      action: 'delete',
      date: new Date(),
      changes: removedTask
    })
    return ;
  }
}
