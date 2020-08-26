import IClassDTO from '../dtos/IClassDTO';
import Class from '../infra/typeorm/entities/Class';

export default interface IClassRepository {
  create(data: IClassDTO): Promise<Class>;
  findByEmail(email: string): Promise<Class | undefined>;
  findAll(): Promise<Class[]>;
  findById(id: string): Promise<Class | undefined>;
  unsubscribe(_class: Class): Promise<Class>;
}
