import * as React from 'react';
import Dashboard from "../components/Dashboard/Dashboard";
import ModalLayout from "../components/Modal";
import Tabel from "../components/Tabel";
import TambahBarangKeluar from '../components/Transaksi/TambahBarangKeluar';
import { getBarang, updateBarang } from '../data/barang.server';
import { addBarangKeluar, getBarangKeluar } from '../data/barangkeluar.server';
import { Link, Outlet, useLoaderData, useNavigation } from '@remix-run/react';
import { redirect } from '@remix-run/node';
import { requireUserSession } from '../data/auth.server';

export default function BarangKeluar() {
  const navigation = useNavigation();
  const dataLoad = useLoaderData();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isSubmitting = navigation.state != 'idle';

  const columns = [
    // { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'tanggalKeluar',
      headerName: 'Tanggal',
      width: 130,
      sortable: false,
      valueGetter: (params) => `${params.row.tanggalKeluar?.slice(0, 10)}`
    },
    {
      field: 'namaBarang',
      headerName: 'Nama Barang',
      width: 200,
      renderCell: (params) => dataLoad?.barang?.find(item => item.id == params.row.idBarang)?.namaBarang
    },
    { field: 'jumlahKeluar', headerName: 'Jumlah Keluar', width: 130, sortable: false },
    { field: 'keterangan', headerName: 'Keterangan', width: 220, sortable: false },
    {
      field: 'action',
      headerName: 'Action',
      width: 80,
      renderCell: (params) => {
        return (
          <Link to={`/barangkeluar/${params.row.id}`} className='btn btn-sm btn-dark-blue'>Detail</Link>
        )
      },
    }
  ];

  return (
    <>
      <Dashboard title="Transaksi Barang Keluar" active='barangkeluar'>
        <div className="my-2">
          <button onClick={handleOpen} disabled={isSubmitting} className="btn btn-md btn-success">+ Barang Keluar</button>
        </div>
        <Tabel columns={columns} rows={dataLoad?.barangKeluar} />
        <ModalLayout title='Tambah Barang Keluar' open={isSubmitting ? false : open} onClose={handleClose}>
          <TambahBarangKeluar />
        </ModalLayout>
        <Outlet/>
      </Dashboard>
    </>
  );
}

export async function loader({request}) {
  const userId =  await requireUserSession(request);
  const barang = await getBarang();
  const barangKeluar = await getBarangKeluar();
  return { barang, barangKeluar, userId };
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  await addBarangKeluar(data);
  await updateBarang(data?.idBarang, data);
  return redirect('/barangkeluar');
}