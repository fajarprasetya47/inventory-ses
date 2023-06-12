import * as React from 'react';
import Dashboard from "../components/Dashboard/Dashboard";
import ModalLayout from "../components/Modal";
import Tabel from "../components/Tabel";
import TambahBarangMasuk from "../components/Transaksi/TambahBarangMasuk";

export default function BarangMasuk() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'tanggalMasuk', headerName: 'Tanggal Masuk', width: 130 },
    { field: 'namaBarang', headerName: 'Nama Barang', width: 130 },
    { field: 'jumlahMasuk', headerName: 'Jumlah Masuk', width: 130 },
    { field: 'keterangan', headerName: 'Keterangan', width: 130 },
  ];

  const rows = [
    { id: 1, tanggalMasuk: '2023-01-01', namaBarang: 'Bolt Ikan 1 Kg', jumlahMasuk: 35, keterangan: '' },
  ];
  return (
    <>
      <Dashboard title="Transaksi Barang Masuk" active='transaksi'>
        <div className="my-2">
          <button onClick={handleOpen} className="btn btn-sm btn-success">+ Barang Masuk</button>
        </div>
        <Tabel columns={columns} rows={rows} />
        <ModalLayout title='Tambah Barang Masuk' open={open} onClose={handleClose}>
          <TambahBarangMasuk/>
        </ModalLayout>
      </Dashboard>
    </>
  );
}
