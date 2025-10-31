import React, { useMemo } from "react";
import { Head } from "@inertiajs/react";
import { format, addDays, addMonths, startOfMonth, eachDayOfInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

/* Simple card primitives to match your dashboard */
const Card = ({ className = "", children }) => (
  <div className={`bg-white rounded-2xl border border-neutral-200 shadow-sm ${className}`}>{children}</div>
);
const CardHeader = ({ children }) => <div className="p-4 border-b border-neutral-100">{children}</div>;
const CardTitle = ({ children }) => <h3 className="text-base font-semibold">{children}</h3>;
const CardContent = ({ children }) => <div className="p-4">{children}</div>;
const Badge = ({ color = "bg-indigo-100 text-indigo-700", children }) => (
  <span className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}>{children}</span>
);

/* Fake booking data */
function useFakeBookings() {
  const today = new Date();
  const days = eachDayOfInterval({ start: startOfMonth(today), end: addMonths(today, 2) });
  const rand = (seed) => Math.floor((Math.sin(seed * 9999) + 1) * 10) % 4;
  return days
    .filter((_, i) => rand(i) === 1)
    .map((d, i) => ({
      id: i + 1,
      date: d,
      name: ["Balabac Adventure", "Island Hopping", "Sunset Cruise", "Snorkel Tour"][i % 4],
      guest: ["John Doe", "Maria Lopez", "Chris Park", "Anna Li"][i % 4],
      nights: 2 + (i % 3),
    }));
}

export default function BookingCalendarPage() {
  const bookings = useFakeBookings();

  // Highlight dates with bookings
  const bookedDays = useMemo(() => bookings.map((b) => b.date), [bookings]);

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <Head title="Booking Calendar" />
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">Booking Calendar</h1>
      <p className="text-sm text-neutral-500 mb-6">
        View upcoming bookings by date. Fake demo data for now.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Next 3 Months</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <DayPicker
              mode="single"
              numberOfMonths={2}
              modifiers={{ booked: bookedDays }}
              modifiersStyles={{
                booked: { backgroundColor: "#6366F1", color: "white" },
              }}
              disabled
            />
            <div>
              <h3 className="font-semibold mb-3 text-neutral-700">Bookings</h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between border border-neutral-200 rounded-xl px-3 py-2 bg-white shadow-sm hover:bg-neutral-50"
                  >
                    <div>
                      <div className="font-medium text-sm">{b.name}</div>
                      <div className="text-xs text-neutral-500">
                        {format(b.date, "PP")} · {b.nights} nights · {b.guest}
                      </div>
                    </div>
                    <Badge>{format(b.date, "MMM d")}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
