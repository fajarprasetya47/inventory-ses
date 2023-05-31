// import { asset } from "../../../assets/asset"

export default function NavbarHeader() {
    
    return (
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-light bg-white">
                {/* <img className="ms-0 me-5" src={asset.logo2} alt="logo" /> */}
                <button className="btn btn-link btn-sm order-1 order-lg-0 ms-5 m me-4 me-lg-0" id="sidebarToggle" href="#!">
                    {/* <img src={asset.fiMenu} alt="fi_menu" /> */}
                </button>
                {/* <form className="d-none d-md-inline-block form-inline ms-auto me-3 my-2 my-md-0">
                    <div className="input-group search">
                        <input className="form-control" type="text" placeholder="&#xF002; Search" aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button className="btn btn-outline-primary" id="btnNavbarSearch" type="button">Search</button>
                    </div>
                </form> */}
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown d-flex">
                        <div className="my-auto ps-3 d-flex justify-content-evenly">
                            <div className="user-avatar me-1">
                                <span className="initials">A</span>
                            </div>
                            <strong className="align-self-center">Admin</strong>
                        </div>
                        <a className="nav-link" href="?" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="/">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    )
}