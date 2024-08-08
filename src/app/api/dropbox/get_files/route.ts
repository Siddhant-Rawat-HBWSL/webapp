import { NextResponse } from 'next/server';
import {getFiles} from '@/lib/utils/dropbox'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const dirPath = url.searchParams.get('dirPath') || 'C:\\Users\\msacc\\Dropbox\\Exported PDF';
    const recursive = url.searchParams.get('recursive') === 'true';
    const size = url.searchParams.get('size') || '';
    const type = url.searchParams.get('type') || '';

    const files = await getFiles(dirPath, recursive, size, type);
    return NextResponse.json({ files },{status:200});
  } catch (error) {
    return NextResponse.json({}, { status: 400 });
  }
}