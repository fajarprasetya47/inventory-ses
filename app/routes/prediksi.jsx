import Dashboard from "../components/Dashboard/Dashboard";
import { requireUserSession } from "../data/auth.server";

export default function Prediksi() {
  return (
    <>
      <Dashboard title="Prediksi" active='prediksi'>
        Hallo Prediksi Single Exponential Smoothing
      </Dashboard>
    </>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  return { userId };
}