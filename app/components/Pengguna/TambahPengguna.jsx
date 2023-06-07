export default function TambahPengguna() {
    return (
        <>
            <form>
                <div class="mb-2">
                    <label class="form-label">Pilih Peran</label>
                    <select class="form-select">
                        <option value="admin" selected>Admin</option>
                        <option value="pos">POS</option>
                    </select>
                </div>
                <div class="mb-2">
                    <label class="form-label">Username</label>
                    <input type="text" name="username" class="form-control" required />
                </div>
                <div class="mb-2">
                    <label class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" required/>
                </div>
                <button type="submit" class="btn btn-md btn-success w-100">Submit</button>
            </form>
        </>
    )
}