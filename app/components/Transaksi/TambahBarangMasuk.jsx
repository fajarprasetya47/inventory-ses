import Select from 'react-select'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const options = [
  { label: 'Swedish', value: 'swedish' },
  { label: 'English', value: 'english' },
];

export default function TambahBarangMasuk() {
  return (
    <>
      <form>
        <div class="mb-2">
          <label class="form-label">Tanggal Masuk</label>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                sx={{width: '100%'}}
                slotProps={{textField: {size: 'small'}}}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div class="mb-2">
          <label class="form-label">Nama Barang</label>
          <Select options={options} isSearchable={true} placeholder='Pilih Barang...' required />
        </div>
        <div class="mb-2">
          <label class="form-label">Jumlah Barang Masuk</label>
          <input type="number" name="jumlahMasuk" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Keterangan</label>
          <input type="text" name="keterangan" value='' class="form-control" />
        </div>
        <button type="submit" class="btn btn-md btn-success w-100 mt-3">Submit</button>
      </form>
    </>
  )
}