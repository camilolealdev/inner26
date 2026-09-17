import nodemailer from 'nodemailer';
import type { OrderSnapshot } from './orders';
import { buildOrderPdf, buildReceiptText } from './pdf';

const configured = () =>
  Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

export const sendOrderEmail = async (order: OrderSnapshot) => {
  if (!configured()) return { sent: false, reason: 'SMTP no configurado' };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const from = process.env.SMTP_FROM || process.env.VITE_STUDIO_EMAIL || 'hola@innerspirit.net';
  const studioEmail = process.env.STUDIO_NOTIFY_EMAIL || process.env.VITE_STUDIO_EMAIL || from;
  const text = buildReceiptText(order).join('\n');
  const pdf = buildOrderPdf(order);

  await transporter.sendMail({
    from,
    to: order.customer.email,
    bcc: studioEmail,
    subject: `Confirmacion Inner Spirit ${order.orderId}`,
    text,
    attachments: [
      {
        filename: `inner-spirit-${order.orderId}.pdf`,
        content: pdf,
        contentType: 'application/pdf',
      },
    ],
  });

  return { sent: true };
};
