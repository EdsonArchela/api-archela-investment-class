import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateClassService from '../../../services/CreateClassService';
import ListClassesService from '../../../services/ListClassesService';

export default class ClassController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createClassService = container.resolve(CreateClassService);

    await createClassService.execute(data);

    return response.status(204).json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { secret } = request.body;

    if (secret !== `edprogrammer:${process.env.APP_SECRET}`) {
      return response.status(404);
    }

    const listClassesService = container.resolve(ListClassesService);

    const classes = await listClassesService.execute();

    return response.json(classes);
  }
}
