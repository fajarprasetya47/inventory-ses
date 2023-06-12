import { prisma } from "./database.server";

export async function addBarang(dataBarang) {
    try {
        return await prisma.barang.create({
            data: {
                namaBarang: dataBarang.namaBarang,
                modal: +dataBarang.modal,
                hargaJual: +dataBarang.hargaJual,
                stok: 0,
                status: 'habis'
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
            orderBy: { id: 'desc' }
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
    try {
        await prisma.barang.update({
            where: { id },
            data: {
                namaBarang: dataBarang.namaBarang,
                modal: +dataBarang.modal,
                hargaJual: +dataBarang.hargaJual,
                stok: dataBarang.stok,
                status: dataBarang.status,
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to update Barang');
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