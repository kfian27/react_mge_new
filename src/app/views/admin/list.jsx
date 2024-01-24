import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { apiUrl } from 'app/utils/constant';
import * as BIcon from 'react-bootstrap-icons';
import MasterList from 'app/components/MasterList';
import { Box, styled, useTheme } from '@mui/material';
import Breadcrumb from 'app/components/Breadcrumb';
import SimpleCard from 'app/components/SimpleCard';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px',
  },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px',
    },
  },
}));

const List = () => {
  const theme = useTheme();
  // const StyledCell = styled.div``;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const getJenisIcon = (value) => {
    if (value === 1) {
      return <BIcon.Check2 />;
    } else {
      return <BIcon.X />;
    }
  };

  const columns = [
    {
      name: 'Aksi',
      isAction: true,
    },
    {
      name: 'Kode Perusahaan',
      selector: (row) => row.kode,
      sortable: true,
      sortField: 'kode',
    },
    {
      name: 'Nama',
      selector: (row) => row.nama_perusahaan,
      sortable: true,
      sortField: 'nama_perusahaan',
    },
    {
      name: 'Alamat',
      selector: (row) => row.alamat,
      sortable: true,
      sortField: 'alamat',
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      sortField: 'email',
    },
    {
      name: 'PIC',
      selector: (row) => row.nama,
      sortable: true,
      sortField: 'nama',
    },
    {
      name: 'telp',
      selector: (row) => row.telp,
      sortable: true,
      sortField: 'telp',
    },
    {
      name: 'aktif',
      // cell: (row) => <StyledCell className="status_jenis">{getJenisIcon(row.jenis)}</StyledCell>,
      sortable: true,
      sortField: 'jenis',
    },
  ];

  const configFilter = [
    {
      title: 'Nama',
      fieldType: 'text',
      fieldName: 'nama',
    },
    {
      title: 'Nomor',
      fieldType: 'numeric',
      fieldName: 'id',
    },
    {
      title: 'Date',
      fieldType: 'date',
      fieldName: 'date',
      value: [startDate, endDate],
      callback: [setStartDate, setEndDate],
    },

    {
      title: 'Select',
      fieldType: 'select',
      fieldName: 'select',
      defaultValue: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ],
    },
  ];

  const configTable = {
    columns: columns,
    urlList: `${apiUrl}master/company`,
    urlDelete: `${apiUrl}master/company`,
    sortBy: 'created_at',
    sortType: 'DESC',
    canFilter: '1',
    configFilter: configFilter,
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Admin', path: '/admin' }, { name: 'List' }]} />
      </Box>
      <SimpleCard title="List Company">
        <MasterList.MasterList configTable={configTable} />
      </SimpleCard>
    </Container>
  );
};

export default List;
