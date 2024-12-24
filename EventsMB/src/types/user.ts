import { Ticket } from './ticket';

export interface User {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  tickets: Ticket[];
}
