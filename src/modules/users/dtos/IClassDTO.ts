import IInvestmentsDTO from './IInvestmentsDTO';

export default interface IClassDTO {
  name: string;
  email: string;
  phone: string;
  patrimony: number;
  investments: IInvestmentsDTO;
}
