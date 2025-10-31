import React from "react";
import { Head, useForm } from "@inertiajs/react";

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: "", email: "", password: "", password_confirmation: "",
    partner_name: "", partner_type: "hotel", promo_code: "",
  });

  const submit = (e) => { e.preventDefault(); post("/partner/register"); };

  return (
    <div className="max-w-lg mx-auto p-6">
      <Head title="Partner Sign Up" />
      <h1 className="text-2xl font-semibold mb-4">Partner Sign Up</h1>
      <form onSubmit={submit} className="grid gap-3">
        <input className="border p-2 rounded" placeholder="Your Name"
               value={data.name} onChange={e=>setData("name", e.target.value)} />
        <input className="border p-2 rounded" placeholder="Email"
               value={data.email} onChange={e=>setData("email", e.target.value)} />
        <input type="password" className="border p-2 rounded" placeholder="Password"
               value={data.password} onChange={e=>setData("password", e.target.value)} />
        <input type="password" className="border p-2 rounded" placeholder="Confirm Password"
               value={data.password_confirmation} onChange={e=>setData("password_confirmation", e.target.value)} />
        <input className="border p-2 rounded" placeholder="Hotel/Influencer Name"
               value={data.partner_name} onChange={e=>setData("partner_name", e.target.value)} />
        <select className="border p-2 rounded"
                value={data.partner_type} onChange={e=>setData("partner_type", e.target.value)}>
          <option value="hotel">Hotel</option>
          <option value="influencer">Influencer</option>
        </select>
        <input className="border p-2 rounded" placeholder="Desired Promo Code (e.g. HOTEL10)"
               value={data.promo_code} onChange={e=>setData("promo_code", e.target.value.toUpperCase())} />
        <button className="bg-gray-900 text-white rounded px-4 py-2" disabled={processing}>Create Account</button>
        {errors && <pre className="text-red-600 text-sm">{JSON.stringify(errors,null,2)}</pre>}
      </form>
    </div>
  );
}
