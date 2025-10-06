import React from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AvailabilityIndex({ dates }) {
  const today = new Date().toISOString().slice(0,10);
  const { data, setData, post, processing, reset } = useForm({ date: "", reason: "" });

  const submit = (e) => {
    e.preventDefault();
    post(route("admin.availability.store"), { onSuccess: () => reset() });
  };

  const remove = (id) => {
    if (confirm("Remove this date?")) router.delete(route("admin.availability.destroy", id));
  };

  return (
    <AuthenticatedLayout>
      <Head title="Availability" />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Blackout Dates</h1>
        <form onSubmit={submit} className="border rounded-xl p-4 grid md:grid-cols-3 gap-3 mb-6">
          <input type="date" min={today} className="border rounded p-2" value={data.date} onChange={e=>setData("date", e.target.value)} required />
          <input className="border rounded p-2" placeholder="Reason (optional)" value={data.reason} onChange={e=>setData("reason", e.target.value)} />
          <button className="px-4 py-2 rounded-xl bg-gray-900 text-white" disabled={processing}>Add</button>
        </form>

        <div className="grid gap-2">
          {dates.map(d => (
            <div key={d.id} className="border rounded-xl p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{d.date}</div>
                {d.reason && <div className="text-sm text-gray-600">{d.reason}</div>}
              </div>
              <button onClick={()=>remove(d.id)} className="px-3 py-1 border rounded">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
