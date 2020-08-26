import { injectable, inject } from 'tsyringe';
import IClassRepository from '../repositories/IClassRepository';
import IInvestmentsDTO from '../dtos/IInvestmentsDTO';
import SendConfirmationEmailService from './SendConfirmationEmailService';
import Class from '../infra/typeorm/entities/Class';

interface IRequest {
  name: string;
  email: string;
  phone: string;
  patrimony: number;
  investments: string;
}

@injectable()
export default class CreateClassService {
  constructor(
    @inject('ClassRepository')
    private classRepository: IClassRepository,
  ) {}

  public async execute(data: IRequest): Promise<Class> {
    const user = await this.classRepository.findByEmail(data.email);

    if (user) return user;

    const investments: IInvestmentsDTO = JSON.parse(data.investments);

    return await this.classRepository.create({ ...data, investments });
  }
}
