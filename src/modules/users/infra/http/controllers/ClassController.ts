import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateClassService from '../../../services/CreateClassService';
import ListClassesService from '../../../services/ListClassesService';
import SendConfirmationEmailService from '../../../services/SendConfirmationEmailService';
import UnsubscribeMaillingService from '../../../services/UnsubscribeMaillingService';

export default class ClassController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createClassService = container.resolve(CreateClassService);

    const user = await createClassService.execute(data);

    const sendConfirmationEmail = container.resolve(
      SendConfirmationEmailService,
    );

    await sendConfirmationEmail.execute({ email: user.email });

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

  public async unsubscribe(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.query;

    const unsubscribeMaillingService = container.resolve(
      UnsubscribeMaillingService,
    );

    await unsubscribeMaillingService.execute(id as string);

    return response.status(202).json();
  }
}
