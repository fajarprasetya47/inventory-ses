import { Form, useNavigation } from "@remix-run/react";

export default function LoginLayout() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state != 'idle';

  return (
    <>
      <div className="signin-content bg-white">
        <div className="signin-form">
          <h1>Welcome, Inventory SES</h1>
          <Form method="post">
            <div className="form">
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" name="username" required className="form-control" placeholder="Contoh: admin" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" name="password" required placeholder="Password" className="form-control" />
              </div>
              <div className="sign-in-button">
                <button disabled={isSubmitting} className="btn btn-dark-blue w-100">
                  {isSubmitting ? 'Loading...' : 'Sign in'}
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}