import React, { useEffect, useMemo, useState } from "react";
import { Head, useForm, router, usePage } from "@inertiajs/react";

export default function BookingIndex({ packages = [], blackoutDates = [], step = 1, bookingId = null, status = null }) {
  const [currentStep, setCurrentStep] = useState(step || 1);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const today = useMemo(() => new Date().toISOString().slice(0,10), []);
  const blackoutSet = useMemo(() => new Set(blackoutDates), [blackoutDates]);

  // Step 2 form
  const { data, setData, post, processing, errors, reset } = useForm({
    package_id: "",
    booking_date: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    num_people: 1,
  });

  useEffect(() => {
    if (selectedPackage) setData("package_id", selectedPackage.id);
  }, [selectedPackage]);

  // If redirected to step 3 after creating a booking
  useEffect(() => {
    if (step === 3) setCurrentStep(3);
  }, [step]);

  const onSubmitStep2 = (e) => {
    e.preventDefault();
    if (blackoutSet.has(data.booking_date)) {
      alert("Selected date is unavailable. Please choose another date.");
      return;
    }
    post("/booking", {
      onSuccess: () => {
        // Server redirects to /booking?step=3&booking_id=...
      }
    });
  };

  const [cardNumber, setCardNumber] = useState("");
  const [paying, setPaying] = useState(false);

  const mockPay = (e) => {
    e.preventDefault();
    if (!bookingId) { alert("No booking found."); return; }
    setPaying(true);
    router.post(`/booking/${bookingId}/confirm`, {}, {
      onFinish: () => setPaying(false),
    });
  };

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      <Head title="Book Now" />
      <h1 className="text-3xl font-bold mb-6">Book Your Experience</h1>

      <div className="flex items-center gap-2 text-sm mb-6">
        <span className={`px-2 py-1 rounded ${currentStep===1 ? "bg-gray-800 text-white" : "bg-gray-200"}`}>Step 1: Choose Package</span>
        <span>→</span>
        <span className={`px-2 py-1 rounded ${currentStep===2 ? "bg-gray-800 text-white" : "bg-gray-200"}`}>Step 2: Date & Details</span>
        <span>→</span>
        <span className={`px-2 py-1 rounded ${currentStep===3 ? "bg-gray-800 text-white" : "bg-gray-200"}`}>Step 3: Payment</span>
      </div>

      {currentStep === 1 && (
        <section className="grid md:grid-cols-2 gap-4">
          {packages.map(p => (
            <div key={p.id} className={`border rounded-xl p-4 ${selectedPackage?.id===p.id ? "border-gray-800" : "border-gray-200"}`}>
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{p.description}</p>
              <div className="mt-3 text-sm">
                <div>Duration: {p.duration_minutes} mins</div>
                <div>Price (per person): ₱{Number(p.price).toLocaleString()}</div>
              </div>
              <button
                className="mt-4 px-4 py-2 rounded-xl bg-gray-900 text-white"
                onClick={() => { setSelectedPackage(p); setCurrentStep(2); }}
              >
                Select
              </button>
            </div>
          ))}
        </section>
      )}

      {currentStep === 2 && (
        <form className="grid md:grid-cols-2 gap-6 mt-4" onSubmit={onSubmitStep2}>
          <div className="md:col-span-2 p-4 border rounded-xl">
            <div className="text-sm font-medium mb-2">Select a date</div>
            <input
              type="date"
              min={today}
              className="border rounded p-2"
              value={data.booking_date}
              onChange={(e) => setData("booking_date", e.target.value)}
              required
            />
            {!!errors.booking_date && <p className="text-red-600 text-sm mt-1">{errors.booking_date}</p>}
            {data.booking_date && blackoutSet.has(data.booking_date) && (
              <p className="text-red-600 text-sm mt-2">This date is unavailable.</p>
            )}
            <p className="text-xs text-gray-500 mt-2">Unavailable dates: {Array.from(blackoutSet).join(", ") || "None"}</p>
          </div>

          <div className="p-4 border rounded-xl">
            <div className="text-sm font-medium mb-2">Your Details</div>
            <label className="block text-sm">Full name</label>
            <input className="w-full border rounded p-2 mb-2" value={data.customer_name} onChange={e=>setData("customer_name", e.target.value)} required />
            {!!errors.customer_name && <p className="text-red-600 text-sm">{errors.customer_name}</p>}

            <label className="block text-sm">Email</label>
            <input type="email" className="w-full border rounded p-2 mb-2" value={data.customer_email} onChange={e=>setData("customer_email", e.target.value)} required />
            {!!errors.customer_email && <p className="text-red-600 text-sm">{errors.customer_email}</p>}

            <label className="block text-sm">Phone</label>
            <input className="w-full border rounded p-2 mb-2" value={data.customer_phone} onChange={e=>setData("customer_phone", e.target.value)} />
            {!!errors.customer_phone && <p className="text-red-600 text-sm">{errors.customer_phone}</p>}
          </div>

          <div className="p-4 border rounded-xl">
            <div className="text-sm font-medium mb-2">Booking Info</div>
            <label className="block text-sm">Number of people</label>
            <input type="number" min="1" className="w-full border rounded p-2 mb-2" value={data.num_people} onChange={e=>setData("num_people", Number(e.target.value))} required />
            {!!errors.num_people && <p className="text-red-600 text-sm">{errors.num_people}</p>}

            <label className="block text-sm">Selected Package</label>
            <input className="w-full border rounded p-2 mb-2 bg-gray-50" value={selectedPackage ? selectedPackage.name : ""} disabled />
            {!!errors.package_id && <p className="text-red-600 text-sm">{errors.package_id}</p>}
          </div>

          <div className="md:col-span-2 flex gap-2">
            <button type="button" className="px-4 py-2 rounded-xl border" onClick={()=>setCurrentStep(1)}>Back</button>
            <button type="submit" className="px-4 py-2 rounded-xl bg-gray-900 text-white" disabled={processing}>Continue to Payment</button>
          </div>
        </form>
      )}

      {currentStep === 3 && (
        <section className="mt-4 p-4 border rounded-xl">
          <h2 className="text-xl font-semibold">Payment</h2>
          {status === 'paid' ? (
            <div className="mt-2 p-3 bg-green-100 rounded">✅ Payment received. Your booking is confirmed!</div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mt-1">This is a mock payment screen. Enter any number and click Pay.</p>
              <form className="mt-4" onSubmit={mockPay}>
                <label className="block text-sm">Card Number (mock)</label>
                <input className="border rounded p-2 w-full max-w-md" value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)} />
                <div className="mt-3">
                  <button className="px-4 py-2 rounded-xl bg-gray-900 text-white" disabled={paying}>
                    {paying ? "Processing..." : "Pay Now (Mock)"}
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
      )}
    </div>
  );
}
