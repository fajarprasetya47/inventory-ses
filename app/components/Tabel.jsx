import { DataGrid } from '@mui/x-data-grid'

export default function Tabel({ columns, rows, print }) {
  return (
    <>
      <div style={{ height: print ? '100%' : 400, width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[50, 100]}
          showColumnVerticalBorder
        />
      </div>
    </>
  )
}