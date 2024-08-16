import { promises as fs } from 'fs';
import path from 'path';

const dropboxFolderPath = 'C:\\Users\\msacc\\Dropbox\\Exported PDF';

interface BufferData {
  type: 'Buffer';
  data: number[];
}

export async function countFiles(dirPath:string,recursive:boolean=false,size:string,type:string):Promise<number>{

  const files=await getFiles(dirPath,recursive,size,type);
  const count=files.length;
  return count;
}


export async function getFiles(dirPath:string,recursive:boolean=false,size:string,type:string):Promise<string[]>{
  
  size=size.toLowerCase();
  type=type.toLowerCase();
  const files= await fs.readdir(dirPath);
  let results:string[] = [];
  for (const file of files) {
    const fullPath:string = path.join(dirPath, file);
    const stat = await fs.stat(fullPath);
    const fileLower=file.toLowerCase();
    if (stat.isDirectory() && recursive) {
      const nestedResults:string[]= await getFiles(fullPath,true,size,type);
      results = results.concat(nestedResults);
    } else if(!stat.isDirectory() && fileLower.includes(size) && fileLower.includes(type)) {
        results.push(fullPath);
    }
  }
  return results;
}


export async function readFile(filePath:string):Promise<Buffer>{

  try {
      const dataBuffer = await fs.readFile(filePath);
      return dataBuffer;
  } catch (error) {
      console.error('Error reading file:', error);
      throw error;
  }
}


export async function writeFile(filePath: string, fileData: BufferData): Promise<void> {
  try {
    console.log("inside write file",fileData);

      const bufferData = Buffer.from(fileData.data);
      await fs.writeFile(filePath, bufferData);
      console.log('Response saved successfully to', filePath);
  } catch (error) {
      console.error('Error saving response:', error);
      throw error;
  }
}

export async function moveFile(sourcePath: string, destinationPath: string): Promise<void> {
  try {
      await fs.rename(sourcePath, destinationPath);
      console.log(`File moved from '${sourcePath}' to '${destinationPath}' successfully.`);
  } catch (error) {
      console.error(`Error moving file from '${sourcePath}' to '${destinationPath}':`, error);
      throw error;
  }
}


export async function deleteFile(filePath: string): Promise<void> {
  try {
      await fs.unlink(filePath);
      console.log(`File '${filePath}' deleted successfully.`);
  } catch (error) {
      console.error(`Error deleting file '${filePath}':`, error);
      throw error;
  }
}