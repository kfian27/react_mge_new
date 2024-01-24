import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isEmpty, debounce } from '../utils/utils';
import * as BIcon from 'react-bootstrap-icons';
import Tooltip from '@mui/material/Tooltip';
import { alertConfirmation, alertSuccess } from './MasterAlert';
import { Box, styled, useTheme, Button, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import MasterFilter from './MasterFilter';
import Add from '@mui/icons-material/Add';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const MasterList = ({ configTable }) => {
  const theme = useTheme();
  let columns = configTable.columns;

  let canCreate = configTable.canCreate || '1';
  let csortBy = configTable.sortBy || 'id';
  let csortType = configTable.sortType || 'DESC';
  let climitData = configTable.limitData || 10;
  let ccanEdit = configTable.canEdit || '1';
  let ccanDelete = configTable.canDelete || '1';
  let canFilter = configTable.canFilter || '0';

  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState(csortBy);
  const [sortType, setSortType] = useState(csortType);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(climitData);
  const [pageNow, setPagenow] = useState(1);
  const [canEdit, setCanEdit] = useState(ccanEdit);
  const [canDelete, setCanDelete] = useState(ccanDelete);

  let copyColumns = columns;

  columns.forEach((val, index) => {
    let cekAction = val.isAction || false;
    if (cekAction) {
      copyColumns[index].cell = (row) => (
        <Grid container direction="row" justifyContent="center" alignItems="center">
          {/* Tombol Edit */ editButton(row.canEdit, row.id)}

          {
            /* Tombol Delete (gunakan onClick untuk menangani logika penghapusan */
            deleteButton(row.canDelete, row.id)
          }
        </Grid>
      );
    }
  });

  columns = copyColumns;

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, pageNow, sortBy, sortType]);

  const handleDelete = async (id) => {
    try {
      alertConfirmation().then((result) => {
        if (result.isConfirmed) {
          alertSuccess({ title: 'Success', subTitle: 'Berhasil !' });
          // await axios.delete(`${configTable.UrlDelete}/${id}`);
          debounce(3000, window.location.reload());
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editButton = (value, id) => {
    let renderEdit = '';
    if (value && canEdit === '1') {
      renderEdit = (
        <Tooltip title="Edit" placement="bottom">
          <Link to={`edit/${id}`}>
            <StyledIconButton size="small" variant="outlined" color="primary">
              <BIcon.PencilSquare />
            </StyledIconButton>
          </Link>
        </Tooltip>
      );
    }
    return renderEdit;
  };

  const deleteButton = (value, id) => {
    let renderDelete = '';
    if (value && canDelete === '1') {
      renderDelete = (
        <Tooltip title="Hapus" placement="bottom">
          <StyledIconButton
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDelete(id)}
          >
            <BIcon.Trash2 />
          </StyledIconButton>
        </Tooltip>
      );
    }
    return renderDelete;
  };

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(configTable.urlList, {
        params: {
          limit: limit,
          page: pageNow,
          sort_by: sortBy,
          sort_type: sortType,
        },
      });
      setData(response.data.data.rows);
      setTotalRows(response.data.data.count);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    if (page === 0) {
      page = 1;
    }
    setPagenow(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    if (page === 0) {
      page = 1;
    }
    setPagenow(page);
    setLimit(newPerPage);
  };

  const handleSort = (column, sortDirection) => {
    if (!isEmpty(column)) {
      setSortBy(column.sortField);
      setSortType(sortDirection);
    }
  };

  const divCreate = () => {
    if (canCreate === '1') {
      return (
        <Tooltip title="Tambah" placement="bottom">
          <Link to={'add'}>
            <StyledButton variant="outlined" color="primary" size="small">
              <Add />
            </StyledButton>
          </Link>
        </Tooltip>
      );
    } else {
      return '';
    }
  };

  const paginationComponentOptions = {
    rowsPerPageText: 'Data per halaman',
    rangeSeparatorText: 'dari',
  };

  const generateTable = (
    <DataTable
      // title="Data Company"
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      sortServer
      onSort={handleSort}
      paginationPerPage={limit}
      responsive={true}
      paginationComponentOptions={paginationComponentOptions}
      // selectableRows // Enable checkbox for selecting rows
    />
  );

  const filterContainer = () => {
    if (canFilter === '1') {
      let checkFilter = configTable.configFilter || {};
      if (isEmpty(checkFilter)) {
        console.error('configFilter is requuired');
      }
      const configFilter = configTable.configFilter;
      return <MasterFilter configFilter={configFilter} />;
    }
  };

  return (
    <div>
      {filterContainer()}
      <div className="col-12 row">
        <div className="col-md-6"></div>
        <div className="col-md-6 d-flex justify-content-end">{divCreate()}</div>
      </div>
      {generateTable}
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  MasterList: MasterList,
};
