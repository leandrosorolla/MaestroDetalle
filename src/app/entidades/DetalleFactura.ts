import { Factura } from './Factura';
import { Producto } from './Producto';

export class DetalleFactura{
  id: number;
  factura: Factura;
  producto: Producto;
}
