import { prisma } from "./database.server";

export async function addBarangKeluar(dataBarang) {
    try {
        return await prisma.transaksiKeluar.create({
            data: {
                tanggalKeluar: new Date(dataBarang.tanggalKeluar),
                jumlahKeluar: +dataBarang.jumlahKeluar,
                keterangan: dataBarang.keterangan,
                totalHarga: +dataBarang.totalHarga,
                Barang: { connect: { id: dataBarang.idBarang } },
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to add Transaksi Keluar');
    }
}

export async function getBarangKeluar() {
    try {
        const barang = await prisma.transaksiKeluar.findMany({
            orderBy: { tanggalKeluar: 'desc' }
        });
        return barang;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Transaksi Keluar');
    }
}

export async function getBarangKeluarId(id) {
    try {
        const barang = await prisma.transaksiKeluar.findFirst({ where: { id } });
        return barang;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Transaksi Keluar with id');
    }
}
export async function getBarangKeluarMonth(month) {
    try {
        const barang = await getBarangKeluar();
        const filterBarang = barang?.filter((item) => parseInt(item?.tanggalKeluar?.toISOString()?.slice(5, 7)) == parseInt(month));
        return filterBarang;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Transaksi Keluar month');
    }
}
export async function getBarangKeluarIdBarang(idBarang) {
    try {
        const barang = await prisma.transaksiKeluar.findMany({
            where: { idBarang },
            orderBy: { tanggalKeluar: "desc" }
        });
        return barang;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Transaksi Keluar month');
    }
}

export async function deleteBarangKeluar(id) {
    try {
        await prisma.transaksiKeluar.delete({
            where: { id }
        });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete Transaksi Keluar');
    }
}

export async function getReportKeluarMonth(data) {
    try {
        const rawData = await getBarangKeluarMonth(data?.bulan);
        return getTotalPerMonth(rawData);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get report month Transaksi Keluar');
    }
}

const getTotalPerMonth = (data) => {
    let arr = [];
    const barangId = data?.map((i) => (
        { id: i?.idBarang }
    ))?.reduce((unique, item) => {
        const found = unique?.some((obj) => obj.id === item.id);
        if (!found) unique?.push(item);
        return unique;
    }, []);

    for (const barang of barangId) {
        let x = 0;
        const items = data?.filter((i) => i.idBarang === barang.id);
        for (const item of items) x += item.jumlahKeluar;
        arr?.push({ id: barang?.id, total: x })
    }
    return arr;
}