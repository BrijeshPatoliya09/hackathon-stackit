import { dataSource } from '../../../core/data-source';
import { Users } from '../entity/users.entity';

export const userRepository = dataSource.getRepository(Users);
