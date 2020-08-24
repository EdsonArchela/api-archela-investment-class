import Class from '../infra/typeorm/entities/Class';
import { injectable, inject } from 'tsyringe';
import IClassRepository from '../repositories/IClassRepository';

@injectable()
export default class ListClassesService {
  constructor(
    @inject('ClassRepository')
    private classRepository: IClassRepository,
  ) {}

  public async execute(): Promise<Class[]> {
    const classes = await this.classRepository.findAll();
    return classes;
  }
}
