/* eslint-disable @typescript-eslint/no-shadow -- to asume */

import React from 'react';

// material-ui
import List from '@mui/material/List';
import CardMedia from '@mui/material/CardMedia';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';

// project import
import getDropzoneData from '@utils/getDropzoneData';

// assets
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { type FilesPreviewProps, DropzoneType, type CustomFile } from '@/types/dropzone';

// ==============================|| MULTI UPLOAD - PREVIEW ||============================== //

export default function FilesPreview({
  showList = false,
  files,
  onRemove,
  type,
}: FilesPreviewProps): React.JSX.Element {
  const hasFile = files.length > 0;
  const layoutType = type;

  return (
    <List
      disablePadding
      sx={{
        ...(hasFile && type !== DropzoneType.Standard ? { my: 3 } : {}),
        ...(type === DropzoneType.Standard ? { width: 'calc(100% - 84px)' } : {}),
      }}
    >
      {files.map((file) => {
        const { key, name, size, preview, type } = getDropzoneData(file);

        if (showList) {
          return (
            <ListItem
              key={key}
              sx={{
                p: 0,
                m: 0.5,
                width: layoutType === DropzoneType.Standard ? 64 : 80,
                height: layoutType === DropzoneType.Standard ? 64 : 80,
                borderRadius: `8px`,
                position: 'relative',
                display: 'inline-flex',
                verticalAlign: 'text-top',
                border: 'solid 1px',
                borderColor: 'secondary.light',
                overflow: 'hidden',
              }}
            >
              {type?.includes('image') ? (
                <CardMedia alt="preview" component="img" src={preview} />
              ) : (
                <InsertDriveFileOutlinedIcon style={{ width: '100%', fontSize: '1.5rem' }} />
              )}

              {onRemove ? (
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => {
                    onRemove(file as CustomFile);
                  }}
                  sx={{
                    fontSize: '0.875rem',
                    bgcolor: 'background.paper',
                    p: 0,
                    width: 'auto',
                    height: 'auto',
                    top: 2,
                    right: 2,
                    position: 'absolute',
                  }}
                >
                  <HighlightOffIcon style={{ fontSize: '1rem' }} />
                </IconButton>
              ) : null}
            </ListItem>
          );
        }

        return (
          <ListItem
            key={key}
            sx={{
              my: 1,
              px: 2,
              py: 0.75,
              borderRadius: `8px`,
              border: 'solid 1px',
              borderColor: 'secondary.light',
            }}
          >
            {preview ? (
              <CardMedia alt="preview" component="img" src={preview} sx={{ width: '30px', height: '30px', mr: 0.8 }} />
            ) : (
              <InsertDriveFileOutlinedIcon
                sx={{ color: 'secondary.main', width: 30, height: 30, fontSize: '1.15rem', mr: 0.5 }}
              />
            )}
            <ListItemText
              primary={typeof file === 'string' ? file : name}
              secondary={typeof file === 'string' ? '' : size}
              primaryTypographyProps={{ variant: 'subtitle2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />

            {onRemove ? (
              <IconButton
                edge="end"
                size="small"
                onClick={() => {
                  onRemove(file as CustomFile);
                }}
                color="error"
              >
                <HighlightOffIcon style={{ fontSize: '1.15rem' }} />
              </IconButton>
            ) : null}
          </ListItem>
        );
      })}
    </List>
  );
}
