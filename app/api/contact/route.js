import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate inputs
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Please fill in all fields (Name, Email, Message).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Attempt real email dispatch if Resend API key is available
    if (process.env.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['teja1616150@gmail.com'],
            subject: `Portfolio Inquiry from ${name.trim()}`,
            reply_to: email.trim(),
            html: `
              <h2>New Contact Message from Portfolio</h2>
              <p><strong>Name:</strong> ${name.trim()}</p>
              <p><strong>Email:</strong> ${email.trim()}</p>
              <p><strong>Message:</strong></p>
              <blockquote style="background:#f4f4f5;padding:12px;border-left:4px solid #22d3ee;">
                ${message.trim().replace(/\n/g, '<br/>')}
              </blockquote>
            `,
          }),
        });

        if (!resendResponse.ok) {
          const errData = await resendResponse.json();
          console.warn('Resend dispatch error:', errData);
        }
      } catch (err) {
        console.warn('Resend error caught:', err);
      }
    }

    // Always log detailed submission on server
    console.log('[Contact Form Submission]', {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: `Thank you, ${name.trim()}! Your message has been received. Teja will reply to ${email.trim()} soon.`,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process message. Please try again or email directly.' },
      { status: 500 }
    );
  }
}
