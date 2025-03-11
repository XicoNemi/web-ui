export enum DropzoneType {
  'Default' = 'DEFAULT',
  'Standard' = 'STANDARD',
}

export interface CustomFile extends Blob {
  key: string;
  name: string;
  size: number;
  path?: string;
  type: DropzoneType;
  preview: string;
  lastModified: number;
  lastModifiedDate: Date;
}

export interface FilesPreviewProps {
  showList?: boolean;
  files: CustomFile[] | string[];
  onRemove: (file: CustomFile) => void;
  type: DropzoneType;
}

export interface FileData {
  key: string;
  name: string;
  size: number;
  path?: string;
  type: DropzoneType;
  preview: string;
  lastModified: number;
  lastModifiedDate: Date;
}

export interface MultiFileUploadProps {
  error?: boolean;
  showList?: boolean;
  files?: CustomFile[];
  setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void;
  sx?: object;
}
