// resources/js/Pages/Public/Reviews/ReviewForm.jsx
import React, { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FaStar, FaImage, FaPaperPlane } from "react-icons/fa";

function StarRating({ value, onChange, size = "text-2xl" }) {
  const [hovered, setHovered] = useState(0);

  const stars = [1, 2, 3, 4, 5];
  const active = hovered || value;

  return (
    <div className="flex items-center gap-2" role="radiogroup" aria-label="Rating">
      {stars.map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onFocus={() => setHovered(n)}
          onBlur={() => setHovered(0)}
          onClick={() => onChange(n)}
          className="group focus:outline-none"
        >
          <FaStar
            className={`${size} transition-transform duration-150 group-hover:scale-110 drop-shadow-sm ${
              n <= active ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        </button>
      ))}
      <span className="ml-1 text-sm font-medium text-gray-600">
        {value}/5
      </span>
    </div>
  );
}

export default function ReviewForm() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    phone: "",
    place: "El Nido",
    rating: 5,
    content: "",
    photos: [],
  });

  const [previews, setPreviews] = useState([]);

  const onFiles = (e) => {
    const files = Array.from(e.target.files || []);
    setData("photos", files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const submit = (e) => {
    e.preventDefault();
    post(route("reviews.store"), {
      forceFormData: true,
      onSuccess: () => {
        reset("content", "photos");
        setPreviews([]);
      },
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#efe9df] via-[#f5f1ea] to-[#eef7ff]">
      <Head title="Write a Review" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-waves.svg')] bg-cover opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-gray-900"
          >
            Share your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">experience</span>
          </motion.h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Your feedback helps other travelers choose the perfect Palawan adventure.
          </p>
        </div>
      </section>

      {/* Card */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl ring-1 ring-black/5 p-6 md:p-8"
        >
          {/* Top row */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800">Full name</label>
              <input
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                placeholder="Jane Dela Cruz"
              />
              {errors.name && <p className="mt-1 text-sm text-rose-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">Email (optional)</label>
              <input
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">Phone (optional)</label>
              <input
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                placeholder="+63 9xx xxx xxxx"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">Place</label>
              <select
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition"
                value={data.place}
                onChange={(e) => setData("place", e.target.value)}
              >
                <option>El Nido</option>
                <option>Coron</option>
                <option>Balabac</option>
              </select>
              {errors.place && <p className="mt-1 text-sm text-rose-600">{errors.place}</p>}
            </div>
          </div>

          {/* Rating */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-800 mb-2">Rating</label>
            <StarRating value={data.rating} onChange={(n) => setData("rating", n)} />
            {errors.rating && <p className="mt-1 text-sm text-rose-600">{errors.rating}</p>}
          </div>

          {/* Review text */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-800">Your review</label>
            <textarea
              rows="5"
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 leading-relaxed placeholder:text-gray-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition"
              value={data.content}
              onChange={(e) => setData("content", e.target.value)}
              placeholder="Tell us what you loved, any tips for future travelers, etc."
            />
            {errors.content && <p className="mt-1 text-sm text-rose-600">{errors.content}</p>}
          </div>

          {/* Photos */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-800">Photos (optional)</label>

            <label
              htmlFor="photos"
              className="mt-2 inline-flex items-center gap-2 rounded-2xl border border-dashed border-teal-300 bg-teal-50/60 px-4 py-3 text-teal-700 hover:bg-teal-100 cursor-pointer transition"
            >
              <FaImage className="opacity-80" />
              <span>Choose files</span>
            </label>
            <input id="photos" type="file" className="hidden" multiple accept="image/*" onChange={onFiles} />
            {errors["photos.0"] && <p className="mt-1 text-sm text-rose-600">{errors["photos.0"]}</p>}

            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {previews.map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt=""
                    className="w-full h-24 object-cover rounded-xl ring-1 ring-black/5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Submitted reviews are published after approval.
            </p>

            <button
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-400 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-500/20 hover:brightness-[1.03] active:translate-y-px transition disabled:opacity-60"
              disabled={processing}
            >
              <FaPaperPlane className="text-base" />
              {processing ? "Submitting..." : "Submit review"}
            </button>
          </div>
        </motion.form>
      </section>
    </main>
  );
}
