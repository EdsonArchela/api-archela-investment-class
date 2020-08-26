import IClassRepository from '../../../repositories/IClassRepository';
import IClassDTO from '../../../dtos/IClassDTO';
import Class from '../entities/Class';
import { Repository, getRepository } from 'typeorm';

export default class ClassRepository implements IClassRepository {
  private ormRepository: Repository<Class>;

  constructor() {
    this.ormRepository = getRepository(Class);
  }
  update(_class: Class): Promise<Class> {
    throw new Error('Method not implemented.');
  }

  public async create({
    name,
    email,
    phone,
    patrimony,
    investments,
  }: IClassDTO): Promise<Class> {
    const _class = this.ormRepository.create({
      name,
      email,
      investments: JSON.stringify(investments),
      patrimony,
      phone,
    });
    return await this.ormRepository.save(_class);
  }

  public async unsubscribe(_class: Class): Promise<Class> {
    return await this.ormRepository.save({ ..._class, email: 'unsubscribed' });
  }

  public async findByEmail(email: string): Promise<Class | undefined> {
    const _class = await this.ormRepository.findOne({ where: { email } });
    return _class;
  }

  public async findById(id: string): Promise<Class | undefined> {
    const _class = await this.ormRepository.findOne(id);
    return _class;
  }

  public async findAll(): Promise<Class[]> {
    const classes = await this.ormRepository.find();
    return classes;
  }
}
