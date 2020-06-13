import { Comprobante } from './Comprobante';
import { DetalleFactura } from './DetalleFactura';

export class Factura extends Comprobante{
  tipo:String;
  detalles:DetalleFactura[];

}
