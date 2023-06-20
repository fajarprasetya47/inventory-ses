import { redirect } from "@remix-run/node";
import { deletePengguna, requireUserSession } from "../data/auth.server";

export async function loader({ request }) {
  return await requireUserSession(request);
}

export async function action({ params, request }) {
  const id = params.id;

  if (request.method === 'DELETE') {
    await deletePengguna(id);
    return redirect('/pengguna');
  } else {
    throw new Error('Invalid request method');
  }
}