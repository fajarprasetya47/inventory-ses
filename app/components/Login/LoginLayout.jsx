export default function LoginLayout() {
  return (
    <>
      <div className="signin-content bg-white">
        <div className="signin-form">
          <h1>Welcome, Inventory SES</h1>
          {/* {message ?
            <div className="signin-alert">
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {message}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            </div>
            : <></>} */}
          <div className="form">
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" name="username" required className="form-control" placeholder="Contoh: admin@admin.com" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" name="password" required placeholder="Password" className="form-control" />
            </div>
            <div className="sign-in-button">
              <button className="btn btn-dark-blue w-100">Sign in</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}