import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const senderEmail = process.env.SENDER_EMAIL;

    if (!apiKey || apiKey === 'your_brevo_api_key_here') {
      console.error('Brevo API key is not configured.');
      return NextResponse.json(
        { error: 'Email service configuration error.' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Florist SSY Website Inquiry',
          email: senderEmail || 'hello@floristssy.com',
        },
        to: [
          {
            email: adminEmail || 'hello@floristssy.com',
            name: 'Soyoun Kim',
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `New contact form inquiry from ${name}`,
        htmlContent: `
          <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px;">
              <h2 style="color: #6d4c41; border-bottom: 2px solid #6d4c41; padding-bottom: 10px; margin-top: 0;">New Inquiry Received</h2>
              <p>You have received a new message via the contact form on your website.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 100px;">Sender Name:</td>
                  <td style="padding: 8px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Sender Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
                </tr>
              </table>
              
              <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #6d4c41; background: #fdfdfd;">
                <p style="font-weight: bold; margin-top: 0; color: #6d4c41;">Message Content:</p>
                <p style="white-space: pre-wrap; margin-bottom: 0;">${message}</p>
              </div>
              
              <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;" />
              <p style="font-size: 12px; color: #888; text-align: center; margin-bottom: 0;">
                You can reply directly to this email to get in touch with <strong>${name}</strong>.
              </p>
            </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Brevo API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to send email through provider.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact Form Handler Error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
