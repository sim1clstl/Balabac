import React, { useMemo, useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart,
} from "recharts";
import {
  addDays, format, subDays, differenceInCalendarDays,
  startOfMonth, endOfMonth
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

/* --------------------------------------------------------------------------
   Error Boundary — shows errors instead of a blank page
--------------------------------------------------------------------------- */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("Dashboard error:", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 m-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl">
          <div className="font-semibold mb-2">Dashboard crashed:</div>
          <pre className="whitespace-pre-wrap">{String(this.state.error)}</pre>
          <p className="mt-2 text-neutral-600">Open DevTools → Console for stack trace.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

/* --------------------------------------------------------------------------
   Minimal local UI primitives
--------------------------------------------------------------------------- */
const Button = ({ className = "", children, ...props }) => (
  <button
    className={`px-3 py-2 rounded-2xl shadow-sm bg-white border border-neutral-200 hover:bg-neutral-50 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);
const Card = ({ className = "", children }) => (
  <div className={`bg-white rounded-2xl border border-neutral-200 shadow-sm ${className}`}>{children}</div>
);
const CardHeader = ({ className = "", children }) => (
  <div className={`p-4 border-b border-neutral-100 ${className}`}>{children}</div>
);
const CardTitle = ({ className = "", children }) => (
  <h3 className={`text-base font-semibold ${className}`}>{children}</h3>
);
const CardContent = ({ className = "", children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
const Input = (props) => (
  <input
    {...props}
    className={`px-3 py-2 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${props.className || ""}`}
  />
);

/* Simple native select for presets */
const PresetSelect = ({ value, onChange, className = "" }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`px-3 py-2 rounded-xl border border-neutral-300 bg-white text-sm ${className}`}
  >
    <option value="last7">Last 7 days</option>
    <option value="last30">Last 30 days</option>
    <option value="mtd">Month to date</option>
    <option value="custom">Custom range</option>
  </select>
);

/* Emoji “icons” */
const Icon = ({ children, className = "" }) => (
  <span className={`inline-flex items-center justify-center ${className}`}>{children}</span>
);
const CalendarIcon = (props) => <Icon {...props}>📅</Icon>;
const TrendingUpIcon = (props) => <Icon {...props}>📈</Icon>;
const UsersIcon = (props) => <Icon {...props}>👥</Icon>;
const DollarIcon = (props) => <Icon {...props}>💰</Icon>;
const FilterIcon = (props) => <Icon {...props}>⚙️</Icon>;
const DownloadIcon = (props) => <Icon {...props}>⬇️</Icon>;

/* --------------------------------------------------------------------------
   Fake data generators
--------------------------------------------------------------------------- */
const seedRandom = (seed = 42) => {
  let t = seed;
  return () => { t = (t * 9301 + 49297) % 233280; return t / 233280; };
};

function makeSeries({ days = 30, min = 10, max = 100, seed = 1, startDate }) {
  const rand = seedRandom(seed);
  return Array.from({ length: days }).map((_, i) => {
    const d = addDays(startDate, i);
    const v = Math.round(min + rand() * (max - min));
    return { date: d, label: format(d, "MMM d"), value: v };
  });
}

function makeBreakdown(labels, total = 1000, seed = 2) {
  const rand = seedRandom(seed);
  let remaining = total;
  return labels.map((label, i) => {
    const take = i === labels.length - 1 ? remaining : Math.round(rand() * remaining * 0.6);
    remaining -= take;
    return { name: label, value: Math.max(10, take) };
  });
}

const COLORS = ["#6366F1", "#22C55E", "#F97316", "#06B6D4", "#E11D48", "#84CC16", "#A855F7"];

/* --------------------------------------------------------------------------
   Page Component
--------------------------------------------------------------------------- */
function DashboardInner() {
  const [preset, setPreset] = useState("last30");
  const [range, setRange] = useState(() => {
    const today = new Date();
    return { from: subDays(today, 29), to: today };
  });
  const [search, setSearch] = useState("");

  // update range when preset changes
  useEffect(() => {
    const today = new Date();
    if (preset === "last7") setRange({ from: subDays(today, 6), to: today });
    else if (preset === "last30") setRange({ from: subDays(today, 29), to: today });
    else if (preset === "mtd") setRange({ from: startOfMonth(today), to: today });
  }, [preset]);

  const days = useMemo(() => {
    if (!range.from || !range.to) return 30;
    return Math.max(1, differenceInCalendarDays(range.to, range.from) + 1);
  }, [range]);

  const bookings = useMemo(
    () => makeSeries({ days, min: 8, max: 48, seed: 10, startDate: range.from || subDays(new Date(), days - 1) }),
    [days, range.from]
  );
  const revenue = useMemo(
    () => makeSeries({ days, min: 3000, max: 12000, seed: 20, startDate: range.from || subDays(new Date(), days - 1) }),
    [days, range.from]
  );
  const visitors = useMemo(
    () => makeSeries({ days, min: 100, max: 800, seed: 30, startDate: range.from || subDays(new Date(), days - 1) }),
    [days, range.from]
  );

  const byChannel = useMemo(
    () => makeBreakdown(["Website", "Facebook", "Affiliates", "Ads", "Email"], 1000 + days * 20, 40),
    [days]
  );
  const topHotels = useMemo(
    () => makeBreakdown(["Sunset Bay", "Coral Reef", "Palm Vista", "Lagoon Inn", "Skyline Suites"], 500 + days * 10, 50),
    [days]
  );

  const kpis = useMemo(() => {
    const sum = (arr) => arr.reduce((a, b) => a + (b?.value ?? 0), 0);
    const growth = (arr) => {
      if (arr.length < 2) return 0;
      const prev = arr[arr.length - 2].value;
      const curr = arr[arr.length - 1].value;
      return prev ? (((curr - prev) / prev) * 100).toFixed(1) : 0;
    };
    return [
      { label: "Bookings", value: sum(bookings), change: growth(bookings), icon: CalendarIcon },
      { label: "Revenue", value: sum(revenue), change: growth(revenue), icon: DollarIcon, prefix: "₱" },
      { label: "Visitors", value: sum(visitors), change: growth(visitors), icon: UsersIcon },
      {
        label: "Conv. Rate",
        value: ((sum(bookings) / Math.max(1, sum(visitors))) * 100).toFixed(2) + "%",
        change: growth(bookings),
        icon: TrendingUpIcon,
      },
    ];
  }, [bookings, revenue, visitors]);

  const chartTooltip = {
    contentStyle: { borderRadius: 12, borderColor: "#e5e7eb" },
    labelStyle: { fontWeight: 600 },
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <Head title="Dashboard Demo" />

      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Executive Dashboard (Demo)</h1>
          <p className="text-sm text-neutral-500">Interactive prototype with fake data. Replace seeds with real metrics later.</p>
        </div>
        

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2">
            <PresetSelect value={preset} onChange={setPreset} className="w-[180px]" />
            <FilterIcon className="text-neutral-400" />
          </div>
          <div className="flex gap-2">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search hotels, partners…" className="w-[240px]" />
            <Button className="gap-2"><DownloadIcon /> Export CSV</Button>
          </div>
        </div>
      </div>

      {/* Custom Range Picker */}
      {preset === "custom" && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="text-sm text-neutral-600 mb-2">
              {range.from && range.to
                ? `${format(range.from, "PP")} → ${format(range.to, "PP")} (${days} days)`
                : "Pick a start and end date"}
            </div>
            <DayPicker
              mode="range"
              numberOfMonths={2}
              selected={range}
              onSelect={(r) => setRange(r ?? { from: undefined, to: undefined })}
              captionLayout="buttons"
            />
          </CardContent>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-neutral-500">{k.label}</CardTitle>
                <k.icon className="text-neutral-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">
                  {k.prefix || ""}
                  {typeof k.value === "number" ? k.value.toLocaleString() : k.value}
                </div>
                <p className={`text-xs mt-1 ${Number(k.change) >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {Number(k.change) >= 0 ? "+" : ""}
                  {k.change}% from prev day
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Bookings vs Revenue</CardTitle></CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={bookings.map((b, i) => ({
                  label: b.label,
                  bookings: b.value,
                  revenue: revenue[i]?.value ?? 0,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" minTickGap={16} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip {...chartTooltip} />
                <Legend />
                <Bar yAxisId="left" dataKey="bookings" fill="#6366F1" radius={[6, 6, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#22C55E" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Channel Breakdown</CardTitle></CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byChannel} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={4}>
                  {byChannel.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                </Pie>
                <Tooltip {...chartTooltip} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Visitors & Conversion</CardTitle></CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={bookings.map((b, i) => ({
                  label: b.label,
                  visitors: visitors[i]?.value ?? 0,
                  conversion: Number(((b.value / Math.max(1, visitors[i]?.value ?? 1)) * 100).toFixed(2)),
                }))}
              >
                <defs>
                  <linearGradient id="visitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" minTickGap={16} />
                <YAxis />
                <Tooltip {...chartTooltip} />
                <Legend />
                <Area type="monotone" dataKey="visitors" stroke="#06B6D4" fill="url(#visitors)" strokeWidth={2} />
                <Line type="monotone" dataKey="conversion" stroke="#F97316" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Top Hotels</CardTitle></CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topHotels}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip {...chartTooltip} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {topHotels.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Row: Calendar + Sparkline */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <Card className="xl:col-span-1">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon /> Booking Calendar
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <DayPicker mode="single" selected={range.to} defaultMonth={range.to} disabled />
            <p className="text-xs text-neutral-500">*Demo only. Wire to availability later.</p>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Daily Bookings (Sparkline)</CardTitle></CardHeader>
          <CardContent className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookings}>
                <XAxis dataKey="label" hide />
                <YAxis hide />
                <Tooltip {...chartTooltip} />
                <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <p className="text-[11px] text-neutral-400 mt-6">
        Demo-only UI. Replace fake data generators with real queries via Inertia props or an API route.
      </p>
    </div>
  );
}

export default function AdminDashboardDemo() {
  return (
    <ErrorBoundary>
      <DashboardInner />
    </ErrorBoundary>
  );
}
