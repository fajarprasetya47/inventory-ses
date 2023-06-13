import { redirect } from "@remix-run/node";
import { deleteBarangMasuk } from "../data/barangmasuk.server";

export async function action({ request }) {
  if (request.method === 'DELETE') {
    await deleteBarangMasuk(idBarang);
    return redirect('/barangmasuk');
  }
}