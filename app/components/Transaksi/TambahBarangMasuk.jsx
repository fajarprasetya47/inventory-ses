import Select from 'react-select'
import { Form, useMatches } from '@remix-run/react';
import { useState } from 'react';

export default function TambahBarangMasuk() {
  const [data, setData] = useState();
  const matches = useMatches();
  const barang = matches.find((barang) => barang.id === 'routes/barangmasuk')?.data?.barang;

  const option = barang?.map((item) => (
    { label: item.namaBarang, value: item.id }
  ));

  const handleIdBarang = (e) => {
    const id = e.value;
    const barangId = barang.find((barang) => barang.id === id);
    setData(barangId);
  }
  return (
    <>
      <Form method='post'>
        <div class="mb-2">
          <label class="form-label">Tanggal Masuk</label>
          <div>
            <input
              type="date"
              className='form-control'
              name="tanggalMasuk"
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
          <input type="number" name='stok' defaultValue={data?.stok} class="form-control" disabled />
          <input type="hidden" defaultValue={data?.stok} name="stok" class="form-control" />
        </div>
        <div class="mb-2 row">
          <div className='col-10'>
            <label class="form-label">Jumlah Barang Masuk</label>
            <input type="number" min='1' step='0.1' name="jumlahMasuk" class="form-control" required />
          </div>
          <div className='col-2'>
            <label class="form-label">Satuan</label>
            <input type="text" defaultValue={data?.satuan} name="satuan" class="form-control" disabled />
          </div>
        </div>
        <div class="mb-2">
          <label class="form-label">Keterangan</label>
          <input type="text" name="keterangan" defaultValue='Barang masuk' class="form-control" />
        </div>
        <button type="submit" class="btn btn-md btn-success w-100 mt-3">Submit</button>
      </Form>
    </>
  )
}