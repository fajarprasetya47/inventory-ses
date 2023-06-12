import * as React from 'react';
import TambahBarang from "../components/Barang/TambahBarang";
import Dashboard from "../components/Dashboard/Dashboard";
import ModalLayout from "../components/Modal";
import Tabel from "../components/Tabel";
import { redirect } from '@remix-run/node'
import { addBarang, getBarang } from '../data/barang.server';
import { Link, Outlet, useActionData, useFetcher, useLoaderData, useNavigation } from '@remix-run/react';

export default function Barang() {
  const navigation = useNavigation();
  const barang = useLoaderData();
  console.log(barang);
  // const message = useActionData()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isSubmitting = navigation.state != 'idle';

  const fetcher = useFetcher();
  const deleteHandle = (id) => {
    const proceed = confirm('Hapus item ini?');
    if (!proceed) {
      return;
    }
    fetcher.submit(null, {
      method: 'delete',
      action: `/barang/${id}`
    })
  }
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
      sortable: false,
      renderCell: (params) => {
        return (
          <div className='d-flex flex-direction-column gap-3'>
            <Link to={`${params?.row?.id?.toString()}`} className='btn btn-sm btn-warning'>Edit</Link>
            <button onClick={() => deleteHandle(params.row.id)} className='btn btn-sm btn-danger'>Hapus</button>
          </div>
        )
      },
    },
  ];

  return (
    <>
      <Dashboard title="Barang" active='barang'>
        <div className="my-2">
          <button onClick={handleOpen} disabled={isSubmitting} className="btn btn-sm btn-success">
            {/* {isSubmitting ? 'Loading...' : '+ Tambah Barang'} */}
            + Tambah Barang
          </button>
        </div>
        <Tabel columns={columns} rows={barang} />
        <ModalLayout title='Tambah Barang' open={isSubmitting ? false : open} onClose={handleClose} >
          <TambahBarang />
        </ModalLayout>
        <Outlet />
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
  redirect('/barang');
  const message = 'Berhasil'
  return message;
}