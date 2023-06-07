import * as React from 'react';
import Dashboard from "../components/Dashboard/Dashboard";
import ModalLayout from "../components/Modal";
import TambahPengguna from '../components/Pengguna/TambahPengguna';
import Tabel from "../components/Tabel";

export default function Pengguna() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'role', headerName: 'Role', width: 130 },
    { 
      field: 'action', 
      headerName: 'Action', 
      width: 200,
      disableClickEventBubbling: true,
      renderCell: (params)=> {
        return(
          <div className='d-flex flex-direction-column gap-3'>
            <button className='btn btn-sm btn-danger'>Hapus</button>
            <button className='btn btn-sm btn-warning'>Edit</button>
          </div>
        )
      }, 
    },
  ];

  const rows = [
    { id: 1, username: 'test@gmail.com', role: 'admin' },
  ];
  return (
    <>
      <Dashboard title="Daftar Pengguna" active='pengguna'>
        <div className="my-2">
          <button onClick={handleOpen} className="btn btn-sm btn-success">+ Tambah Pengguna</button>
        </div>
        <Tabel columns={columns} rows={rows} />
        <ModalLayout title='Tambah Pengguna' open={open} onClose={handleClose}>
          <TambahPengguna />
        </ModalLayout>
      </Dashboard>
    </>
  );
}
