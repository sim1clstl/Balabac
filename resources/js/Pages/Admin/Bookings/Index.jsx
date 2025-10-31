import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function BookingsIndex({ bookings = [] }) {
  return (
    <AuthenticatedLayout>
      <Head title="Bookings" />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Bookings</h1>

        <div className="overflow-auto border rounded-xl bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Package</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-right p-3">Pax</th>
                <th className="text-right p-3">Subtotal</th>
                <th className="text-right p-3">Discount</th>
                <th className="text-right p-3">Total (NET)</th>
                <th className="text-left p-3">Promo</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Ref</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-6 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => {
                  const subtotal = Number(b.subtotal ?? 0);
                  const discount = Number(b.discount_amount ?? 0);
                  const total = Number(
                    // prefer stored net total; fallback to old amount or computed
                    b.total_amount ?? b.amount ?? Math.max(0, subtotal - discount)
                  );
                  const promoCode = b.promo_code?.code ?? b.promo?.code ?? b.promo_code_code ?? null;
                  const partnerName =
                    b.promo_code?.partner?.name ??
                    b.partner?.name ??
                    b.promo_partner_name ??
                    null;

                  return (
                    <tr key={b.id} className="border-t">
                      <td className="p-3 whitespace-nowrap">{b.booking_date}</td>
                      <td className="p-3">{b.package?.name ?? `#${b.package_id}`}</td>

                      <td className="p-3">
                        <div className="font-medium">{b.customer_name}</div>
                        <div className="text-gray-500">{b.customer_email}</div>
                      </td>

                      <td className="p-3 text-right">{b.num_people}</td>

                      <td className="p-3 text-right">₱{subtotal.toLocaleString()}</td>
                      <td className="p-3 text-right text-red-600">
                        {discount > 0 ? `-₱${discount.toLocaleString()}` : "—"}
                      </td>

                      {/* ✅ NET total shown from booking.total_amount */}
                      <td className="p-3 text-right font-semibold text-gray-800">
                        ₱{total.toLocaleString()}
                      </td>

                      <td className="p-3">
                        {promoCode ? (
                          <div className="flex flex-col">
                            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 w-fit">
                              {promoCode}
                            </span>
                            {partnerName && (
                              <span className="text-xs text-gray-500 mt-1">
                                {partnerName}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>

                      <td className="p-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                            b.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : b.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>

                      <td className="p-3">{b.payment_reference || "—"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
