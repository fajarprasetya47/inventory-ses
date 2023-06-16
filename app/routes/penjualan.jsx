import { useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Tabel from "../components/Tabel";
import { requireUserSession } from "../data/auth.server";
import { getBarang, updateBarang } from "../data/barang.server";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import Select from "react-select";
import { Alert } from "@mui/material";
import { addBarangKeluar } from "../data/barangkeluar.server";
import { redirect } from "@remix-run/node";
import { createKeranjangSession, getKeranjangFromSession } from "../data/penjualan.server";

export default function Penjualan() {
  const today = new Date().toISOString()?.slice(0, 10);
  const [data, setData] = useState();
  const [jumlahKeluar, setJumlahKeluar] = useState();
  const [total, setTotal] = useState();
  const [tanggalKeluar, setTanggaKeluar] = useState(today);
  const [keterangan, setKeterangan] = useState('');
  const [keranjang, setKeranjang] = useState([]);
  const [totalBarang, setTotalBarang] = useState(0);
  const [message, setMessage] = useState();
  const fetcher = useFetcher();
  const barang = useLoaderData()?.barang?.filter((item) => item.status != 'kosong');
  const option = barang?.map((item) => (
    { label: item?.namaBarang, value: item?.id }
  ));
  const handleBarang = (e) => {
    const id = e.value;
    const barangId = barang.find((barang) => barang.id === id);
    setData(barangId); setJumlahKeluar(1); setTotal(barangId?.hargaJual);
    setMessage();
  }
  const handleTotal = (e) => {
    const n = e.target.value;
    const price = data?.hargaJual;
    setJumlahKeluar(n); setTotal(n * price); setMessage();
  }
  const inputKeranjang = () => {
    const obj = {
      id: data?.id,
      idBarang: data?.id,
      tanggalKeluar,
      namaBarang: data?.namaBarang,
      stok: data?.stok,
      jumlahKeluar,
      totalHarga: total,
      keterangan,
    }
    if (obj.id == undefined) return setMessage('Data tidak boleh kosong');
    if (obj.jumlahKeluar > obj.stok) return setMessage(`Maksimal pembelian ${obj.stok}`);
    const keranjangId = keranjang?.find(item => item.id === data?.id);
    if (keranjangId != undefined) {
      setTotal(); setJumlahKeluar(); setData();
      return setMessage('Barang sudah dikeranjang, silakan edit barang');
    }
    setKeranjang([...keranjang, obj]);
    setTotalBarang(totalBarang + total);
    setTotal(); setJumlahKeluar(); setData(); setMessage();
  }
  const editKeranjang = (id) => {
    setMessage();
    const newKeranjang = keranjang.filter((item) => item.id != id);
    const selectedKeranjang = keranjang.find((item) => item.id == id);
    setKeranjang(newKeranjang);
    setTotalBarang(totalBarang - (selectedKeranjang?.totalHarga))
    setToForm(id, selectedKeranjang?.jumlahKeluar, selectedKeranjang?.totalHarga);
  }
  const setToForm = (id, jumlahKeluar, total) => {
    const barangId = barang.find((barang) => barang.id === id);
    setData(barangId); setJumlahKeluar(jumlahKeluar); setTotal(total);
  }
  const handleProses = () => {
    setMessage();
    if (!keranjang) return;
    try {
      return
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {
      field: 'number',
      headerName: 'No',
      width: 50,
      sortable: false,
      renderCell: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1
    },
    { field: 'namaBarang', headerName: 'Nama Barang', width: 160 },
    { field: 'jumlahKeluar', headerName: 'Jumlah', width: 70 },
    { field: 'totalHarga', headerName: 'Total Harga', width: 130 },
    {
      field: 'action',
      headerName: 'Action',
      width: 80,
      renderCell: (params) => {
        return (
          <button onClick={() => editKeranjang(params.row.id)} className='btn btn-sm btn-outline-warning'>Edit</button>
        )
      },
    }
  ];


  return (
    <>
      <Dashboard title="Penjualan" active='barangkeluar'>
        <div className="sales">
          <div className="sales-add">
            <div className="mb-2">{message ? <Alert severity="error">{message}</Alert> : <></>}</div>
            {/* <Form method="post"> */}
              <div className="mb-2">
                <label className="form-label">Pilih Barang</label>
                <Select onChange={handleBarang} value={data ? option?.find(item => item.value == data?.id) : undefined} options={option} name='idBarang' isSearchable={true} placeholder='Pilih Barang...' required />
                <input type="hidden" name='id' defaultValue={data ? data?.id : '0'} className="form-control form-control-sm" />
                <input type="hidden" name='namaBarang' defaultValue={data ? data?.namaBarang : ''} className="form-control form-control-sm" />
              </div>
              <div className="mb-2 row">
                <div className='col-3'>
                  <label className="form-label">Stok</label>
                  <input type="number" name='stok' defaultValue={data ? data?.stok : '0'} className="form-control form-control-sm" disabled />
                  <input type="hidden" name='stok' defaultValue={data ? data?.stok : '0'} className="form-control form-control-sm" />
                </div>
                <div className='col-9'>
                  <label className="form-label">Harga</label>
                  <input type="number" name='hargaJual' defaultValue={data ? data?.hargaJual : '0'} className="form-control form-control-sm" disabled />
                  <input type="hidden" name='hargaJual' defaultValue={data ? data?.hargaJual : '0'} className="form-control form-control-sm" />
                </div>
              </div>
              <div className="mb-2 row">
                <div className='col-10'>
                  <label className="form-label">Jumlah Barang</label>
                  {data ?
                    <input type="number" onChange={handleTotal} value={jumlahKeluar} min='0' max={data?.stok} step='0.1' name="jumlahKeluar" className="form-control form-control-sm" required />
                    : <input type="number" step='0.1' name="jumlahKeluar" value='0' className="form-control form-control-sm" disabled />}
                </div>
                <div className='col-2'>
                  <label className="form-label">Satuan</label>
                  <input type="text" defaultValue={data ? data?.satuan : ''} name="satuan" className="form-control form-control-sm" disabled />
                </div>
              </div>
              <div class="mb-2">
                <label className="form-label">Total</label>
                <input type="number" name='totalHarga' value={total ? total : '0'} className="form-control form-control-sm" disabled />
                <input type="hidden" name='totalHarga' value={total ? total : '0'} className="form-control form-control-sm" />
              </div>
              <div className="mb-3 row">
                <div class="col-6">
                  <label class="form-label">Tanggal</label>
                  <div>
                    <input
                      type="date"
                      className='form-control form-control-sm'
                      name="tanggalKeluar"
                      onChange={(e) => setTanggaKeluar(e.target.value)}
                      max={today}
                      value={tanggalKeluar}
                      required
                    />
                  </div>
                </div>
                <div class="col-6">
                  <label class="form-label">Keterangan</label>
                  <input onChange={(e) => setKeterangan(e.target.value)} type="text" name="keterangan" value={keterangan} class="form-control form-control-sm" />
                </div>
              </div>
              <button onClick={inputKeranjang} className="btn btn-sm btn-dark-blue w-100 my-3">Tambah</button>
            {/* </Form> */}
          </div>
          <div className="sales-table">
            <Tabel columns={columns} rows={keranjang} />
            <div class="my-1 row">
              <div className="col-2"><label class="form-label">Total Barang</label></div>
              <div className="col-10">
                <input type="number" name="total" value={totalBarang} class="form-control form-control-sm" disabled />
              </div>
            </div>
            <div className="my-2 d-flex justify-content-end gap-2">
              <button onClick={() => setKeranjang([])} className="btn btn-sm btn-outline-danger">Reset</button>
              <button className="btn btn-sm btn-dark-blue">Bayar</button>
              <button onClick={handleProses} className="btn btn-sm btn-success w-50">Proses</button>
            </div>
          </div>
        </div>
      </Dashboard>
    </>
  );
}
export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const barang = await getBarang();
  return { barang, userId };
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  //return await createKeranjangSession(data);
  // await addBarangKeluar(data);
  // await updateBarang(data?.idBarang, data);
  return redirect('/penjualan');
}
