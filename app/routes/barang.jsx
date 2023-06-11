import * as React from 'react';
import TambahBarang from "../components/Barang/TambahBarang";
import Dashboard from "../components/Dashboard/Dashboard";
import ModalLayout from "../components/Modal";
import Tabel from "../components/Tabel";
import { redirect } from '@remix-run/node'
import { addBarang, getBarang } from '../data/barang.server';
import { Link, useLoaderData } from '@remix-run/react';

export default function Barang() {
  const barang = useLoaderData();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'namaBarang', headerName: 'Nama Barang', width: 200 },
    { field: 'modal', headerName: 'Modal', width: 90 },
    { field: 'hargaJual', headerName: 'Harga Jual', width: 100 },
    { field: 'stok', headerName: 'Stok', width: 70 },
    { field: 'status', headerName: 'Status', width: 80 },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div className='d-flex flex-direction-column gap-3'>
            <Link to={`${params?.row?.id?.toString()}`} className='btn btn-sm btn-warning'>Edit</Link>
            <button className='btn btn-sm btn-danger'>Hapus</button>
          </div>
        )
      },
    },
  ];

  const rows = [
    { id: 1, namaBarang: 'Bolt Ikan 1 Kg', modal: 19500, hargaJual: 23000, stok: 40 },

  ];
  return (
    <>
      <Dashboard title="Barang" active='barang'>
        <div className="my-2">
          <button onClick={handleOpen} className="btn btn-sm btn-success">+ Tambah Barang</button>
        </div>
        <Tabel columns={columns} rows={barang} />
        <ModalLayout title='Tambah Barang' open={open} onClose={handleClose} >
          <TambahBarang />
        </ModalLayout>
      </Dashboard>
    </>
  );
}

export async function loader() {
  const barang = await getBarang();
  return barang;
}

export async function action({ request }) {
  const formData = await request.formData();
  const dataBarang = Object.fromEntries(formData);
  console.log(dataBarang);
  await addBarang(dataBarang);
  return redirect('/barang');
}