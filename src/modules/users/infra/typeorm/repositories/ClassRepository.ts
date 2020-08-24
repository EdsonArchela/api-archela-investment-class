import IClassRepository from '../../../repositories/IClassRepository';
import IClassDTO from '../../../dtos/IClassDTO';
import Class from '../entities/Class';
import { Repository, getRepository } from 'typeorm';

export default class ClassRepository implements IClassRepository {
  private ormRepository: Repository<Class>;

  constructor() {
    this.ormRepository = getRepository(Class);
  }

  public async create({
    name,
    email,
    phone,
    patrimony,
    investments,
  }: IClassDTO): Promise<void> {
    const _class = this.ormRepository.create({
      name,
      email,
      investments: JSON.stringify(investments),
      patrimony,
      phone,
    });
    await this.ormRepository.save(_class);
  }

  public async findByEmail(email: string): Promise<Class | undefined> {
    const _class = await this.ormRepository.findOne({ where: { email } });
    return _class;
  }
  public async findAll(): Promise<Class[]> {
    const classes = await this.ormRepository.find();
    return classes;
  }
}
