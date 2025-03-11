import { v4 as uuid } from 'uuid';
import { DropzoneType, type FileData } from '@/types/dropzone';

export default function getDropzoneData(file: string | FileData): FileData {
  if (typeof file === 'string') {
    return {
      key: uuid(),
      name: '',
      size: 0,
      path: '',
      type: DropzoneType.Default,
      preview: file,
      lastModified: 0,
      lastModifiedDate: new Date(),
    };
  }

  return {
    key: uuid(),
    name: file.name,
    size: file.size,
    path: file.path,
    type: file.type,
    preview: file.preview,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
  };
}
