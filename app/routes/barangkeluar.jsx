import * as React from 'react';
import Dashboard from "../components/Dashboard/Dashboard";
import ModalLayout from "../components/Modal";
import Tabel from "../components/Tabel";
import TambahBarangKeluar from '../components/Transaksi/TambahBarangKeluar';

export default function BarangKeluar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'tanggalKeluar', headerName: 'Tanggal Keluar', width: 130 },
    { field: 'namaBarang', headerName: 'Nama Barang', width: 200 },
    { field: 'jumlahKeluar', headerName: 'Jumlah Keluar', width: 130 },
    { field: 'keterangan', headerName: 'Keterangan', width: 200 },

  ];

  const rows = [
    { id: 1, tanggalKeluar: '2023-01-01', namaBarang: 'Bolt Ikan 1 Kg', jumlahKeluar: 35, keterangan: '' },
  ];
  return (
    <>
      <Dashboard title="Transaksi Barang Keluar" active='transaksi'>
        <div className="my-2">
          <button onClick={handleOpen} className="btn btn-sm btn-success">+ Barang Keluar</button>
        </div>
        <Tabel columns={columns} rows={rows} />
        <ModalLayout title='Tambah Barang Keluar' open={open} onClose={handleClose}>
          <TambahBarangKeluar/>
        </ModalLayout>
      </Dashboard>
    </>
  );
}
