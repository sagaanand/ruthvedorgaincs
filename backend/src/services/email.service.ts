import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initTransporter();
  }

  private initTransporter() {
    try {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_SECURE,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      });
    } catch (error: any) {
      logger.warn({ error: error.message }, 'Failed to initialize SMTP transporter');
    }
  }

  async sendMail(
    toOrOptions: string | { to: string; subject: string; html: string; text?: string },
    subject?: string,
    html?: string
  ): Promise<boolean> {
    const to = typeof toOrOptions === 'object' ? toOrOptions.to : toOrOptions;
    const sub = typeof toOrOptions === 'object' ? toOrOptions.subject : (subject || '');
    const bodyHtml = typeof toOrOptions === 'object' ? toOrOptions.html : (html || '');
    const bodyText = typeof toOrOptions === 'object' ? toOrOptions.text : undefined;

    if (env.NODE_ENV === 'test' || !env.SMTP_USER || env.SMTP_PASS === 'app_password') {
      logger.info({ to, subject: sub }, '📧 [MOCK EMAIL DISPATCHED] (SMTP in dev/mock mode)');
      return true;
    }

    try {
      if (!this.transporter) this.initTransporter();
      await this.transporter?.sendMail({
        from: `"${env.EMAIL_FROM_NAME}" <${env.EMAIL_FROM_ADDRESS}>`,
        to,
        subject: sub,
        html: bodyHtml,
        ...(bodyText ? { text: bodyText } : {}),
      });
      logger.info({ to, subject: sub }, 'Email sent successfully');
      return true;
    } catch (error: any) {
      logger.error({ error: error.message, to, subject: sub }, 'Failed to send transactional email');
      return false;
    }
  }

  async sendWelcomeEmail(name: string, email: string) {
    const html = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF7F0; border-radius: 16px;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #81BF4A;">
          <h1 style="color: #24451F; margin: 0; font-size: 28px;">Ruthved <span style="color: #F37023;">Organic</span></h1>
          <p style="color: #81BF4A; font-size: 13px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-top: 5px;">Trust in Nature's Best</p>
        </div>
        <div style="padding: 24px 10px; color: #181C17; line-height: 1.6;">
          <h2 style="color: #24451F;">Welcome to the Family, ${name}!</h2>
          <p>Thank you for choosing pure, chemical-free living with Ruthved Organic. From our traditional wooden Bilona churned A2 Desi Cow Ghee to slow-crushed wood-pressed oils and wild forest honey, we bring ancient Indian wellness directly to your home.</p>
          <div style="background-color: #ffffff; padding: 16px; border-radius: 12px; border: 1px solid #F3ECE0; margin: 20px 0; text-align: center;">
            <p style="margin: 0; font-size: 14px; color: #24451F;">Enjoy <strong>15% OFF</strong> your first order with coupon code:</p>
            <p style="margin: 8px 0 0 0; font-size: 22px; font-weight: bold; color: #F37023; letter-spacing: 3px;">FIRST15</p>
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${env.FRONTEND_URL}/shop" style="background-color: #F37023; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 9999px; font-weight: bold; font-size: 14px; display: inline-block;">Explore Pure Organic Catalog</a>
          </div>
        </div>
      </div>
    `;
    return this.sendMail(email, 'Welcome to Ruthved Organic — Pure Farm Goodness', html);
  }

  async sendOrderConfirmationEmail(order: any) {
    const itemsHtml = order.items
      .map(
        (item: any) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #F3ECE0;">${item.productName} ${item.variantName ? `(${item.variantName})` : ''}</td>
          <td style="padding: 10px; border-bottom: 1px solid #F3ECE0; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #F3ECE0; text-align: right;">₹${item.totalPrice}</td>
        </tr>
      `
      )
      .join('');

    const html = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF7F0; border-radius: 16px;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #81BF4A;">
          <h1 style="color: #24451F; margin: 0; font-size: 28px;">Ruthved <span style="color: #F37023;">Organic</span></h1>
          <p style="color: #81BF4A; font-size: 13px; font-weight: bold; margin-top: 5px;">Order Confirmation #${order.orderNumber}</p>
        </div>
        <div style="padding: 24px 10px; color: #181C17;">
          <h2 style="color: #24451F;">Thank You for Your Order, ${order.customerName}!</h2>
          <p>We have safely received your order. Our team in Bengaluru is preparing your fresh organic products with authentic care.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <thead>
              <tr style="background-color: #E5EFE2; color: #24451F;">
                <th style="padding: 10px; text-align: left;">Product</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>

          <div style="background-color: #ffffff; padding: 16px; border-radius: 12px; border: 1px solid #F3ECE0; margin: 20px 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <span>Subtotal:</span><strong>₹${order.subtotal}</strong>
            </div>
            ${order.discountAmount > 0 ? `<div style="display: flex; justify-content: space-between; color: #649F30; margin-bottom: 6px;"><span>Discount:</span><strong>-₹${order.discountAmount}</strong></div>` : ''}
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <span>Shipping Fee:</span><strong>${order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; color: #F37023; border-top: 1px solid #eee; padding-top: 8px;">
              <span>Total Payable:</span><span>₹${order.totalAmount}</span>
            </div>
          </div>

          <p style="font-size: 12px; color: #525B4F;">Payment Mode: <strong>${order.paymentMethod}</strong> • Status: <strong>${order.paymentStatus}</strong></p>
        </div>
      </div>
    `;
    return this.sendMail(order.customerEmail, `Order Confirmation #${order.orderNumber} — Ruthved Organic`, html);
  }

  async sendShipmentEmail(order: any, shipment: any) {
    const html = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF7F0; border-radius: 16px;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #81BF4A;">
          <h1 style="color: #24451F; margin: 0;">Ruthved <span style="color: #F37023;">Organic</span></h1>
          <p style="color: #81BF4A; font-weight: bold;">Your Order is On Its Way!</p>
        </div>
        <div style="padding: 20px 10px; color: #181C17;">
          <h2 style="color: #24451F;">Order #${order.orderNumber} Dispatched</h2>
          <p>Great news! Your package has been securely packed in shock-proof eco glass packaging and handed over to our courier partner.</p>
          <div style="background-color: #ffffff; padding: 16px; border-radius: 12px; border: 1px solid #F3ECE0; margin: 16px 0;">
            <p style="margin: 4px 0;">Courier: <strong>${shipment.courierPartner || 'Standard Express'}</strong></p>
            <p style="margin: 4px 0;">Tracking Number: <strong>${shipment.trackingNumber || 'Available Shortly'}</strong></p>
            ${shipment.estimatedDeliveryDate ? `<p style="margin: 4px 0;">Estimated Delivery: <strong>${new Date(shipment.estimatedDeliveryDate).toLocaleDateString()}</strong></p>` : ''}
          </div>
        </div>
      </div>
    `;
    return this.sendMail(order.customerEmail, `Your Ruthved Organic Order #${order.orderNumber} Has Shipped!`, html);
  }

  async sendPasswordResetEmail(email: string, resetToken: string) {
    const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const html = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF7F0; border-radius: 16px;">
        <h2 style="color: #24451F;">Reset Your Password</h2>
        <p>You requested a password reset for your Ruthved Organic account. Click the button below to set a new password:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${resetUrl}" style="background-color: #F37023; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: bold;">Reset Password</a>
        </div>
        <p style="font-size: 12px; color: #6D776A;">This link is valid for 1 hour. If you did not request this, please ignore this email.</p>
      </div>
    `;
    return this.sendMail(email, 'Password Reset Request — Ruthved Organic', html);
  }
}

export const emailService = new EmailService();
