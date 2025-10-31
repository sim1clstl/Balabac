import React from "react";
import { Head, useForm, router } from "@inertiajs/react";

export default function AdminPromosIndex({ promos = [], partners = [] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    code: "",
    partner_id: partners[0]?.id || "",
    percent_off: 10,
    is_active: true,
    starts_at: "",
    ends_at: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("admin.promos.store"), {
      onSuccess: () => reset("code","partner_id","percent_off","is_active","starts_at","ends_at"),
    });
  };

  const toggle = (id) => router.patch(route("admin.promos.toggle", id));
  const remove = (id) => { if (confirm("Delete this promo?")) router.delete(route("admin.promos.destroy", id)); };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <Head title="Admin • Promo Codes" />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Promo Codes</h1>

      {/* Create Form */}
      <form onSubmit={submit} className="bg-white rounded-2xl shadow border p-6 mb-10">
        <h2 className="text-lg font-semibold mb-4">Create Promo Code</h2>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Code</label>
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={data.code}
              onChange={(e) => setData("code", e.target.value.toUpperCase())}
              placeholder="SUMMER10"
              required
            />
            {errors.code && <p className="text-xs text-red-600 mt-1">{errors.code}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">% Off</label>
            <input
              type="number"
              min="1"
              max="100"
              className="w-full rounded-lg border px-3 py-2"
              value={data.percent_off}
              onChange={(e) => setData("percent_off", Number(e.target.value))}
              required
            />
            {errors.percent_off && <p className="text-xs text-red-600 mt-1">{errors.percent_off}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Partner</label>
            <select
              className="w-full rounded-lg border px-3 py-2 bg-white"
              value={data.partner_id}
              onChange={(e) => setData("partner_id", e.target.value)}
              required
            >
              <option value="" disabled>Select partner…</option>
              {partners.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {errors.partner_id && <p className="text-xs text-red-600 mt-1">{errors.partner_id}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Active</label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.is_active}
                onChange={(e) => setData("is_active", e.target.checked)}
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Starts At</label>
            <input
              type="date"
              className="w-full rounded-lg border px-3 py-2"
              value={data.starts_at}
              onChange={(e) => setData("starts_at", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Ends At</label>
            <input
              type="date"
              className="w-full rounded-lg border px-3 py-2"
              value={data.ends_at}
              onChange={(e) => setData("ends_at", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5">
          <button type="submit" disabled={processing} className="px-5 py-2.5 rounded-xl bg-teal-600 text-white font-semibold disabled:opacity-60">
            {processing ? "Saving..." : "Create Promo"}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="bg-white rounded-2xl shadow border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Existing Promos</h2>
        </div>

        {promos.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No promos yet.</div>
        ) : (
          <div className="divide-y">
            {promos.map((p) => (
              <div key={p.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-semibold text-gray-800">{p.code}</div>
                    <div className="text-gray-600 text-sm">{p.percent_off}% off</div>
                    <div className="text-xs text-gray-500">
                      Partner: {p.partner?.name || p.partner_id}
                    </div>
                    <div className="text-xs text-gray-500">
                      {p.starts_at ? `Starts: ${p.starts_at}` : "Starts: —"} • {p.ends_at ? `Ends: ${p.ends_at}` : "Ends: —"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${p.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {p.is_active ? "Active" : "Inactive"}
                  </span>
                  <button onClick={() => toggle(p.id)} className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm">
                    {p.is_active ? "Deactivate" : "Activate"}
                  </button>
                  <button onClick={() => remove(p.id)} className="px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
