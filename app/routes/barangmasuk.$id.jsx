import { useFetcher, useLoaderData, useMatches, useNavigation } from "@remix-run/react";
import ModalLayout from "../components/Modal";
import { redirect } from "@remix-run/node";
import { deleteBarangMasuk, getBarangMasukId } from "../data/barangmasuk.server";

export default function barangMasukId() {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const matches = useMatches();
  const data = useLoaderData();
  const barang = matches.find((barang) => barang.id === 'routes/barangmasuk')?.data?.barang;
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
      action: `/barangmasuk/${id}`
    })
  }

  return (
    <>
      <ModalLayout title='Detail Transaksi' open={true} onClose={handleClose}>
        <div class="mb-2">
          <label class="form-label">Tanggal Masuk Barang</label>
          <div>
            <input
              type="text"
              className='form-control'
              name="tanggalMasuk"
              defaultValue={data.tanggalMasuk?.slice(0, 10)}
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
            <label class="form-label">Jumlah Barang Masuk</label>
            <input type="number" min='0' step='0.1' defaultValue={data?.jumlahMasuk} name="jumlahMasuk" class="form-control" disabled />
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
  const barangId = await getBarangMasukId(params.id);
  return barangId;
}

export async function action({ params, request }) {
  const id = params.id;
  if (request.method === 'DELETE') {
    await deleteBarangMasuk(id);
    return redirect('/barangmasuk');
  }
}