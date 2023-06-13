import * as React from 'react';
import Dashboard from "../components/Dashboard/Dashboard";
import ModalLayout from "../components/Modal";
import Tabel from "../components/Tabel";
import TambahBarangMasuk from "../components/Transaksi/TambahBarangMasuk";
import { addBarangMasuk, getBarangMasuk } from '../data/barangmasuk.server';
import { redirect } from '@remix-run/node'
import { getBarang, updateBarang } from '../data/barang.server';
import { useLoaderData, useNavigation } from '@remix-run/react';

export default function BarangMasuk() {
  const navigation = useNavigation();
  const dataLoad = useLoaderData();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isSubmitting = navigation.state != 'idle';

  const deleteHandle = (id) => {
    const proceed = confirm('Hapus transaksi ini?');
    if (!proceed) {
      return;
    }
    fetcher.submit(null, {
      method: 'delete',
      action: `/barangmasuk/${id}`
    })
  }

  const columns = [
    // { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'tanggalMasuk',
      headerName: 'Tanggal Masuk',
      width: 130,
      sortable: false,
      valueGetter: (params) => `${params.row.tanggalMasuk?.slice(0, 10)}`
    },
    {
      field: 'namaBarang',
      headerName: 'Nama Barang',
      width: 200,
      renderCell: (params) => dataLoad?.barang?.find(item => item.id == params.row.idBarang)?.namaBarang
    },
    { field: 'jumlahMasuk', headerName: 'Jumlah Masuk', width: 130, sortable: false },
    { field: 'keterangan', headerName: 'Keterangan', width: 220, sortable: false },
    {
      field: 'action',
      headerName: 'Action',
      width: 70,
      renderCell: (params) => {
        return (
          <label onClick={() => deleteHandle(params.row.id)} className='text-muted' style={{ cursor: 'pointer' }}>Hapus</label>
        )
      },
    }
  ];

  return (
    <>
      <Dashboard title="Transaksi Barang Masuk" active='transaksi'>
        <div className="my-2">
          <button onClick={handleOpen} disabled={isSubmitting} className="btn btn-md btn-success">+ Barang Masuk</button>
        </div>
        <Tabel columns={columns} rows={dataLoad?.barangMasuk} />
        <ModalLayout title='Tambah Barang Masuk' open={isSubmitting ? false : open} onClose={handleClose}>
          <TambahBarangMasuk />
        </ModalLayout>
      </Dashboard>
    </>
  );
}

export async function loader() {
  const barang = await getBarang();
  const barangMasuk = await getBarangMasuk()
  return { barang, barangMasuk };
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  await addBarangMasuk(data);
  await updateBarang(data?.idBarang, data);
  return redirect('/barangmasuk');
}