import { Form } from "@remix-run/react";

export default function TambahPengguna() {
    return (
        <>
            <Form method="post">
                <div className="mb-2">
                    <label className="form-label">Pilih Peran</label>
                    <select name="role" className="form-select">
                        <option value="admin" selected>Admin</option>
                        <option value="pos">POS</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label className="form-label">Username</label>
                    <input type="text" name="username" className="form-control" required />
                </div>
                <div className="mb-2">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" required/>
                </div>
                <button type="submit" className="btn btn-md btn-success my-2 w-100">Submit</button>
            </Form>
        </>
    )
}