import React, { useMemo } from "react";
import { Head, router, Link } from "@inertiajs/react";

export default function ReviewModeration({ reviews = [], status = "pending", place = null }) {
  const places = useMemo(()=>["El Nido","Coron","Balabac"],[]);
  const doApprove = (id) => router.post(route("admin.reviews.approve", id), {}, { preserveScroll: true });
  const doReject  = (id) => router.post(route("admin.reviews.reject", id), {}, { preserveScroll: true });

  const changeFilter = (newStatus, newPlace) => {
    router.get(route("admin.reviews.index"), { status: newStatus, place: newPlace || "" }, { preserveState: true });
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Head title="Review Moderation" />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Review Moderation</h1>
          <Link href={route('reviews.index')} className="underline text-blue-600">View public reviews</Link>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <select value={status} onChange={(e)=>changeFilter(e.target.value, place)} className="border rounded-xl px-3 py-2">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select value={place || ""} onChange={(e)=>changeFilter(status, e.target.value || null)} className="border rounded-xl px-3 py-2">
            <option value="">All places</option>
            {places.map(p=><option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {reviews.length === 0 && (
          <div className="p-10 bg-white rounded-2xl shadow text-center text-gray-500">No reviews.</div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map(r=>(
            <div key={r.id} className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{r.name}</h3>
                  <p className="text-sm text-gray-500">{r.place} • {new Date(r.created_at).toLocaleDateString()}</p>
                </div>
                <div className="font-semibold">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
              </div>
              <p className="mt-4 text-gray-700 whitespace-pre-line">{r.content}</p>

              {r.photos?.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {r.photos.map((p,i)=>(
                    <a key={i} href={`/storage/${p}`} target="_blank" className="block">
                      <img src={`/storage/${p}`} className="w-full h-20 object-cover rounded-md" />
                    </a>
                  ))}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                {r.status !== 'approved' && (
                  <button onClick={()=>doApprove(r.id)} className="px-4 py-2 rounded-full bg-teal-600 text-white">Approve</button>
                )}
                {r.status !== 'rejected' && (
                  <button onClick={()=>doReject(r.id)} className="px-4 py-2 rounded-full bg-rose-600 text-white">Reject</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
