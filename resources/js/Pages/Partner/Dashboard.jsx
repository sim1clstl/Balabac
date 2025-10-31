import React from "react";
import { Head } from "@inertiajs/react";

export default function PartnerDashboard({ partner, stats, usages }) {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <Head title="Partner • Dashboard" />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Welcome, {partner.name}
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Period: {stats.range[0]} to {stats.range[1]}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow border p-4">
          <div className="text-xs text-gray-500">Usages</div>
          <div className="text-2xl font-semibold">{stats.usage_count}</div>
        </div>
        <div className="bg-white rounded-xl shadow border p-4">
          <div className="text-xs text-gray-500">Total Discount</div>
          <div className="text-2xl font-semibold">₱{Number(stats.total_discount).toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl shadow border p-4">
          <div className="text-xs text-gray-500">Commission (this period)</div>
          <div className="text-2xl font-semibold">₱{Number(stats.total_commission).toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Recent Promo Code Usages</h2>
        </div>
        {usages.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No usages in this period.</div>
        ) : (
          <div className="divide-y">
            {usages.map(u => (
              <div key={u.id} className="p-4 text-sm flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    Code: {u.promo_code?.code ?? u.promo_code_id}
                  </div>
                  <div className="text-gray-600">
                    Booking #{u.booking_id} • {new Date(u.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-red-600">Discount: -₱{Number(u.discount_amount).toLocaleString()}</div>
                  <div className="text-green-700">Commission: ₱{Number(u.commission_amount).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
