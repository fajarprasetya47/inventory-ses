import { Form, useMatches } from '@remix-run/react';
import { useState } from 'react';
import Select from 'react-select'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export default function TambahBarangKeluar() {
  const [stok, setStok] = useState();
  const [satuan, setSatuan] = useState();
  const matches = useMatches();
  const barang = matches.find((barang) => barang.id === 'routes/barangkeluar')?.data?.barang;

  const option = barang?.map((item) => (
    { label: item.namaBarang, value: item.id }
  ));

  const handleIdBarang = (e) => {
    const id = e.value;
    const stok = barang.find((barang) => barang.id === id)?.stok;
    const satuan = barang.find((barang) => barang.id === id)?.satuan;
    setStok(stok);
    setSatuan(satuan);
  }
  return (
    <>
      <Form method='post'>
        <div class="mb-2">
          <label class="form-label">Tanggal</label>
          <div>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                sx={{ width: '100%' }}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider> */}
            <input
              type="date"
              className='form-control'
              name="tanggalKeluar"
              max={new Date().toISOString()?.slice(0, 10)}
              defaultValue={new Date().toISOString()?.slice(0, 10)}
              required
            />
          </div>
        </div>
        <div class="mb-2">
          <label class="form-label">Pilih Barang</label>
          <Select onChange={handleIdBarang} options={option} name='idBarang' isSearchable={true} placeholder='Pilih Barang...' required />
        </div>
        <div class='mb-2'>
          <label class="form-label">Stok</label>
          <input type="number" name='stok' defaultValue={stok} class="form-control" disabled />
          <input type="hidden" defaultValue={stok} name="stok" class="form-control" />
        </div>
        <div class="mb-2 row">
          <div className='col-10'>
            <label class="form-label">Jumlah Barang</label>
            {stok ? (
              <input type="number" min='0' max={stok} step='0.1' name="jumlahKeluar" class="form-control" required />
            ) : <input type="number" min='0' max={stok} step='0.1' name="jumlahKeluar" class="form-control" disabled />}
          </div>
          <div className='col-2'>
            <label class="form-label">Satuan</label>
            <input type="text" defaultValue={satuan} name="satuan" class="form-control" disabled />
          </div>
        </div>
        <div class="mb-2">
          <label class="form-label">Keterangan</label>
          <input type="text" name="keterangan" defaultValue='Penjualan' class="form-control" />
        </div>
        <button type="submit" class="btn btn-md btn-success w-100 mt-3">Submit</button>
      </Form>
    </>
  )
}