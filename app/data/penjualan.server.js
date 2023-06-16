import { prisma } from "./database.server";
import { sessionStorage } from "./auth.server";
import { json, redirect } from "@remix-run/node";

export async function createKeranjangSession(keranjang) {
    const session = await sessionStorage.getSession();
    session.set('keranjang', keranjang);
    return redirect('/penjualan', {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session),
        },
    });
}

export async function getKeranjangFromSession(request) {
    const session = await sessionStorage.getSession(
        request.headers.get('Cookie')
    );
    const keranjang = session.get('keranjang');
    if (!keranjang) {
        return [];
    }
    return keranjang;
}

export async function deleteKeranjangSession(request) {
    const session = await sessionStorage.getSession(
        request.headers.get('Cookie')
    );
    session.unset('keranjang')
    return json(null, {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session),
        },
    })
}

export async function addPenjualan(dataBarang) {
    try {
        return await prisma.transaksiKeluar.create({
            data: {
                tanggalKeluar: new Date(dataBarang.tanggalKeluar),
                jumlahKeluar: +dataBarang.jumlahKeluar,
                penjualan: true,
                totalHarga: +dataBarang.totalHarga,
                keterangan: dataBarang.keterangan,
                Barang: { connect: { id: dataBarang.idBarang } },
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error('Failed to add Transaksi Keluar');
    }
}

export async function getPenjualan() {
    try {
        const barang = await prisma.transaksiKeluar.findMany({
            where: { penjualan: true },
            orderBy: { id: 'desc' }
        });
        return barang;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get penjualan Transaksi Keluar');
    }
}

export async function getPenjualanMonth(month) {
    try {
        const barang = await prisma.transaksiKeluar.findMany({
            where: {
                penjualan: true,
                tanggalKeluar: { getMonth: month },
            },
        });
        return barang;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Transaksi Keluar month');
    }
}
