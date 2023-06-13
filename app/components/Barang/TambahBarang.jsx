import { Form, useActionData, useNavigation } from '@remix-run/react'
import { Alert, Collapse } from '@mui/material';
import { useState } from 'react';

export default function TambahBarang() {
  const [open, setOpen] = useState(true);
  const navigation = useNavigation();
  const message = useActionData();
  const isSubmitting = navigation.state != 'idle';
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
          <label class="form-label">Stok</label>
          <input type="number" name="stok" defaultValue='0' class="form-control" disabled />
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