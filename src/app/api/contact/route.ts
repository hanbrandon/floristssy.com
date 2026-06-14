import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      weddingDate, 
      venue, 
      budget, 
      guestCount, 
      message 
    } = await request.json();

    if (!firstName || !lastName || !email || !phone || !weddingDate || !venue || !budget || !guestCount) {
      return NextResponse.json(
        { error: 'All fields except message are required.' },
        { status: 400 }
      );
    }

    // 이메일 형식 서버사이드 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    // 전화번호 길이 서버사이드 검증
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length < 10) {
      return NextResponse.json(
        { error: 'Invalid phone number. Must be at least 10 digits.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const adminEmailRaw = process.env.ADMIN_EMAIL || 'floristssy@gmail.com';
    const senderEmail = process.env.SENDER_EMAIL;

    // 쉼표(,) 혹은 세미콜론(;)으로 구분된 이메일 주소 리스트 파싱
    const recipientEmails = adminEmailRaw
      .split(/[,;]/)
      .map(emailStr => emailStr.trim())
      .filter(emailStr => emailStr.length > 0);

    const toRecipients = recipientEmails.map(emailStr => ({
      email: emailStr,
      name: 'Soyoun Kim',
    }));

    if (!apiKey || apiKey === 'your_brevo_api_key_here') {
      console.error('Brevo API key is not configured.');
      return NextResponse.json(
        { error: 'Email service configuration error.' },
        { status: 500 }
      );
    }

    const fullName = `${firstName} ${lastName}`;

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Florist SSY Inquiry System',
          email: senderEmail || 'hello@floristssy.com',
        },
        to: toRecipients,
        replyTo: {
          email: email,
          name: fullName,
        },
        subject: `New Florist SSY Wedding Inquiry from ${fullName}`,
        htmlContent: `
          <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1b1c19; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e4e2dd; border-radius: 8px; background-color: #fbf9f4;">
              <h2 style="color: #061b0e; border-bottom: 2px solid #061b0e; padding-bottom: 12px; margin-top: 0; font-family: Georgia, serif;">New Wedding Inquiry Received</h2>
              <p style="font-size: 14px; color: #434843;">You have received a new consultation request via the inquiry form on your website.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
                <tr style="border-bottom: 1px solid #e4e2dd;">
                  <td style="padding: 10px 0; font-weight: bold; width: 180px; color: #061b0e;">Client Name</td>
                  <td style="padding: 10px 0; color: #1b1c19;">${fullName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e4e2dd;">
                  <td style="padding: 10px 0; font-weight: bold; color: #061b0e;">Email Address</td>
                  <td style="padding: 10px 0; color: #1b1c19;"><a href="mailto:${email}" style="color: #4d6453; text-decoration: underline;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #e4e2dd;">
                  <td style="padding: 10px 0; font-weight: bold; color: #061b0e;">Phone Number</td>
                  <td style="padding: 10px 0; color: #1b1c19;"><a href="tel:${phone}" style="color: #4d6453; text-decoration: underline;">${phone}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #e4e2dd;">
                  <td style="padding: 10px 0; font-weight: bold; color: #061b0e;">Wedding Date</td>
                  <td style="padding: 10px 0; color: #1b1c19;">${weddingDate}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e4e2dd;">
                  <td style="padding: 10px 0; font-weight: bold; color: #061b0e;">Venue / Location</td>
                  <td style="padding: 10px 0; color: #1b1c19;">${venue}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e4e2dd;">
                  <td style="padding: 10px 0; font-weight: bold; color: #061b0e;">Floral Budget</td>
                  <td style="padding: 10px 0; color: #1b1c19;">${budget}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e4e2dd;">
                  <td style="padding: 10px 0; font-weight: bold; color: #061b0e;">Expected Guest Count</td>
                  <td style="padding: 10px 0; color: #1b1c19;">${guestCount}</td>
                </tr>
              </table>
              
              <div style="margin-top: 25px; padding: 18px; border-left: 4px solid #4d6453; background: #ffffff; border-radius: 4px;">
                <p style="font-weight: bold; margin-top: 0; color: #061b0e; font-size: 14px;">Additional Details & Share:</p>
                <p style="white-space: pre-wrap; margin-bottom: 0; font-size: 13px; color: #434843;">${message || 'No additional details provided.'}</p>
              </div>
              
              <hr style="border: 0; border-top: 1px solid #e4e2dd; margin-top: 35px;" />
              <p style="font-size: 11px; color: #737973; text-align: center; margin-bottom: 0;">
                You can reply directly to this email notification to get in touch with <strong>${fullName}</strong>.
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
