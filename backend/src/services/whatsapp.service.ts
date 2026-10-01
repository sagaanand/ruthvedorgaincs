import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

export interface WhatsAppMessagePayload {
  toPhone: string;
  templateName: string;
  languageCode?: string;
  parameters: string[];
}

export class WhatsAppService {
  async sendTemplateMessage(payload: WhatsAppMessagePayload): Promise<{ success: boolean; messageId?: string }> {
    const formattedPhone = payload.toPhone.replace(/\D/g, '');

    if (!env.WHATSAPP_ENABLED || !env.WHATSAPP_ACCESS_TOKEN || !env.WHATSAPP_PHONE_NUMBER_ID) {
      logger.info(
        {
          to: formattedPhone,
          template: payload.templateName,
          params: payload.parameters,
        },
        '📱 [WHATSAPP DISPATCHED (Mock/Sandbox Mode)]'
      );
      return { success: true, messageId: `mock_wa_${Date.now()}` };
    }

    try {
      const url = `https://graph.facebook.com/v19.0/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'template',
          template: {
            name: payload.templateName,
            language: { code: payload.languageCode || 'en' },
            components: [
              {
                type: 'body',
                parameters: payload.parameters.map(param => ({
                  type: 'text',
                  text: param,
                })),
              },
            ],
          },
        }),
      });

      const data = (await response.json()) as any;
      if (!response.ok) {
        logger.error({ data }, 'Meta WhatsApp API returned error');
        return { success: false };
      }

      logger.info({ messageId: data?.messages?.[0]?.id }, 'WhatsApp template notification delivered');
      return { success: true, messageId: data?.messages?.[0]?.id };
    } catch (error: any) {
      logger.error({ error: error.message }, 'Failed to deliver WhatsApp message');
      return { success: false };
    }
  }

  async sendTextMessage(toPhone: string, text: string): Promise<boolean> {
    const formattedPhone = toPhone.replace(/\D/g, '');
    if (!env.WHATSAPP_ENABLED || !env.WHATSAPP_ACCESS_TOKEN || !env.WHATSAPP_PHONE_NUMBER_ID) {
      logger.info({ to: formattedPhone, text }, '📱 [WHATSAPP TEXT DISPATCHED (Mock Mode)]');
      return true;
    }

    try {
      const url = `https://graph.facebook.com/v19.0/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'text',
          text: { body: text },
        }),
      });

      return response.ok;
    } catch (err: any) {
      logger.error({ err: err.message }, 'Failed to send WhatsApp text');
      return false;
    }
  }

  async sendOrderConfirmation(order: any) {
    return this.sendTemplateMessage({
      toPhone: order.customerPhone,
      templateName: 'order_confirmation',
      parameters: [
        order.customerName,
        order.orderNumber,
        String(order.totalAmount),
        order.paymentMethod,
      ],
    });
  }

  async sendShipmentTracking(order: any, shipment: any) {
    return this.sendTemplateMessage({
      toPhone: order.customerPhone,
      templateName: 'order_dispatched',
      parameters: [
        order.customerName,
        order.orderNumber,
        shipment.courierPartner || 'Express Courier',
        shipment.trackingNumber || 'In transit',
      ],
    });
  }
}

export const whatsAppService = new WhatsAppService();
export const whatsappService = whatsAppService;
