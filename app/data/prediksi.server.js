import { getBarangKeluarIdBarang } from "./barangkeluar.server";

export async function getDataMonthly(data) {
    try {
        const transBarang = await getBarangKeluarIdBarang(data?.idBarang);
        const monthlyTotal = getTotalPerMonth(transBarang);
        return monthlyTotal;
        // return sesForecast(dataTotal, '0.1');
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get data Prediksi');
    }
}

const getTotalPerMonth = (data) => {
    let arr = [];
    const yearMonth = data?.map((i) => {
        return {
            id: i?.tanggalKeluar?.toISOString()?.slice(0, 4) + i?.tanggalKeluar?.toISOString()?.slice(5, 7),
            bulan: parseInt(i?.tanggalKeluar?.toISOString()?.slice(5, 7)),
            namaBulan: i?.tanggalKeluar?.toDateString()?.slice(4, 7),
            tahun: parseInt(i?.tanggalKeluar?.toISOString()?.slice(0, 4))
        };
    })?.reduce((unique, item) => {
        const found = unique?.some((obj) => obj.id === item.id);
        if (!found) unique?.push(item);
        return unique;
    }, []);
    
    for (const month of yearMonth) {
        let x = 0;
        const items = data?.filter((i) =>
            parseInt(i.tanggalKeluar?.toISOString()?.slice(5, 7)) == month.bulan &&
            parseInt(i.tanggalKeluar?.toISOString()?.slice(0, 4)) == month.tahun
        );
        for (const item of items) x += item.jumlahKeluar;
        arr?.push({ id: month?.id, bulan: month?.bulan, namaBulan: month?.namaBulan, tahun: month?.tahun, total: x })
    }
    return monthOrder(arr);
}

const monthOrder = (array) => {
    return array?.sort((a, b) => a?.id - b?.id);
}

const sesForecast = (data, alpha) => {
    let f = 0;
    const fore = data?.map((item, index) => {
        if (index == 0) return { ...item, prediksi: f = item?.total };
        f = ((parseFloat(alpha) * data[index-1]?.total) + ((1 - parseFloat(alpha)) * f)).toFixed(2);
        return { ...item, prediksi: f };
    })
    return fore;
}