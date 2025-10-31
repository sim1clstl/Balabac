import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function PartnerCreate() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    commission_rate: 10,
    promo_code: "",
    percent_off: 10,
    is_active: true,
    starts_at: "",
    ends_at: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("admin.partners.store"), { onSuccess: () => reset() });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Admin • Create Partner" />
      <div className="p-6 md:p-10 max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Create Partner</h1>

        <form onSubmit={submit} className="bg-white rounded-2xl shadow border p-6 space-y-6">
          {/* User */}
          <section>
            <h2 className="text-lg font-semibold mb-4">User Login</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input className="w-full rounded-lg border px-3 py-2"
                  value={data.name} onChange={(e) => setData("name", e.target.value)} required />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input type="email" className="w-full rounded-lg border px-3 py-2"
                  value={data.email} onChange={(e) => setData("email", e.target.value)} required />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Password</label>
                <input type="password" className="w-full rounded-lg border px-3 py-2"
                  value={data.password} onChange={(e) => setData("password", e.target.value)} required />
                {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
              </div>
            </div>
          </section>

          {/* Partner */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Partner Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Commission %</label>
                <input type="number" min="0" max="100" className="w-full rounded-lg border px-3 py-2"
                  value={data.commission_rate}
                  onChange={(e) => setData("commission_rate", Number(e.target.value))}
                  required />
                {errors.commission_rate && <p className="text-xs text-red-600 mt-1">{errors.commission_rate}</p>}
              </div>
            </div>
          </section>

          {/* Promo */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Promo Code</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Code</label>
                <input className="w-full rounded-lg border px-3 py-2"
                  value={data.promo_code}
                  onChange={(e) => setData("promo_code", e.target.value.toUpperCase())}
                  placeholder="JUSTIN10" required />
                {errors.promo_code && <p className="text-xs text-red-600 mt-1">{errors.promo_code}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">% Off</label>
                <input type="number" min="1" max="100" className="w-full rounded-lg border px-3 py-2"
                  value={data.percent_off}
                  onChange={(e) => setData("percent_off", Number(e.target.value))}
                  required />
                {errors.percent_off && <p className="text-xs text-red-600 mt-1">{errors.percent_off}</p>}
              </div>
              <div className="md:col-span-3 flex items-center gap-3">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={data.is_active}
                    onChange={(e) => setData("is_active", e.target.checked)} />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Starts At</label>
                <input type="date" className="w-full rounded-lg border px-3 py-2"
                  value={data.starts_at}
                  onChange={(e) => setData("starts_at", e.target.value)} />
                {errors.starts_at && <p className="text-xs text-red-600 mt-1">{errors.starts_at}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Ends At</label>
                <input type="date" className="w-full rounded-lg border px-3 py-2"
                  value={data.ends_at}
                  onChange={(e) => setData("ends_at", e.target.value)} />
                {errors.ends_at && <p className="text-xs text-red-600 mt-1">{errors.ends_at}</p>}
              </div>
            </div>
          </section>

          <div>
            <button type="submit" disabled={processing}
              className="px-5 py-2.5 rounded-xl bg-teal-600 text-white font-semibold disabled:opacity-60">
              {processing ? "Creating…" : "Create Partner"}
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
