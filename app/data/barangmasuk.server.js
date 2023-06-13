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
            orderBy: { id: 'desc' }
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
        const barang = await prisma.transaksiMasuk.findMany({
            where: {
                tanggalMasuk: { getMonth: month },
            },
        });
        return barang;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Transaksi Masuk');
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