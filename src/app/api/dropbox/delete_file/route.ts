import { NextResponse } from 'next/server';
import { deleteFile } from '@/lib/utils/dropbox';

export async function DELETE(request: Request) {
  try {
    const {filePath} = await request.json();
    
    if (!filePath) {
      return NextResponse.json({ error: 'File path is required.' }, { status: 400 });
    }

    await deleteFile(filePath);

    return NextResponse.json({ message: 'File deleted successfully.' },{status:200});
  } catch (error) {
    // console.error('Error in DELETE request:', error);
    return NextResponse.error();
  }
}