import Dashboard from "../components/Dashboard/Dashboard";
import Home from "../components/Home";

export default function Index() {
  return (
    <>
      <Dashboard title="Welcome" active='home'>
        <Home/>
      </Dashboard>
    </>
  );
}
