import * as React from 'react';
import Dashboard from "../components/Dashboard/Dashboard";
import ModalLayout from "../components/Modal";
import Tabel from "../components/Tabel";
import TambahBarangMasuk from "../components/Transaksi/TambahBarangMasuk";
import { addBarangMasuk} from '../data/barangmasuk.server';
import { redirect } from '@remix-run/node'
import { getBarang, updateBarang } from '../data/barang.server';
import { useNavigation } from '@remix-run/react';

export default function BarangMasuk() {
  const navigation = useNavigation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isSubmitting = navigation.state != 'idle';

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'tanggalMasuk', headerName: 'Tanggal Masuk', width: 130 },
    { field: 'namaBarang', headerName: 'Nama Barang', width: 130 },
    { field: 'jumlahMasuk', headerName: 'Jumlah Masuk', width: 130, sortable: false },
    { field: 'keterangan', headerName: 'Keterangan', width: 130, sortable: false },
  ];

  const rows = [
    { id: 1, tanggalMasuk: '2023-01-01', namaBarang: 'Bolt Ikan 1 Kg', jumlahMasuk: 35, keterangan: '' },
  ];
  return (
    <>
      <Dashboard title="Transaksi Barang Masuk" active='transaksi'>
        <div className="my-2">
          <button onClick={handleOpen} disabled={isSubmitting} className="btn btn-sm btn-success">+ Barang Masuk</button>
        </div>
        <Tabel columns={columns} rows={rows} />
        <ModalLayout title='Tambah Barang Masuk' open={isSubmitting ? false : open} onClose={handleClose}>
          <TambahBarangMasuk />
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
  const data = Object.fromEntries(formData);
  console.log(data);
  await addBarangMasuk(data);
  await updateBarang(data?.idBarang, data);
  return redirect('/barangmasuk');
}