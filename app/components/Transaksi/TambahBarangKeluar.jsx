import { Form, useMatches } from '@remix-run/react';
import { useState } from 'react';
import Select from 'react-select'

export default function TambahBarangKeluar() {
  const [data, setData] = useState();
  const [total, setTotal] = useState();
  const matches = useMatches();
  let barang = matches.find((barang) => barang.id === 'routes/barangkeluar')?.data?.barang;
  barang = barang.filter((item) => item.status != 'kosong');

  const option = barang?.map((item) => (
    { label: item.namaBarang, value: item.id }
  ));

  const handleIdBarang = (e) => {
    const id = e.value;
    const barangId = barang.find((barang) => barang.id === id);
    setData(barangId); setTotal(barangId?.hargaJual);
  }
  const handleJumlah = (e) => {
    const n = e.target.value;
    const price = data?.hargaJual;
    setTotal(n * price);
  }

  return (
    <>
      <Form method='post'>
        <div class="mb-2">
          <label class="form-label">Tanggal</label>
          <div>
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
        <div class='mb-2 row'>
          <div className='col-4'>
            <label class="form-label">Stok</label>
            <input type="number" name='stok' defaultValue={data?.stok} class="form-control" disabled />
            <input type="hidden" defaultValue={data?.stok} name="stok" class="form-control" />
          </div>
          <div className='col-8'>
            <label class="form-label">Harga</label>
            <input type="number" name='totalHarga' defaultValue={total} class="form-control" disabled />
            <input type="hidden" defaultValue={total} name="totalHarga" class="form-control" />
          </div>
        </div>
        <div class="mb-2 row">
          <div className='col-10'>
            <label class="form-label">Jumlah Barang</label>
            {data ? (
              <input type="number" onChange={handleJumlah} min='1' max={data?.stok} step='0.1' name="jumlahKeluar" class="form-control" required />
            ) : <input type="number" min='1' max={data?.stok} step='0.1' name="jumlahKeluar" class="form-control" disabled />}
          </div>
          <div className='col-2'>
            <label class="form-label">Satuan</label>
            <input type="text" defaultValue={data?.satuan} name="satuan" class="form-control" disabled />
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