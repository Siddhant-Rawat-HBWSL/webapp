import { NextResponse } from 'next/server';
import { readFile } from '@/lib/utils/dropbox';

export async function GET(request: Request) {
  try {
    // Extract filePath from query parameters
    const url = new URL(request.url);
    const filePath = url.searchParams.get('filePath');

    if (!filePath) {
      return NextResponse.json({ error: 'File path is required.' }, { status: 400 });
    }

    const fileData = await readFile(filePath);
    return NextResponse.json({fileData},{status:200});

  } catch (error) {
    // console.error('Error in GET request:', error);
    return NextResponse.error();
  }
}
