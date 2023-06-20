import { Link, useLoaderData } from "@remix-run/react";

export default function Sidebar({ active }) {
    const user = useLoaderData()?.userId;
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
                <Link to='/barangmasuk'>
                    <div className={active == 'barangmasuk' ? "sidebar-link-active" : "sidebar-link"}>
                        <div>
                            <img src='/images/arrow-down-right-circle.svg' alt="arrow-down-right-circle" />
                        </div>
                        Barang Masuk
                    </div>
                </Link>
                <Link to='/barangkeluar'>
                    <div className={active == 'barangkeluar' ? "sidebar-link-active" : "sidebar-link"}>
                        <div>
                            <img src='/images/arrow-up-left-circle.svg' alt="arrow-up-left-circle" />
                        </div>
                        Barang Keluar
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
                {user?.role != 'admin' ? <></> :
                    <Link to='/pengguna'>
                        <div className={active == 'pengguna' ? "sidebar-link-active" : "sidebar-link"}>
                            <div className="sidebar-link-icon">
                                <img src='/images/person.svg' alt="person" />
                            </div>
                            Pengguna
                        </div>
                    </Link>
                }
            </div>
        </>
    )
}