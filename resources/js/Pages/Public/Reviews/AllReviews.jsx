import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

export default function AllReviews({ reviews = [], filters = {} }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [placeFilter, setPlaceFilter] = useState(filters.place || "all");
  const [recentness, setRecentness] = useState(filters.recent || "desc");
  const [ratingFilter, setRatingFilter] = useState(filters.rating || "all");

  const openLightbox = (photos, index)=>{ setCurrentPhotos(photos||[]); setCurrentIndex(index||0); setLightboxOpen(true); };
  const closeLightbox = ()=>setLightboxOpen(false);
  const prevPhoto = ()=>setCurrentIndex((p)=> p===0 ? currentPhotos.length-1 : p-1 );
  const nextPhoto = ()=>setCurrentIndex((p)=> p===currentPhotos.length-1 ? 0 : p+1 );

  // client-side filters for now (we also accept server filters if you want to offload it)
  const filtered = reviews
    .filter(r => placeFilter === "all" ? true : r.place === placeFilter)
    .filter(r => ratingFilter === "all" ? true : r.rating === parseInt(ratingFilter))
    .sort((a,b)=> recentness==='desc' ? new Date(b.created_at)-new Date(a.created_at) : new Date(a.created_at)-new Date(b.created_at));

  return (
    <main className="pt-24 bg-blue-50 min-h-screen">
      <Head title="Guest Reviews" />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Guest <span className="text-brand-blue">Reviews</span></h1>
          <p className="text-gray-600">See what travelers are saying about their Palawan adventures.</p>
        </div>

        <div className="font-semibold flex flex-wrap justify-center md:justify-end gap-4 mb-10">
          <select value={placeFilter} onChange={(e)=>setPlaceFilter(e.target.value)} className="border rounded-full px-4 py-2 text-sm">
            <option value="all">All Places</option>
            <option value="El Nido">El Nido</option>
            <option value="Coron">Coron</option>
            <option value="Balabac">Balabac</option>
          </select>
          <select value={recentness} onChange={(e)=>setRecentness(e.target.value)} className="border rounded-full px-4 py-2 text-sm">
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
          <select value={ratingFilter} onChange={(e)=>setRatingFilter(e.target.value)} className="border rounded-full px-4 py-2 text-sm">
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" initial={{opacity:0}} animate={{opacity:1}}>
          {filtered.map(review=>(
            <motion.div key={review.id} className="border rounded-3xl p-6 shadow-md bg-white" whileHover={{scale:1.02}}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
                <div className="flex">{Array.from({length:5}).map((_,i)=>(
                  <FaStar key={i} className={`text-sm ${i<review.rating ? 'text-yellow-400':'text-gray-300'}`} />
                ))}</div>
              </div>
              <p className="text-sm text-gray-500 mb-2">{review.place}</p>
              <p className="text-gray-700 mb-4">{review.content}</p>

              {!!review.photos?.length && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {review.photos.map((p,idx)=>(
                    <img key={idx} src={`/storage/${p}`} alt=""
                      onClick={()=>openLightbox(review.photos.map(x=>`/storage/${x}`), idx)}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-90"/>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString("en-US", {year:"numeric", month:"long", day:"numeric"})}</p>
            </motion.div>
          ))}
          {filtered.length===0 && <div className="col-span-full text-center py-20 text-gray-500">No reviews found.</div>}
        </motion.div>

        <AnimatePresence>
          {lightboxOpen && (
            <motion.div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]"
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <motion.img key={currentIndex} src={currentPhotos[currentIndex]} alt=""
                className="max-w-full max-h-[85vh] rounded-lg object-contain"
                initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} />
              <button onClick={()=>setLightboxOpen(false)} className="absolute top-6 right-6 text-white text-3xl"><FaTimes/></button>
              {currentPhotos.length>1 && (
                <>
                  <button onClick={()=>setCurrentIndex(prev=>prev===0?currentPhotos.length-1:prev-1)} className="absolute left-6 text-white text-4xl"><FaChevronLeft/></button>
                  <button onClick={()=>setCurrentIndex(prev=>prev===currentPhotos.length-1?0:prev+1)} className="absolute right-6 text-white text-4xl"><FaChevronRight/></button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
