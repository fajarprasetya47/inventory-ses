import { useState } from "react"
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
                    <img src='images/logo3.svg' alt="logo" />
                </div>
                <div className={active == 'home' ? "sidebar-link-active" : "sidebar-link"}>
                    <a href="/">
                        <div className="sidebar-link-icon">
                            <img src='images/house-door.svg' alt="house-door" />
                        </div>
                        Home
                    </a>
                </div>
                <div className={active == 'barang' ? "sidebar-link-active" : "sidebar-link"}>
                    <a href="/barang">
                        <div className="sidebar-link-icon">
                            <img src='images/database.svg' alt="database" />
                        </div>
                        Barang
                    </a>
                </div>
                <div onClick={handleOpen} className={active == 'transaksi' ? "sidebar-link-active" : "sidebar-link"}>
                    <div className="sidebar-link-icon">
                        <img src='images/arrow-left-right.svg' alt="arrow-left-right" />
                    </div>
                    Transaksi
                    <img src='images/chevron-compact-down.svg' alt="chevron-compact-down" style={{ width: '16px' }} />
                </div>
                <div
                    className="border-bottom"
                    style={{ 
                        display: `${display == true ? 'block' : 'none'}`,
                    }}
                >
                    <div className="sidebar-link">
                        <a href="/barangmasuk">
                            <div>
                                <img src='images/arrow-down-right-circle.svg' alt="arrow-down-right-circle" />
                            </div>
                            Barang Masuk
                        </a>
                    </div>
                    <div className="sidebar-link">
                        <a href="/barangkeluar">
                            <div>
                                <img src='images/arrow-up-left-circle.svg' alt="arrow-up-left-circle" />
                            </div>
                            Barang Keluar
                        </a>
                    </div>
                </div>
                {/* <div className={active == 'penjualan' ? "sidebar-link-active" : "sidebar-link"}>
                    <a href="/penjualan">
                        <div className="sidebar-link-icon">
                            <img src='images/file-spreadsheet.svg' alt="graph-up-arrow" />
                        </div>
                        Data Penjualan
                    </a>
                </div> */}
                <div className={active == 'laporan' ? "sidebar-link-active" : "sidebar-link"}>
                    <a href="/laporan">
                        <div className="sidebar-link-icon">
                            <img src='images/file-earmark.svg' alt="file-earmark" />
                        </div>
                        Laporan
                    </a>
                </div>
                <div className={active == 'prediksi' ? "sidebar-link-active" : "sidebar-link"}>
                    <a href="/prediksi">
                        <div className="sidebar-link-icon">
                            <img src='images/graph-up-arrow.svg' alt="graph-up-arrow" />
                        </div>
                        Prediksi
                    </a>
                </div>
                <div className={active == 'pengguna' ? "sidebar-link-active" : "sidebar-link"}>
                    <a href="/pengguna">
                        <div className="sidebar-link-icon">
                            <img src='images/person.svg' alt="person" />
                        </div>
                        Pengguna
                    </a>
                </div>
            </div>
        </>
    )
}