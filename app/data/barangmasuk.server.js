import { prisma } from "./database.server";

export async function addBarangMasuk(dataBarang) {
    try {
        return await prisma.transaksiMasuk.create({
            data: {
                tanggalMasuk: new Date(dataBarang.tanggalMasuk),
                jumlahMasuk: +dataBarang.jumlahMasuk,
                keterangan: dataBarang.keterangan,
                Barang: { connect: { id: dataBarang.idBarang } },
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to add Transaksi Masuk');
    }
}

export async function getBarangMasuk() {
    try {
        const barang = await prisma.transaksiMasuk.findMany({
            orderBy: { tanggalMasuk: 'desc' }
        });
        return barang;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Transaksi Masuk');
    }
}

export async function getBarangMasukId(id) {
    try {
        const barang = await prisma.transaksiMasuk.findFirst({ where: { id } });
        return barang;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Barang');
    }
}
export async function getBarangMasukMonth(month) {
    try {
        const barang = await getBarangMasuk();
        const filterBarang = barang?.filter((item) => parseInt(item?.tanggalMasuk?.toISOString()?.slice(5, 7)) == parseInt(month));
        return filterBarang;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Transaksi Masuk month');
    }
}

export async function deleteBarangMasuk(id) {
    try {
        await prisma.transaksiMasuk.delete({
            where: { id }
        });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete Transaksi Masuk');
    }
}

export async function getReportMasukMonth(data) {
    try {
        const rawData = await getBarangMasukMonth(data?.bulan);
        return getTotalPerMonth(rawData);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get report month Transaksi Masuk');
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
        for (const item of items) x += item.jumlahMasuk;
        arr?.push({ id: barang?.id, total: x })
    }
    return arr;
}