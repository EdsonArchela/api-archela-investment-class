import { injectable, inject } from 'tsyringe';
import IClassRepository from '../repositories/IClassRepository';
import IInvestmentsDTO from '../dtos/IInvestmentsDTO';

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

  public async execute(data: IRequest): Promise<void> {
    const user = await this.classRepository.findByEmail(data.email);

    if (user) return;

    const investments: IInvestmentsDTO = JSON.parse(data.investments);

    await this.classRepository.create({ ...data, investments });
  }
}
