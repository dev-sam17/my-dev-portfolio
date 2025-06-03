import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
    
    await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blob:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
