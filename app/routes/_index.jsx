import Dashboard from "../components/Dashboard/Dashboard";
import Home from "../components/Home";
import { requireUserSession } from "../data/auth.server";

export default function Index() {
  return (
    <>
      <Dashboard title="Welcome" active='home'>
        <Home />
      </Dashboard>
    </>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  return { userId };
}