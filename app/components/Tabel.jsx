// import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

export default function Tabel({columns, rows}) {
  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          showColumnVerticalBorder
        />
      </div>
    </>
  )
}