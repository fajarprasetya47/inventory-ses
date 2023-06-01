
export default function Sidebar({active}) {
    return (
        <>
            <div className="sidebar">
                <div className="my-2 text-center">
                    <img src='images/logo3.svg' alt="logo" />
                </div>
                <div className={active=='home' ? "sidebar-link-active" : "sidebar-link"}>
                    <a href="/">
                        <div className="sidebar-link-icon">
                            <img src='images/house-door.svg' alt="house-door" />
                        </div>
                        Home
                    </a>
                </div>
                <div className={active=='barang' ? "sidebar-link-active" : "sidebar-link"}>
                    <a href="/barang">
                        <div className="sidebar-link-icon">
                            <img src='images/database.svg' alt="database" />
                        </div>
                        Barang
                    </a>
                </div>
                <div className={active=='riwayat' ? "sidebar-link-active" : "sidebar-link"}>
                    <a href="/riwayat">
                        <div className="sidebar-link-icon">
                            <img src='images/clock-history.svg' alt="clock-history" />
                        </div>
                        Riwayat
                    </a>
                </div>
                <div className={active=='penjualan' ? "sidebar-link-active" : "sidebar-link"}>
                    <a href="/penjualan">
                        <div className="sidebar-link-icon">
                            {/* <img src='images/file-earmark-bar-graph-fill.svg' alt="file-earmark-bar-graph-fill" /> */}
                            <img src='images/file-spreadsheet.svg' alt="graph-up-arrow" />
                        </div>
                        Data Penjualan
                    </a>
                </div>
                <div className={active=='laporan' ? "sidebar-link-active" : "sidebar-link"}>
                    <a href="/laporan">
                        <div className="sidebar-link-icon">
                            <img src='images/file-earmark.svg' alt="graph-up-arrow" />
                        </div>
                        Laporan
                    </a>
                </div>
                <div className={active=='prediksi' ? "sidebar-link-active" : "sidebar-link"}>
                    <a href="/prediksi">
                        <div className="sidebar-link-icon">
                            <img src='images/graph-up-arrow.svg' alt="graph-up-arrow" />
                        </div>
                        Prediksi
                    </a>
                </div>
            </div>
        </>
    )
}