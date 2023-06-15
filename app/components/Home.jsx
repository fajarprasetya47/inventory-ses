import { Link } from '@remix-run/react';

export default function Home() {
    return (
        <>
            <h5>Menu</h5>
            <div className="home-wrap">
                <Link to='/barang' className='text-decoration-none'>
                    <div className="home-button">
                        <div className='d-flex justify-content-center'>
                            <img className='home-button-img' src="/images/database.svg" alt="database" />
                        </div>
                        <h5 className='text-center m-0'>Barang</h5>
                    </div>
                </Link>
                <Link to='/barangmasuk' className='text-decoration-none'>
                    <div className="home-button">
                        <div className='d-flex justify-content-center'>
                            <img className='home-button-img' src="/images/arrow-down-right-circle.svg" alt="arrow-down-right-circle" />
                        </div>
                        <h5 className='text-center m-0'>Barang Masuk</h5>
                    </div>
                </Link>
                <Link to='/barangkeluar' className='text-decoration-none'>
                    <div className="home-button">
                        <div className='d-flex justify-content-center'>
                            <img className='home-button-img' src="/images/arrow-up-left-circle.svg" alt="arrow-up-left-circle" />
                        </div>
                        <h5 className='text-center m-0'>Barang Keluar</h5>
                    </div>
                </Link>
                <Link to='/laporan' className='text-decoration-none'>
                    <div className="home-button">
                        <div className='d-flex justify-content-center'>
                            <img className='home-button-img' src="/images/file-earmark.svg" alt="file-earmark" />
                        </div>
                        <h5 className='text-center m-0'>Laporan</h5>
                    </div>
                </Link>
                <Link to='/pengguna' className='text-decoration-none'>
                    <div className="home-button">
                        <div className='d-flex justify-content-center'>
                            <img className='home-button-img' src="/images/person.svg" alt="person" />
                        </div>
                        <h5 className='text-center m-0'>Pengguna</h5>
                    </div>
                </Link>
                <Link to='/prediksi' className='text-decoration-none'>
                    <div className="home-button">
                        <div className='d-flex justify-content-center'>
                            <img className='home-button-img' src="/images/graph-up-arrow.svg" alt="graph-up-arrow" />
                        </div>
                        <h5 className='text-center m-0'>Prediksi</h5>
                    </div>
                </Link>
            </div>
        </>
    )
}