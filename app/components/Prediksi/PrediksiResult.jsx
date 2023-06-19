import { useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Tabel from "../Tabel";

export default function PrediksiResult() {
  const data = useActionData()?.dataMonthly;
  const idBarang = useActionData()?.data?.idBarang;
  const barang = useLoaderData()?.barang;
  const namaBarang = barang?.find(item => item?.id === idBarang)?.namaBarang;
  const [result, setResult] = useState([]);
  const [alpha, setAlpha] = useState();
  const [mad, setMad] = useState();
  const [mape, setMape] = useState();

  const columns = [
    {
      field: 'number',
      headerName: 'No',
      width: 50,
      renderCell: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1
    },
    {
      field: 'bulanTahun',
      headerName: 'Bulan',
      width: 120,
      valueGetter: (params) => (
        `${params.row.namaBulan} ${params.row.tahun}`
      )
    },
    { field: 'total', headerName: 'Total', width: 100 },
    { field: 'prediksi', headerName: 'Prediksi', width: 100 },
  ]

  const handlePrediksi = () => {
    if (parseFloat(alpha) > 1) return;
    const newForecast = sesForecast(result, alpha);
    setResult(newForecast);
    setMad(madValue(newForecast));
    setMape(mapeValue(newForecast));
  }
  const handleAlpha = (e) => {
    setAlpha(parseFloat(e.target.value));
  }

  useEffect(() => {
    const forecast = sesForecast(data, 0.1)
    setResult(forecast);
    setMad(madValue(forecast));
    setMape(mapeValue(forecast));
  }, []);

  return (
    <>
      <div className="my-2">
        <h5>Data Prediksi SES {namaBarang}</h5>
        <div class="mb-2 row">
          <label class="form-label">Alpha</label>
          <div className="col-4">
            <input type="number" onChange={handleAlpha} value={alpha} defaultValue='0.1' min='0' max='1' step='0.1' name="alpha" class="form-control form-control-sm" required />
          </div>
          <div className="col-5">
            <button onClick={handlePrediksi} class="btn btn-sm btn-success">Submit</button>
          </div>
        </div>
        <div className="my-4 fore-wrap">
          <div className="fore-table">
            <Tabel columns={columns} rows={result} print />
          </div>
          <div className="fore-form">
            <div className="mb-2">
              <label class="form-label">{`Mean Absolute Deviation (MAD)`}</label>
              <input type="number" value={mad} name="mape" class="form-control form-control-sm" disabled />
            </div>
            <div className="mb-2">
              <label class="form-label">{`Mean Absolute Persentage Error (MAPE)`}</label>
              <input type="number" value={mape} name="mape" class="form-control form-control-sm" disabled />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const sesForecast = (data, alpha) => {
  let f = 0;
  const fore = data?.map((item, index) => {
    if (index == 0) return { ...item, prediksi: f = item?.total };
    f = ((parseFloat(alpha) * data[index - 1]?.total) + ((1 - parseFloat(alpha)) * f)).toFixed(2);
    return { ...item, prediksi: f };
  })
  return fore;
}
const madValue = (data) => {
  let y = 0;
  data?.forEach((item) => {
    const t = Math.abs(item?.total - item?.prediksi);
    y += t;
  })
  return (y / data?.length).toFixed(3);
}
const mapeValue = (data) => {
  let y = 0;
  data?.forEach((item) => {
    const t = Math.abs(((item?.total - item?.prediksi) / item?.total)) * 100;
    y += t;
  })
  return (y / data?.length).toFixed(3);
}
