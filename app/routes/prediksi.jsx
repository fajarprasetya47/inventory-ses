import { Form, Link, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import Dashboard from "../components/Dashboard/Dashboard";
import { requireUserSession } from "../data/auth.server";
import { getBarang } from "../data/barang.server";
import Select from "react-select";
import { getDataMonthly } from "../data/prediksi.server";
import PrediksiResult from "../components/Prediksi/PrediksiResult";

export default function Prediksi() {
  const navigation = useNavigation();
  const barang = useLoaderData()?.barang;
  const option = barang?.map((item) => (
    { label: item.namaBarang, value: item.id }
  ));
  const prediksi = useActionData();
  const isSubmitting = navigation.state != 'idle';

  return (
    <>
      <Dashboard title="Prediksi SES" active='prediksi'>
        <div className="prediksi-form mb-4">
          <Form method="post">
            <div class="mb-2">
              <label class="form-label">Pilih Barang</label>
              <Select options={option} name='idBarang' isSearchable={true} placeholder='Pilih Barang...' required />
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" class="btn btn-md btn-dark-blue w-50" disabled={prediksi || isSubmitting}>Lihat Prediksi</button>
              {prediksi ? <Link to="/prediksi" class="btn btn-md btn-outline-danger w-50">Clear</Link>
                : <></>}
            </div>
          </Form>
        </div>
        {prediksi ? <PrediksiResult /> : <></>}
      </Dashboard>
    </>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const barang = await getBarang();
  return { barang, userId };
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const dataMonthly = await getDataMonthly(data);
  return { data, dataMonthly };
}