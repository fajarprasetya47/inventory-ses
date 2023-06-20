import * as React from 'react';
import TambahBarang from "../components/Barang/TambahBarang";
import Dashboard from "../components/Dashboard/Dashboard";
import ModalLayout from "../components/Modal";
import Tabel from "../components/Tabel";
import { redirect } from '@remix-run/node'
import { addBarang, getBarang } from '../data/barang.server';
import { Link, Outlet, useFetcher, useLoaderData, useNavigation } from '@remix-run/react';
import { requireUserSession } from '../data/auth.server';

export default function Barang() {
  const navigation = useNavigation();
  const load = useLoaderData();
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
    {
      field: 'number',
      headerName: 'No',
      width: 50,
      renderCell: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1
    },
    { field: 'namaBarang', headerName: 'Nama Barang', width: 200 },
    { field: 'modal', headerName: 'Modal', width: 100 },
    { field: 'hargaJual', headerName: 'Harga Jual', width: 100 },
    { field: 'stok', headerName: 'Stok', width: 80 },
    { field: 'satuan', headerName: 'Satuan', width: 70 },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <>
          {params.row.status == 'kosong' ? (
            <>
              <div className='dot-red mx-1'></div>
              <label>kosong</label>
            </>
          ) : <></>}
          {params.row.status == 'minim' ? (
            <>
              <div className='dot-yellow mx-1'></div>
              <label>minim</label>
            </>
          ) : <></>}
          {params.row.status == 'ready' ? (
            <>
              <div className='dot-green mx-1'></div>
              <label>ready</label>
            </>
          ) : <></>}
        </>
      )
    },
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
          <button onClick={handleOpen} disabled={isSubmitting} className="btn btn-success">
            {/* {isSubmitting ? 'Loading...' : '+ Tambah Barang'} */}
            + Tambah Barang
          </button>
        </div>
        <Tabel columns={columns} rows={load?.barang} />
        <ModalLayout title='Tambah Barang' open={isSubmitting ? false : open} onClose={handleClose} >
          <TambahBarang />
        </ModalLayout>
        <Outlet />
      </Dashboard>
    </>
  );
}

export async function loader({request}) {
  const userId = await requireUserSession(request);
  const barang = await getBarang();
  return { barang, userId };
}

export async function action({ request }) {
  const formData = await request.formData();
  const dataBarang = Object.fromEntries(formData);
  await addBarang(dataBarang);
  redirect('/barang');
  const message = 'Berhasil'
  return message;
}