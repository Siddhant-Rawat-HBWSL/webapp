import { NextResponse } from 'next/server';
import { writeFile } from '@/lib/utils/dropbox';


export async function POST(request: Request) {
    try {
        console.log("here;s request:",request);
      const {filePath, fileData } = await request.json();
    
      if (!filePath) {
        return NextResponse.json({ error: 'File path is required.' }, { status: 400 });
      }
      if (!fileData) {
        return NextResponse.json({ error: 'File data is required.' }, { status: 400 });
      }
      console.log("filedata inside route",fileData);
      const responseData = Buffer.isBuffer(fileData) ? fileData.toString('utf-8') : fileData;
      await writeFile(filePath, responseData);
  
      return NextResponse.json({ message: 'file written successfully.' },{status:200});
    } catch (error) {
    //   console.error('Error in POST request:', error);
      return NextResponse.error();
    }
  }
  