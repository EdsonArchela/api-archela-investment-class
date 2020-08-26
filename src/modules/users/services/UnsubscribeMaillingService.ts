import { injectable, inject } from 'tsyringe';
import IClassRepository from '../repositories/IClassRepository';

import AppError from '../../../shared/errors/AppError';

@injectable()
export default class UnsubscribeMaillingService {
  constructor(
    @inject('ClassRepository')
    private classRepository: IClassRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const user = await this.classRepository.findById(id);

    if (!user) throw new AppError('user not found');

    await this.classRepository.unsubscribe(user);
  }
}
