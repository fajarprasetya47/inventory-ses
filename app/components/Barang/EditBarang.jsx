import { Form, useActionData, useLoaderData, useMatches, useNavigation, useParams } from '@remix-run/react'
import { Alert, Collapse } from '@mui/material';
import { useState } from 'react';
import Select from 'react-select';

export default function EditBarang() {
  // const [open, setOpen] = useState(true);
  // const message = useActionData();
  // const params = useParams();
  const barangId = useLoaderData();
  console.log(barangId);

  const navigation = useNavigation();
  const isSubmitting = navigation.state != 'idle';

  // if (params.id && !barangId) {
  //   throw new Error('Invalid Id');
  // }

  const option = [
    { label: 'Pcs', value: 'Pcs' },
    { label: 'Kg', value: 'Kg' },
  ]

  return (
    <>
      {/* {message != undefined ? (
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
      ) : <></>} */}
      <Form method='patch'>
        <div class="mb-2">
          <label class="form-label">Nama Barang</label>
          <input type="text" defaultValue={barangId?.namaBarang} name="namaBarang" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Modal</label>
          <input type="number" defaultValue={barangId?.modal} name="modal" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Harga Jual</label>
          <input type="number" defaultValue={barangId?.hargaJual} name="hargaJual" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Pilih Satuan</label>
          <Select
            options={option}
            defaultValue={option?.find((item) => item.value == barangId?.satuan)}
            name='satuan'
            isSearchable={true}
            placeholder='Pilih satuan...'
            required
          />
        </div>
        <div class="mb-2">
          <label class="form-label">Stok</label>
          <input type="number" step='0.1' defaultValue={barangId?.stok} name="stok" class="form-control" disabled />
        </div>
        <div class="mb-2 d-none">
          <input type="hidden" defaultValue={barangId?.status} name="status" class="form-control" disabled />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          class="btn btn-md btn-warning w-100 mt-3"
        >
          {isSubmitting ? 'Saving..' : 'Edit'}
          {/* Submit */}
        </button>
      </Form>
    </>
  )
}