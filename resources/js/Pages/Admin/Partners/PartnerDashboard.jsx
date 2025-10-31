import React, { useMemo } from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, CartesianGrid,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { subDays, addDays, format } from "date-fns";

/* style helpers */
const Card = ({ className = "", children }) => (
  <div className={`bg-white rounded-2xl border border-neutral-200 shadow-sm ${className}`}>{children}</div>
);
const CardHeader = ({ children }) => <div className="p-4 border-b border-neutral-100">{children}</div>;
const CardTitle = ({ children }) => <h3 className="text-base font-semibold">{children}</h3>;
const CardContent = ({ children, className = "" }) => <div className={`p-4 ${className}`}>{children}</div>;
const Badge = ({ color = "bg-emerald-100 text-emerald-700", children }) => (
  <span className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}>{children}</span>
);

/* fake data */
function makeSeries(days = 30) {
  return Array.from({ length: days }).map((_, i) => ({
    date: subDays(new Date(), days - i - 1),
    label: format(subDays(new Date(), days - i - 1), "MMM d"),
    bookings: Math.round(3 + Math.random() * 6),
    commission: Math.round(3000 + Math.random() * 9000),
  }));
}

export default function PartnerDashboard() {
  const series = useMemo(() => makeSeries(30), []);
  const totals = useMemo(() => {
    const totalBookings = series.reduce((a, b) => a + b.bookings, 0);
    const totalCommission = series.reduce((a, b) => a + b.commission, 0);
    return { totalBookings, totalCommission, nextPayout: "Oct 31, 2025" };
  }, [series]);

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <Head title="Partner Dashboard" />
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">Partner Dashboard</h1>
      <p className="text-sm text-neutral-500 mb-6">Overview of your bookings, commissions, and payout schedule.</p>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader><CardTitle>Total Bookings</CardTitle></CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{totals.totalBookings}</div>
              <p className="text-xs text-neutral-500 mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}>
          <Card>
            <CardHeader><CardTitle>Total Commission</CardTitle></CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">₱{totals.totalCommission.toLocaleString()}</div>
              <p className="text-xs text-neutral-500 mt-1">Earned this month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
          <Card>
            <CardHeader><CardTitle>Next Payout</CardTitle></CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{totals.nextPayout}</div>
              <Badge>Payout scheduled</Badge>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="min-w-0">
          <CardHeader><CardTitle>Daily Bookings</CardTitle></CardHeader>
          <CardContent className="min-w-0">
            {/* Explicit height wrapper so Recharts always has dimensions */}
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#6366F1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader><CardTitle>Commission Trend</CardTitle></CardHeader>
          <CardContent className="min-w-0">
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="commission" stroke="#22C55E" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings table */}
      <div className="mt-8">
        <Card>
          <CardHeader><CardTitle>Recent Bookings</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-500 border-b">
                  <th className="py-2">Date</th>
                  <th>Package</th>
                  <th>Guest</th>
                  <th>Commission</th>
                </tr>
              </thead>
              <tbody>
                {series.slice(-10).map((b, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2">{format(addDays(b.date, 1), "PP")}</td>
                    <td>{["Balabac Adventure", "Island Hopping", "Snorkel Tour"][i % 3]}</td>
                    <td>{["John Doe", "Maria Lopez", "Anna Li"][i % 3]}</td>
                    <td>₱{b.commission.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <p className="text-[11px] text-neutral-400 mt-6">
        Demo data only. Replace with real partner metrics via Inertia props.
      </p>
    </div>
  );
}
