import { useFetcher, useLoaderData, useMatches, useNavigation } from "@remix-run/react";
import ModalLayout from "../components/Modal";
import { redirect } from "@remix-run/node";
import { deleteBarangKeluar, getBarangKeluarId } from "../data/barangkeluar.server";

export default function barangKeluarId() {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const matches = useMatches();
  const data = useLoaderData();
  const barang = matches.find((barang) => barang.id === 'routes/barangkeluar')?.data?.barang;
  const namaBarang = barang.find((barang) => barang.id == data?.idBarang)?.namaBarang;
  const satuan = barang.find((barang) => barang.id == data?.idBarang)?.satuan;
  
  const isSubmitting = navigation.state != 'idle';
  const handleClose = () => {
    window.history.back()
  }
  const deleteHandle = (id) => {
    const proceed = confirm('Hapus transaksi ini?');
    if (!proceed) {
      return;
    }
    fetcher.submit(null, {
      method: 'delete',
      action: `/barangkeluar/${id}`
    })
  }

  return (
    <>
      <ModalLayout title='Detail Transaksi' open={true} onClose={handleClose}>
        <div class="mb-2">
          <label class="form-label">Tanggal</label>
          <div>
            <input
              type="text"
              className='form-control'
              name="tanggalKeluar"
              defaultValue={data.tanggalKeluar?.slice(0, 10)}
              disabled
            />
          </div>
        </div>
        <div class="mb-2">
          <label class="form-label">Nama Barang</label>
          <input type="text" name="namaBarang" defaultValue={namaBarang} class="form-control" disabled />
        </div>
        <div class="mb-2 row">
          <div className='col-10'>
            <label class="form-label">Jumlah Barang</label>
            <input type="number" min='0' step='0.1' defaultValue={data?.jumlahKeluar} name="jumlahKeluar" class="form-control" disabled />
          </div>
          <div className='col-2'>
            <label class="form-label">Satuan</label>
            <input type="text" defaultValue={satuan} name="satuan" class="form-control" disabled />
          </div>
        </div>
        <div class="mb-2">
          <label class="form-label">Keterangan</label>
          <input type="text" name="keterangan" defaultValue={data?.keterangan} class="form-control" disabled />
        </div>
        <button onClick={() => deleteHandle(data?.id)} disabled={isSubmitting} class="btn btn-md btn-danger mt-3">Hapus</button>
      </ModalLayout>
    </>
  )
}

export async function loader({ params }) {
  const barangId = await getBarangKeluarId(params.id);
  return barangId;
}

export async function action({ params, request }) {
  const id = params.id;
  if (request.method === 'DELETE') {
    await deleteBarangKeluar(id);
    return redirect('/barangkeluar');
  }
}