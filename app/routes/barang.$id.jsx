import { useNavigate, useParams } from "@remix-run/react";
import ModalLayout from "../components/Modal";
import EditBarang from "../components/Barang/EditBarang";
import { deleteBarang, getBarangId, updateBarang } from "../data/barang.server";
import { redirect } from "@remix-run/node";

export default function barangId() {
  // const navigate = useNavigate();
  const handleClose = () => {
    window.history.back()
  }

  // const params = useParams();
  return (
    <>
    <ModalLayout title='Detail Barang' open={true} onClose={handleClose}>
      <EditBarang/>
    </ModalLayout>
    </>
  )
}

export async function loader({params}) {
  const barangId = await getBarangId(params.id);
  return barangId;
}

export async function action({params, request}) {
  const idBarang = params.id;

  if(request.method === 'PATCH') {
      const formData = await request.formData();
      const dataBarang = Object.fromEntries(formData);
      await updateBarang(idBarang, dataBarang);
      return redirect('/barang');
  } else if (request.method === 'DELETE') {
      await deleteBarang(idBarang);
      return redirect('/barang');
      // return {deleteId : expenseId}
  }

}