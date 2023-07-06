import { prisma } from "./database.server";

export async function addBarang(dataBarang) {
    try {
        return await prisma.barang.create({
            data: {
                namaBarang: dataBarang.namaBarang,
                modal: +dataBarang.modal,
                hargaJual: +dataBarang.hargaJual,
                stok: 0,
                satuan: dataBarang.satuan,
                status: 'kosong'
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to add Barang');
    }
}

export async function getBarang() {
    try {
        const barang = await prisma.barang.findMany({
            orderBy: { namaBarang: 'asc' }
        });
        return barang;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Barang');
    }
}

export async function getBarangId(id) {
    try {
        const barang = await prisma.barang.findFirst({ where: { id } });
        return barang;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Barang');
    }
}

export async function updateBarang(id, dataBarang) {
    let stok = +dataBarang.stok;
    if (dataBarang.jumlahMasuk) {
        const jmlMasuk = +dataBarang.jumlahMasuk;
        stok = stok + jmlMasuk;
    }
    if (dataBarang.jumlahKeluar) {
        const jmlKeluar = +dataBarang.jumlahKeluar;
        stok = stok - jmlKeluar;
    }
    const status = updateStatusBarang(stok);
    try {
        await prisma.barang.update({
            where: { id },
            data: {
                namaBarang: dataBarang.namaBarang || undefined,
                modal: +dataBarang.modal || undefined,
                hargaJual: +dataBarang.hargaJual || undefined,
                stok: stok || undefined,
                satuan: dataBarang.satuan || undefined,
                status: status || undefined,
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to update Barang');
    }
}
export function updateStatusBarang(stok) {
    if (stok == 0) {
        return 'kosong';
    } else if (stok < 10) {
        return 'minim';
    } else if(stok>=10){
        return 'ready';
    }
}

export async function deleteBarang(id) {
    try {
        await prisma.barang.delete({
            where: { id }
        });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete Barang');
    }
}