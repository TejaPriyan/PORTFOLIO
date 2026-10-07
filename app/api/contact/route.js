import { NextResponse } from 'next/server';

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
  const { name, email, message } = body || {};
  if ([name, email, message].some(value => typeof value !== 'string' || !value.trim()) ||
      name.length > 120 || email.length > 254 || message.length > 10000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: 'Please provide a valid name, email and message (up to 10,000 characters).' }, { status: 400 });
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Email delivery is unavailable. Please email teja1616150@gmail.com directly.' }, { status: 503 });
  }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST', signal: AbortSignal.timeout(15000),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'Portfolio Contact <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO || 'teja1616150@gmail.com'],
        subject: `Portfolio inquiry from ${name.trim().replace(/[\r\n]/g, ' ')}`,
        reply_to: email.trim(),
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
      }),
    });
    if (!response.ok) return NextResponse.json({ error: 'Email delivery failed. Please retry or email directly.' }, { status: 502 });
    return NextResponse.json({ success: true, message: 'Your message was accepted for delivery. Thank you!' });
  } catch {
    return NextResponse.json({ error: 'Email delivery timed out or failed. Please retry or email directly.' }, { status: 502 });
  }
}
