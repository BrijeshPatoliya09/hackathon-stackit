import { dataSource } from 'src/core/data-source';
import { Tags } from '../entities/tag.entity';

export const tagRepository = dataSource.getRepository(Tags);
