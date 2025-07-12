import { BadRequestException, Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async find(options?: FindManyOptions): Promise<any[]> {
    if (options) {
      return await this.repository.find(options);
    } else {
      return await this.repository.find();
    }
  }

  async findOne(options: FindOneOptions): Promise<any> {
    const data = await this.repository.find(options);
    return data[0];
  }

  async abstractCreate(data: any): Promise<any> {
    const entity = this.repository.create(data);
    console.log(entity);
    const errors = await validate(entity);
    if (errors.length > 0) {
      const error = errors.map((e) => {
        return {
          target: e.target.constructor.name,
          error: {
            [e.property]: Object.values(e.constraints).join(' '),
          },
        };
      });
      throw new BadRequestException(error);
    }
    return await this.repository.save(entity);
  }

  async abstractUpdate(id: number, data: any): Promise<any> {
    const errors = await validate(data);
    if (errors.length > 0) {
      const error = errors.map((e) => {
        return {
          target: e.target.constructor.name,
          error: {
            [e.property]: Object.values(e.constraints).join(' '),
          },
        };
      });
      throw new BadRequestException(error);
    }
    return await this.repository.update(id, data);
  }

  async abstractRemove(data: any): Promise<any> {
    return await this.repository.delete(data);
  }
}
