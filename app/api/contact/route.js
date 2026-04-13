import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // In production, integrate with email service (SendGrid, Resend, etc.)
    console.log('📧 Contact form submission:', { name, email, message });

    return NextResponse.json({
      success: true,
      message: `Thanks ${name}! Your message has been received. Teja will get back to you soon.`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}