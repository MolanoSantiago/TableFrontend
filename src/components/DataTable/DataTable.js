import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
export default function DataTable(props) {
  const [pageSize, setPageSize] = React.useState(10);
  return (
    <div style={{ width: '100%'}}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        autoHeight
        noWrap = {true}
        getRowId={(row) => row.id}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 15, 20]}
        pagination
        loading={props.loading}
        components={{ Toolbar: GridToolbar }}
        sx={{
          width:'100%',
          m: 0,
          boxShadow: 5,
          borderColor: '#000',
        }}
      />
    </div>
  );
}