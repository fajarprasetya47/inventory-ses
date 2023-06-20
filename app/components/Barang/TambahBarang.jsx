import { Form, useActionData, useNavigation } from '@remix-run/react'
import { Alert, Collapse } from '@mui/material';
import { useState } from 'react';
import Select from 'react-select';

export default function TambahBarang() {
  const [open, setOpen] = useState(true);
  const navigation = useNavigation();
  const message = useActionData();
  const isSubmitting = navigation.state != 'idle';

  const option = [
    { label: 'Pcs', value: 'Pcs' },
    { label: 'Kg', value: 'Kg' },
  ]
  return (
    <>
      {message != undefined ? (
        <Collapse in={open}>
          <Alert
            severity='success'
            onClose={() => {
              setOpen(false);
            }}
          >
            {message}
          </Alert>
        </Collapse>
      ) : <></>}
      <Form method='post'>
        <div class="mb-2">
          <label class="form-label">Nama Barang</label>
          <input type="text" name="namaBarang" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Modal</label>
          <input type="number" min='0' name="modal" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Harga Jual</label>
          <input type="number" min='0' name="hargaJual" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Pilih Satuan</label>
          <Select options={option} name='satuan' isSearchable={true} placeholder='Pilih satuan...' required />
        </div>
        <div class="mb-2">
          <label class="form-label">Stok</label>
          <input type="number" name="stok" step='0.1' defaultValue='0' class="form-control" disabled />
        </div>
        <button
          type="submit"
          // disabled={isSubmitting}
          class="btn btn-md btn-success w-100 mt-3"
        >
          {/* {isSubmitting ? 'Saving..' : 'Submit'} */}
          Submit
        </button>
      </Form>
    </>
  )
}