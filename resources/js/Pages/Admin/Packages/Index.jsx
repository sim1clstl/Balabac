import React from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function PackagesIndex({ packages }) {
  const { data, setData, post, processing, reset } = useForm({
    name: "", description: "", duration_minutes: 60, price: 0, is_active: true
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("admin.packages.store"), { onSuccess: () => reset() });
  };

  const toggleActive = (p) => {
    router.patch(route("admin.packages.update", p.id), { ...p, is_active: !p.is_active });
  };

  const remove = (id) => {
    if (confirm("Delete package?")) router.delete(route("admin.packages.destroy", id));
  };

  return (
    <AuthenticatedLayout>
      <Head title="Packages" />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Packages</h1>

        <form onSubmit={submit} className="border rounded-xl p-4 grid md:grid-cols-2 gap-4 mb-6">
          <input className="border rounded p-2" placeholder="Name" value={data.name} onChange={e=>setData("name", e.target.value)} required />
          <input className="border rounded p-2" placeholder="Price" type="number" value={data.price} onChange={e=>setData("price", e.target.value)} required />
          <input className="border rounded p-2" placeholder="Duration (mins)" type="number" value={data.duration_minutes} onChange={e=>setData("duration_minutes", e.target.value)} required />
          <select className="border rounded p-2" value={data.is_active ? 1 : 0} onChange={e=>setData("is_active", e.target.value === "1")}>
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
          <textarea className="border rounded p-2 md:col-span-2" placeholder="Description" value={data.description} onChange={e=>setData("description", e.target.value)} />
          <div className="md:col-span-2">
            <button className="px-4 py-2 rounded-xl bg-gray-900 text-white" disabled={processing}>Add Package</button>
          </div>
        </form>

        <div className="grid gap-3">
          {packages.map(p => (
            <div key={p.id} className="border rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{p.name} {p.is_active ? "" : <span className="text-xs text-gray-500">(inactive)</span>}</div>
                <div className="text-sm text-gray-600">₱{Number(p.price).toLocaleString()} • {p.duration_minutes} mins</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>toggleActive(p)} className="px-3 py-1 border rounded">{p.is_active ? "Deactivate" : "Activate"}</button>
                <button onClick={()=>remove(p.id)} className="px-3 py-1 border rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
