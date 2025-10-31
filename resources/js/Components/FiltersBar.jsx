import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, startOfMonth, endOfMonth, subDays } from "date-fns";

export default function FiltersBar({ dateRange, onChange }) {
  const today = new Date();
  const setPreset = (from, to) => onChange({ from, to });

  return (
    <div className="flex flex-wrap items-start gap-3">
      <div className="flex flex-wrap gap-2">
        <button className="px-3 py-1 rounded-lg border" onClick={() => setPreset(subDays(today, 6), today)}>Last 7 days</button>
        <button className="px-3 py-1 rounded-lg border" onClick={() => setPreset(subDays(today, 29), today)}>Last 30 days</button>
        <button className="px-3 py-1 rounded-lg border" onClick={() => setPreset(subDays(today, 89), today)}>Last 90 days</button>
        <button className="px-3 py-1 rounded-lg border" onClick={() => setPreset(startOfMonth(today), endOfMonth(today))}>This month</button>
        <button className="px-3 py-1 rounded-lg border" onClick={() => onChange({ from: undefined, to: undefined })}>All time</button>
      </div>

      <div className="text-sm text-gray-500">
        {dateRange?.from && dateRange?.to
          ? `${format(dateRange.from, "PP")} → ${format(dateRange.to, "PP")}`
          : "All time"}
      </div>

      {/* Inline custom picker (you can move this into a popover later) */}
      <div className="w-full md:w-auto md:ml-auto">
        <DayPicker
          mode="range"
          selected={dateRange}
          onSelect={(r) => onChange(r ?? { from: undefined, to: undefined })}
          numberOfMonths={2}
          captionLayout="buttons"
        />
      </div>
    </div>
  );
}
