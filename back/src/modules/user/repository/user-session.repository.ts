import { dataSource } from '../../../core/data-source';
import { User } from '../entity/users.entity';

export const userRepository = dataSource.getRepository(User);
