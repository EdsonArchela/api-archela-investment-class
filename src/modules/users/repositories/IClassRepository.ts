import IClassDTO from '../dtos/IClassDTO';
import Class from '../infra/typeorm/entities/Class';

export default interface IClassRepository {
  create(data: IClassDTO): Promise<void>;
  findByEmail(email: string): Promise<Class | undefined>;
  findAll(): Promise<Class[]>;
}
