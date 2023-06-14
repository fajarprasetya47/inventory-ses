import { redirect } from "@remix-run/node";
import { deleteBarangKeluar } from "../data/barangkeluar.server";

export async function action({ request }) {
  if (request.method === 'DELETE') {
    await deleteBarangKeluar(idBarang);
    return redirect('/barangmasuk');
  }
}