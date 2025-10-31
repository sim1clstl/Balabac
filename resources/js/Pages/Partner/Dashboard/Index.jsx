import React from "react";
import { Head } from "@inertiajs/react";

export default function PartnerDashboard({ partnerName, promos = [], stats = {} }) {
  return (
    <div className="p-8 max-w-5xl mx-auto bg-[#EFE9DF] min-h-screen">
      <Head title="Partner Dashboard" />

      <h1 className="text-3xl font-bold mb-1 text-gray-800">
        Hello, {partnerName || "Partner"} 👋
      </h1>
      <p className="text-gray-600 mb-8">
        Welcome to your partner dashboard.
      </p>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <h2 className="text-gray-500 text-sm">Total Usages</h2>
          <p className="text-2xl font-bold text-brand-blue">{stats.total_usages || 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <h2 className="text-gray-500 text-sm">Total Discounts Given</h2>
          <p className="text-2xl font-bold text-brand-green">
            ₱{Number(stats.total_discount || 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <h2 className="text-gray-500 text-sm">Total Commission</h2>
          <p className="text-2xl font-bold text-brand-blue">
            ₱{Number(stats.total_commission || 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Promo Codes List */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Your Promo Codes</h2>
        {promos.length === 0 ? (
          <p className="text-gray-500 text-sm">No promo codes yet.</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-3 py-2">Code</th>
                <th className="text-left px-3 py-2">% Off</th>
                <th className="text-left px-3 py-2">Uses</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-3 py-2 font-semibold">{p.code}</td>
                  <td className="px-3 py-2">{p.percent_off}%</td>
                  <td className="px-3 py-2">{p.uses_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
