import NavbarHeader from "./NavbarHeader"
import Sidebar from "./Sidebar"

export default function Dashboard({children, title, active}) {
    return (
        <>
            <div className="sb-nav-fixed bg-light">
                <Sidebar active={active}/>
                <NavbarHeader/>
                <div id="layoutSidenav">
                    {/* <div id="layoutSidenav_nav">
                        <nav className="sb-sidenav accordion sb-sidenav-light bg-white" id="sidenavAccordion">
                            <div className="sb-sidenav-menu">
                                <div className="nav">
                                    <div className="sb-sidenav-menu-heading">Home</div>
                                    <a className="nav-link bg-light fw-bold disabled" href="_">
                                        Dashboard
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div> */}
                    <div id="layoutSidenav_content" className="bg-light">
                        <main>
                            <div className="container-fluid px-4">
                                {/* <ol className="breadcrumb my-4">
                                    <li className="breadcrumb-item">Home</li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol> */}
                                <h3 className="my-4">{title}</h3>
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}