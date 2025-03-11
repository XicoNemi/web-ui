'use client';

import * as React from 'react';
import Link from 'next/link';

// MUI Imports
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { esES } from '@mui/x-data-grid/locales';
import MuiLink from '@mui/material/Link';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

// Project Imports
import { paths } from '@/paths';
import { getBusinesses } from '@/lib/services/api';
import { getCategoryColor } from '@/utils/getCategoryColor';

import Loader from '@components/shared/Loader';
import DashboardCard from '@components/shared/DashboardCard';
import ConfirmDeleteBusinessModal from '@components/businesses/ConfirmDeleteBusinessDialog';

// Third Party Imports
import { useQuery } from '@tanstack/react-query';

// assets
import { IconEdit, IconEye, IconPlus, IconTrash } from '@tabler/icons-react';

export default function BusinessesTableView(): React.JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleModal = (): void => {
    setIsOpen((prev) => !prev);
  };

  const { data: businesses, isLoading } = useQuery({
    queryKey: ['businesses'],
    queryFn: getBusinesses,
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, hideable: false },
    {
      field: 'image',
      headerName: 'Imagen',
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: ({ value }) => <Avatar src={value} alt={`${value as string} business image`} />,
    },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 200,
      headerAlign: 'center',
    },
    {
      field: 'category',
      headerName: 'Categoría',
      width: 130,
      renderCell: ({ value }) => (
        <Stack justifyContent="center" height="100%">
          <Typography variant="body2" color={getCategoryColor(value as string)}>
            {value}
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'address',
      headerName: 'Dirección',
      width: 250,
    },
    {
      field: 'tel',
      headerName: 'Teléfono',
      width: 130,
      renderCell: ({ value }) => (
        <Stack justifyContent="center" height="100%">
          <MuiLink href={`tel:${value as string}`} underline="always">
            {value}
          </MuiLink>
        </Stack>
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 200,
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      hideable: false,
      renderCell: ({ value: businessId }) => (
        <>
          <Stack display="flex" flexDirection="row" alignItems="center" justifyContent="center" height="100%" gap={1}>
            <IconButton
              size="small"
              color="secondary"
              loading={isLoading}
              LinkComponent={Link}
              aria-label="See details"
              href={paths.businesses.details(businessId as string)}
            >
              <IconEye />
            </IconButton>
            <IconButton
              size="small"
              color="info"
              aria-label="Edit"
              loading={isLoading}
              LinkComponent={Link}
              href={paths.businesses.edit(businessId as string)}
            >
              <IconEdit />
            </IconButton>
            <IconButton size="small" color="primary" aria-label="Delete" loading={isLoading} onClick={toggleModal}>
              <IconTrash />
            </IconButton>
          </Stack>
          <ConfirmDeleteBusinessModal businessId={businessId} open={isOpen} toggleModal={toggleModal} />
        </>
      ),
    },
  ];

  const rows = React.useMemo(
    () =>
      businesses && businesses.length > 0
        ? businesses.map((businessRow) => ({
            id: businessRow.id,
            image: businessRow.url_image?.length > 0 ? businessRow.url_image : businessRow.name,
            name: businessRow.name,
            category: businessRow.category,
            address: businessRow.address,
            tel: businessRow.tel,
            actions: businessRow.id,
          }))
        : [],
    [businesses]
  );

  return (
    <>
      {isLoading ? <Loader /> : null}
      <DashboardCard
        title={<Typography variant="h2">Negocios</Typography>}
        action={
          <Button LinkComponent={Link} href={paths.businesses.create} startIcon={<IconPlus />} variant="contained">
            Nuevo Negocio
          </Button>
        }
      >
        <DataGrid
          rows={rows}
          columns={columns}
          filterMode="server"
          loading={isLoading}
          density="comfortable"
          aria-label="businesses-table"
          pageSizeOptions={[5, 10, 15, 30]}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 5,
              },
            },
          }}
        />
      </DashboardCard>
    </>
  );
}
