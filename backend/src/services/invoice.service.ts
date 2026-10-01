export interface InvoiceItem {
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: any;
  items: InvoiceItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
}

export class InvoiceService {
  generateInvoiceData(order: any): InvoiceData {
    return {
      invoiceNumber: `INV-${order.orderNumber.replace('RO-', '')}`,
      orderNumber: order.orderNumber,
      orderDate: new Date(order.createdAt).toISOString(),
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      shippingAddress: order.shippingAddress,
      items: order.items.map((i: any) => ({
        name: i.productName + (i.variantName ? ` (${i.variantName})` : ''),
        sku: i.sku,
        quantity: i.quantity,
        unitPrice: Number(i.unitPrice),
        totalPrice: Number(i.totalPrice),
      })),
      subtotal: Number(order.subtotal),
      discountAmount: Number(order.discountAmount),
      shippingFee: Number(order.shippingFee),
      taxAmount: Number(order.taxAmount),
      totalAmount: Number(order.totalAmount),
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
    };
  }
}

export const invoiceService = new InvoiceService();
