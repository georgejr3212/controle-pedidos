import { Item } from './Item';

export class Pedido {
  id?: string;
  comprador: string;
  itens: Item[];
  total: number;
  status: string;
  dtCompra: Date;
}