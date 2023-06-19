import * as React from 'react';
import Dashboard from "../components/Dashboard/Dashboard";
import Tabel from "../components/Tabel";
import { getBarang } from '../data/barang.server';
import { getReportKeluarMonth } from '../data/barangkeluar.server';
import { Form, Link, useActionData, useLoaderData, useNavigation } from '@remix-run/react';
import { requireUserSession } from '../data/auth.server';
import Select from 'react-select';
import { useReactToPrint } from 'react-to-print';

export default function LaporanBarangKeluar() {
  const navigation = useNavigation();
  const dataLoad = useLoaderData();
  const monthlyData = useActionData()?.monthly;
  const dataform = useActionData()?.data;

  const isSubmitting = navigation.state != 'idle';

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: 'report',
    bodyClass: 'py-5 px-3'
  });

  const columns = [
    {
      field: 'number',
      headerName: 'No',
      width: 50,
      renderCell: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1
    },
    {
      field: 'namaBarang',
      headerName: 'Nama Barang',
      width: 200,
      renderCell: (params) => dataLoad?.barang?.find(item => item.id == params.row.id)?.namaBarang
    },
    { field: 'total', headerName: 'Total', width: 80, sortable: false },
  ];

  const bulan = [
    { label: 'Januari', value: 1 }, { label: 'Februari', value: 2 }, { label: 'Maret', value: 3 },
    { label: 'April', value: 4 }, { label: 'Mei', value: 5 }, { label: 'Juni', value: 6 },
    { label: 'Juli', value: 7 }, { label: 'Agustus', value: 8 }, { label: 'September', value: 9 },
    { label: 'Oktober', value: 10 }, { label: 'November', value: 11 }, { label: 'Desember', value: 12 },
  ]

  return (
    <>
      <Dashboard title="Laporan Barang Keluar" active='barangkeluar'>
        <div className='my-2'>
          <Form method="post">
            <div class="mb-2">
              <label class="form-label">Pilih Bulan</label>
              <div className='row'>
                <div className='col-5'>
                  <Select options={bulan} name='bulan' isSearchable={true} placeholder='Bulan' required />
                </div>
                <div className='col-4'>
                  <input type="number" name='tahun' defaultValue='2023' class="form-control" disabled />
                </div>
              </div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" class="btn btn-md btn-success" disabled={monthlyData || isSubmitting}>Submit</button>
              {monthlyData ?
                <>
                  <Link to="/barangkeluar/laporan" class="btn btn-md btn-outline-danger">Clear</Link>
                  <button onClick={handlePrint} className="btn btn-md btn-dark-blue">Print</button>
                </>
                : <></>}
            </div>
          </Form>
        </div>
        {monthlyData ? (
          <div className='my-4' ref={componentRef}>
            <h5>Data Barang Keluar Bulan {bulan?.find(i => i?.value.toString() == dataform.bulan).label}</h5>
            <Tabel columns={columns} rows={monthlyData} print />
          </div>
        ) : <></>}
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
  const monthly = await getReportKeluarMonth(data);
  return { data, monthly };
}