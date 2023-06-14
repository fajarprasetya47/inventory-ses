import Dashboard from "../components/Dashboard/Dashboard";
import { requireUserSession } from "../data/auth.server";

export default function Laporan() {
  return (
    <>
      <Dashboard title="Laporan" active='laporan'>
        Laporan
      </Dashboard>
    </>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  return { userId };
}
