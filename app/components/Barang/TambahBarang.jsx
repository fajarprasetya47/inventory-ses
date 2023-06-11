import { Form, useNavigation } from '@remix-run/react'

export default function TambahBarang() {
  const navigation = useNavigation();

  const isSubmitting = navigation.state != 'idle';
  return (
    <>
      <Form method='post'>
        <div class="mb-2">
          <label class="form-label">Nama Barang</label>
          <input type="text" name="namaBarang" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Modal</label>
          <input type="number" name="modal" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Harga Jual</label>
          <input type="number" name="hargaJual" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Stok</label>
          <input type="number" name="stok" value='0' class="form-control" disabled />
        </div>
        <button type="submit" disabled={isSubmitting} class="btn btn-md btn-success w-100 mt-3">
          {isSubmitting ? 'Saving..' : 'Submit'}
        </button>
      </Form>
    </>
  )
}