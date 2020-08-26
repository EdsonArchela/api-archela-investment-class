import { container } from 'tsyringe';
import './providers';
import IClassRepository from '../../modules/users/repositories/IClassRepository';
import ClassRepository from '../../modules/users/infra/typeorm/repositories/ClassRepository';

container.registerSingleton<IClassRepository>(
  'ClassRepository',
  ClassRepository,
);
