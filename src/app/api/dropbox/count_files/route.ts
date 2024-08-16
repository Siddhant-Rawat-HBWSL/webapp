import { NextResponse } from 'next/server';
import { countFiles} from '@/lib/utils/dropbox'
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const dirPath = url.searchParams.get('dirPath') || 'C:\\Users\\msacc\\Dropbox\\Exported PDF';
    const recursive = url.searchParams.get('recursive') === 'true';
    const size = url.searchParams.get('size') || '';
    const type = url.searchParams.get('type') || '';

    const fileCount = await countFiles(dirPath, recursive, size, type);
    return NextResponse.json({ fileCount });
  } catch (error) {
    // console.error('Error in GET request:', error); 
    return NextResponse.error();
  }
}