import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PrediksiChart({ dataset, barang }) {
  const data = {
    labels: dataset?.map(item => `${item?.namaBulan} ${item?.tahun}`),
    datasets: [
      {
        label: 'Total ',
        data: dataset?.map(item => item?.total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Prediksi ',
        data: dataset?.map(item => item?.prediksi),
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className='my-2' style={{width: '700px'}}>
        <Line
          data={data}
          redraw={true}
          options={{
            plugins: {
              title: {
                display: true,
                text: `Grafik Data ${barang}`
              }
            }
          }} />
      </div>
    </>
  )
}