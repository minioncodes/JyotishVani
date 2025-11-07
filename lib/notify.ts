import nodemailer from 'nodemailer';
import { Lead } from '@/models/LeadModel';

export async function notifyEmail(lead: Lead) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL;
  const from = user;

  if (!host || !port || !user || !pass || !from) {
    console.log("Missing SMTP configuration");
    return { ok: false, skipped: true };
  }

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  if (adminEmail) {
    const subject = `🆕 New Jyotishwaani Lead: ${lead.name}`;
    const html = `
      <div style="font-family:Inter,Arial,sans-serif;background:#f0fdfa;padding:32px;">
        <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:14px;border:1px solid #e5e7eb;overflow:hidden;">
          <div style="background:#0f766e;padding:22px 32px;">
            <h2 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">New Lead Received</h2>
          </div>
          <div style="padding:24px 32px 32px;">
            <p><strong>Name:</strong> ${lead.name}</p>
            <p><strong>Email:</strong> ${lead.email}</p>
            <p><strong>Phone:</strong> ${lead.phoneNumber}</p>
            <p><strong>Date of Birth:</strong> ${lead.dateofbirth}</p>
            <p><strong>Time:</strong> ${lead.time}</p>
            <p><strong>Birthplace:</strong> ${lead.birthplace}</p>
            <p><strong>Service:</strong> ${lead.service}</p>
            <p><strong>Concern:</strong> ${lead.concern}</p>
            <p><strong>Description:</strong> ${lead.description}</p>
            <p><strong>Created:</strong> ${new Date(lead.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>`;
    await transport.sendMail({ from, to: adminEmail, subject, html });
  }


  if (lead.email) {
    const subject = `🙏 Thank you for contacting Jyotishwaani`;
    const html = `
      <div style="font-family:Inter,Arial,sans-serif;background:#f0fdfa;padding:32px;">
        <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:14px;border:1px solid #e5e7eb;overflow:hidden;">
          <div style="background:#0f766e;padding:22px 32px;">
            <h2 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">Thank You, ${lead.name}!</h2>
          </div>
          <div style="padding:24px 32px 32px;">
            <p>We’ve received your details and one of our astrologers will get back to you soon.</p>
            <p><strong>Service:</strong> ${lead.service}</p>
            <p><strong>Concern:</strong> ${lead.concern}</p>
            <p><strong>Description:</strong> ${lead.description}</p>
            <p>🪔 Team Jyotishwaani</p>
          </div>
        </div>
      </div>`;
    await transport.sendMail({ from, to: lead.email, subject, html });
  }

  return { ok: true };
}
