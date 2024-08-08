import { NextResponse } from 'next/server';
import { moveFile } from '@/lib/utils/dropbox';

export async function POST(request: Request) {
  try {
    const { sourcePath, destinationPath } = await request.json();

    if (!sourcePath || !destinationPath) {
      return NextResponse.json({ error: 'Source and destination paths are required.' }, { status: 400 });
    }

    await moveFile(sourcePath, destinationPath);

    return NextResponse.json({ message: 'File moved successfully.' },{status:200});
  } catch (error) {
    // console.error('Error in POST request:', error);
    return NextResponse.error();
  }
}
