export default function LoginLayout() {
  return (
    <>
      <div className="signin-content bg-white">
        {/* <img className="signin-img" src={asset.signIn} alt="" /> */}
        <div className="signin-form">
          {/* <img src={asset.logo} alt="" /> */}
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
              <label for="exampleInputEmail1" className="form-label">Email</label>
              <input type="text" name="email" required className="form-control" placeholder="Contoh: johndee@gmail.com atau admin@admin.com" id="exampleInputEmail1" />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" name="password" required placeholder="6+ karakter" className="form-control" id="exampleInputPassword1" />
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