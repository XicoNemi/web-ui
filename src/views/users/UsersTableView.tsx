'use client';

import * as React from 'react';
import Link from 'next/link';

// MUI Imports
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { esES } from '@mui/x-data-grid/locales';
import MuiLink from '@mui/material/Link';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

// Project Imports
import type { User } from '@/types/user';

import { paths } from '@/paths';
import { useAuth } from '@/hooks/useAuth';
import { getAllUsers } from '@/lib/services/api';
import getUserRole from '@/utils/getUserRole';

import Loader from '@/components/shared/Loader';
import DashboardCard from '@components/shared/DashboardCard';
import ConfirmDeleteModal from '@/components/users/ConfirmDeleteUserDialog';

// Third Party Imports
import { useQuery } from '@tanstack/react-query';

// assets
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';

export default function UsersTableView(): React.JSX.Element {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleModal = (): void => {
    setIsOpen((prev) => !prev);
  };

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'image',
      headerName: 'Imagen',
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: ({ value }) => <Avatar src={value} alt={`${value as string} profile image`} />,
    },
    {
      field: 'name',
      headerName: 'Nombre Completo',
      width: 250,
    },
    {
      field: 'type',
      headerName: 'Tipo/Rol',
      width: 130,
      valueFormatter: (value) => getUserRole(value as string),
    },
    {
      field: 'email',
      headerName: 'Correo',
      width: 200,
      renderCell: ({ value }) => (
        <MuiLink href={`mailto:${value as string}`} underline="always">
          {value}
        </MuiLink>
      ),
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 130,
      renderCell: ({ value }) => (
        <Chip color={value ? 'success' : 'error'} label={value ? 'Activo' : 'Inactivo'} size="small" variant="filled" />
      ),
    },
    {
      field: 'tel',
      headerName: 'Teléfono',
      width: 130,
      renderCell: ({ value }) => (
        <MuiLink href={`tel:${value as string}`} underline="always">
          {value}
        </MuiLink>
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
      renderCell: (params) => {
        const userData = params.value as User;
        if (!userData) return null;

        return (
          <>
            <Stack display="flex" flexDirection="row" alignItems="center" justifyContent="center" height="100%" gap={1}>
              <IconButton
                onClick={toggleModal}
                color="primary"
                aria-label="Delete"
                size="small"
                loading={isLoading}
                disabled={userData.id === user?.id || !userData.status}
              >
                <IconTrash />
              </IconButton>
              <IconButton
                size="small"
                color="info"
                aria-label="Edit"
                loading={isLoading}
                LinkComponent={Link}
                href={paths.users.edit(userData.id)}
              >
                <IconEdit />
              </IconButton>
            </Stack>
            <ConfirmDeleteModal
              userEmail={userData.email}
              userId={userData.id}
              open={isOpen}
              toggleModal={toggleModal}
            />
          </>
        );
      },
    },
  ];

  const rows = React.useMemo(
    () =>
      users?.map((userRow) => ({
        id: userRow.id,
        image: userRow.url_image?.length > 0 ? userRow.url_image : `${userRow.name} ${userRow.lastname}`,
        name: `${userRow.name} ${userRow.lastname}`,
        type: userRow.type,
        status: userRow.status,
        email: userRow.email,
        tel: userRow.tel,
        actions: userRow,
      })) ?? [],
    [users]
  );

  return (
    <>
      {isLoading ? <Loader /> : null}
      <DashboardCard
        title={<Typography variant="h2">Usuarios</Typography>}
        action={
          <Button LinkComponent={Link} href={paths.users.create} startIcon={<IconPlus />} variant="contained">
            Nuevo usuario
          </Button>
        }
      >
        <DataGrid
          rows={rows}
          columns={columns}
          filterMode="server"
          loading={isLoading}
          density="comfortable"
          aria-label="users-table"
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
