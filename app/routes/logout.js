import { destroyUserSession, requireUserSession } from "../data/auth.server";

export async function loader({ request }) {
  return await requireUserSession(request);
}

export function action({ request }) {
  if (request.method !== 'POST') {
    throw new Error('Invalid request method');
  }

  return destroyUserSession(request);
}