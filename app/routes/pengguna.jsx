import * as React from 'react';
import Dashboard from "../components/Dashboard/Dashboard";
import ModalLayout from "../components/Modal";
import TambahPengguna from '../components/Pengguna/TambahPengguna';
import Tabel from "../components/Tabel";
import { getPengguna, requireUserSession, signup } from '../data/auth.server';
import { useFetcher, useLoaderData, useNavigation } from '@remix-run/react';
import { redirect } from '@remix-run/node';

export default function Pengguna() {
  const user = useLoaderData()?.user;
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isSubmitting = navigation.state != 'idle';

  const deleteHandle = (id) => {
    const proceed = confirm('Hapus pengguna ini?');
    if (!proceed) {
      return;
    }
    fetcher.submit(null, {
      method: 'delete',
      action: `/pengguna/${id}`
    })
  }

  const columns = [
    {
      field: 'number',
      headerName: 'No',
      width: 70,
      renderCell: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1
    },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'role', headerName: 'Role', width: 130 },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div className='d-flex flex-direction-column gap-3'>
            <button onClick={() => deleteHandle(params.row.id)} className='btn btn-sm btn-danger'>Hapus</button>
          </div>
        )
      },
    },
  ];

  return (
    <>
      <Dashboard title="Daftar Pengguna" active='pengguna'>
        <div className="my-2">
          <button onClick={handleOpen} disabled={isSubmitting} className="btn btn-md btn-success">+ Tambah Pengguna</button>
        </div>
        <Tabel columns={columns} rows={user} />
        <ModalLayout title='Tambah Pengguna' open={isSubmitting ? false : open} onClose={handleClose}>
          <TambahPengguna />
        </ModalLayout>
      </Dashboard>
    </>
  );
}

export async function loader({request}) {
  const userId =  await requireUserSession(request);
  const user = await getPengguna();
  return {user, userId};
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await signup(data);
  return redirect('/pengguna');
}