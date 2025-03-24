import React from 'react';

// MUI Imports
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import MuiLink from '@mui/material/Link';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// Project Imports
import type { Business } from '@/types/business';
import { getCategoryColor } from '@/utils/getCategoryColor';
import BusinessDropdownMenu from './BusinessDropdownMenu';

export default function BusinessDetailsCard({ businessData }: { businessData: Business }): React.JSX.Element {
  const categoryColor = getCategoryColor(businessData.category);
  return (
    <Card
      elevation={5}
      sx={{
        height: 300,
        maxHeight: 300,
      }}
    >
      <CardHeader
        title={businessData.name}
        subheader={businessData.category}
        action={<BusinessDropdownMenu businessId={businessData.id} />}
        slotProps={{
          title: {
            sx: {
              fontSize: 14,
            },
          },
          subheader: {
            color: categoryColor,
          },
        }}
        avatar={<Avatar src={businessData.url_image} alt={`${businessData.name} business image`} />}
      />
      <CardContent sx={{ height: '100%', maxHeight: 300, overflowY: 'auto' }}>
        <Grid container spacing={2}>
          <Grid
            size={{
              xs: 12,
            }}
          >
            <Typography variant="body1" color={categoryColor}>
              Descripción
            </Typography>
            <Typography variant="body2">{businessData.description}</Typography>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography variant="body1" color={categoryColor}>
              Dirección:
            </Typography>
            <Typography variant="body2">{businessData.address}</Typography>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography variant="body1" color={categoryColor}>
              Teléfono:
            </Typography>
            <Typography variant="body2" component={MuiLink} href={`tel:${businessData.tel}`} color={categoryColor}>
              {businessData.tel}
            </Typography>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography variant="body1" color={categoryColor}>
              Sitio Web:
            </Typography>
            {businessData.web_site && businessData.web_site.length > 0 ? (
              <Typography variant="body2" component={MuiLink} href={businessData.web_site} color={categoryColor}>
                {businessData.web_site}
              </Typography>
            ) : (
              <Typography variant="body2">Sin información</Typography>
            )}
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography variant="body1" color={categoryColor}>
              Estatus:
            </Typography>
            <Chip
              color={businessData.status ? 'success' : 'error'}
              label={businessData.status ? 'Activo' : 'Inactivo'}
              size="small"
              variant="filled"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
