import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function BookingsIndex({ bookings }) {
  return (
    <AuthenticatedLayout>
      <Head title="Bookings" />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Bookings</h1>
        <div className="overflow-auto border rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Package</th>
                <th className="text-left p-2">Customer</th>
                <th className="text-left p-2">People</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Ref</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-t">
                  <td className="p-2">{b.booking_date}</td>
                  <td className="p-2">{b.package?.name}</td>
                  <td className="p-2">{b.customer_name} <span className="text-gray-500">({b.customer_email})</span></td>
                  <td className="p-2">{b.num_people}</td>
                  <td className="p-2">₱{Number(b.amount).toLocaleString()}</td>
                  <td className="p-2">{b.status}</td>
                  <td className="p-2">{b.payment_reference || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
