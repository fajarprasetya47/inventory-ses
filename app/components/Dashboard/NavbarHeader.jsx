import { Link, useFetcher, useLoaderData } from "@remix-run/react"

export default function NavbarHeader() {
    const user = useLoaderData()?.userId;
    const fetcher = useFetcher();
    const handlelogout = () => {
        fetcher.submit(null, {
            method: 'POST',
            action: '/logout',
        })
    }
    return (
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-light bg-white">
                <h2>Inventory SES</h2>
                <ul className="navbar-nav ms-auto me-3 me-lg-4">
                    <li className="nav-item dropdown d-flex">
                        <div className="my-auto ps-3 d-flex justify-content-evenly">
                            <div className="user-avatar me-1">
                                <span className="initials">{user ? user?.username?.slice(0, 1) : 'u'}</span>
                            </div>
                            <strong className="align-self-center">{user ? user?.username : 'username'}</strong>
                        </div>
                        <a className="nav-link" href="?" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><button onClick={handlelogout} className="dropdown-item">Logout</button></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    )
}