import { useNavigate, useParams } from "@remix-run/react";
import ModalLayout from "../components/Modal";
import EditBarang from "../components/Barang/EditBarang";
import { getBarangId } from "../data/barang.server";

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