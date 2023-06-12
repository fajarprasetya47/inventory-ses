import { useState } from "react"
import { Link } from "@remix-run/react";

export default function Sidebar({ active }) {
    const [display, setDisplay] = useState(false);
    const handleOpen = () => {
        if (display == false) {
            setDisplay(true);
            return;
        }
        if (display == true) {
            setDisplay(false);
            return;
        }
    }
    return (
        <>
            <div className="sidebar">
                <div className="my-2 text-center">
                    <img src='/images/logo3.svg' alt="logo" />
                </div>
                <Link to='/'>
                    <div className={active == 'home' ? "sidebar-link-active" : "sidebar-link"}>
                        <div className="sidebar-link-icon">
                            <img src='/images/house-door.svg' alt="house-door" />
                        </div>
                        Home
                    </div>
                </Link>
                <Link to='/barang'>
                    <div className={active == 'barang' ? "sidebar-link-active" : "sidebar-link"}>
                        <div className="sidebar-link-icon">
                            <img src='/images/database.svg' alt="database" />
                        </div>
                        Barang
                    </div>
                </Link>
                <div onClick={handleOpen} className={active == 'transaksi' ? "sidebar-link-active" : "sidebar-link"}>
                    <div className="sidebar-link-icon">
                        <img src='/images/arrow-left-right.svg' alt="arrow-left-right" />
                    </div>
                    Transaksi
                    <img src='/images/chevron-compact-down.svg' alt="chevron-compact-down" style={{ width: '16px' }} />
                </div>
                <div
                    className="border-bottom"
                    style={{
                        display: `${display == true ? 'block' : 'none'}`,
                    }}
                >
                    <Link to='/barangmasuk'>
                        <div className="sidebar-link">
                            <div>
                                <img src='/images/arrow-down-right-circle.svg' alt="arrow-down-right-circle" />
                            </div>
                            Barang Masuk
                        </div>
                    </Link>
                    <Link to='/barangkeluar'>
                        <div className="sidebar-link">
                            <div>
                                <img src='/images/arrow-up-left-circle.svg' alt="arrow-up-left-circle" />
                            </div>
                            Barang Keluar
                        </div>
                    </Link>
                </div>
                {/* <div className={active == 'penjualan' ? "sidebar-link-active" : "sidebar-link"}>
                    <a href="/penjualan">
                        <div className="sidebar-link-icon">
                            <img src='/images/file-spreadsheet.svg' alt="graph-up-arrow" />
                        </div>
                        Data Penjualan
                    </a>
                </div> */}
                <Link to='/laporan'>
                    <div className={active == 'laporan' ? "sidebar-link-active" : "sidebar-link"}>
                        <div className="sidebar-link-icon">
                            <img src='/images/file-earmark.svg' alt="file-earmark" />
                        </div>
                        Laporan
                    </div>
                </Link>
                <Link to='/prediksi'>
                    <div className={active == 'prediksi' ? "sidebar-link-active" : "sidebar-link"}>
                        <div className="sidebar-link-icon">
                            <img src='/images/graph-up-arrow.svg' alt="graph-up-arrow" />
                        </div>
                        Prediksi
                    </div>
                </Link>
                <Link to='/pengguna'>
                    <div className={active == 'pengguna' ? "sidebar-link-active" : "sidebar-link"}>
                        <div className="sidebar-link-icon">
                            <img src='/images/person.svg' alt="person" />
                        </div>
                        Pengguna
                    </div>
                </Link>
            </div>
        </>
    )
}