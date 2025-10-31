import React from "react";
import { Head } from "@inertiajs/react";

export default function PartnerReports({ period, rows }) {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <Head title="Admin • Partner Earnings" />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Partner Earnings</h1>
      <p className="text-sm text-gray-600 mb-6">Period: {period[0]} to {period[1]}</p>

      <div className="bg-white rounded-xl shadow border overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Partner</th>
              <th className="text-right px-4 py-2">Commission %</th>
              <th className="text-right px-4 py-2">Usages</th>
              <th className="text-right px-4 py-2">Total Discount</th>
              <th className="text-right px-4 py-2">Total Commission</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2 text-right">{r.commission_rate}%</td>
                <td className="px-4 py-2 text-right">{r.usage_count}</td>
                <td className="px-4 py-2 text-right">₱{Number(r.total_discount).toLocaleString()}</td>
                <td className="px-4 py-2 text-right font-semibold">₱{Number(r.total_commission).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
