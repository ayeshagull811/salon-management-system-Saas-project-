"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import flower from "@/assets/flower.png";
import {
  Scissors,
  Lotus,
  Hand,
  Palette,
  Smile,
  Heart,
  Droplet,
  Bath,
  Paintbrush,
  UserStar,
  User,
  Bubbles,
} from "lucide-react";
import Image from "next/image";

export default function ServicesSwiper() {

const services = [
  {
    title: "Hair Styling",
    desc: `Expert hairstyles for every occasion, from casual to elegant.
Tailored cuts that complement your face shape and personality.
Includes wash, blow-dry, and premium finishing products.
Healthy styling with top-quality tools and care.
Walk out confident with a look that lasts.`,
    icon: () => <Scissors className="w-14 h-14 text-amber-500" />,
  },
  {
    title: "Spa Treatment",
    desc: `Relax and rejuvenate with our soothing spa therapies.
Relieve stress and restore natural energy balance.
Enjoy calming aromas and a peaceful atmosphere.
Premium oils nourish skin while easing muscle tension.
Leave refreshed, renewed, and completely relaxed.`,
    icon: () => <UserStar className="w-14 h-14 text-amber-500" />,
  },
  {
    title: "Manicure & Pedicure",
    desc: `Pamper your hands and feet with expert care.
Includes soak, exfoliation, and nourishing massage.
Nails shaped, buffed, and polished to perfection.
Choose from classic, gel, or trendy shades.
Step out with beautiful, confident hands and feet.`,
    icon: () => <Hand className="w-14 h-14 text-amber-500" />,
  },
  {
    title: "Hair Coloring",
    desc: `Transform your look with vibrant or subtle colors.
Ammonia-free formulas for healthy, glossy hair.
Techniques include highlights, balayage, and ombre.
Personalized tones matched to your skin and style.
A head-turning finish that reflects your personality.`,
    icon: () => <Palette className="w-14 h-14 text-amber-500" />,
  },
  {
    title: "Facial Treatments",
    desc: `Deep-cleanse and refresh with our facial therapies.
Options for hydration, brightening, or anti-aging.
Gentle exfoliation and nourishing masks for all skin types.
Facial massage boosts blood circulation and glow.
Leave with soft, smooth, radiant skin.`,
    icon: () => <Smile className="w-14 h-14 text-amber-500" />,
  },
  {
    title: "Bridal Makeup",
    desc: `Flawless, long-lasting makeup for your big day.
Customized to match your style and wedding theme.
High-quality products for a radiant, camera-ready look.
Trials available to perfect your dream style.
Step into your wedding with elegance and confidence.`,
    icon: () => <Heart className="w-14 h-14 text-amber-500" />,
  },
  {
    title: "Waxing Services",
    desc: `Smooth, hair-free skin with gentle waxing methods.
Suitable for all skin types, even sensitive.
Premium wax for minimal discomfort and lasting results.
Full body, arms, legs, and facial waxing available.
Feel fresh, confident, and silky smooth.`,
    icon: () => <Droplet className="w-14 h-14 text-amber-500" />,
  },
  {
    title: "Massage Therapy",
    desc: `Relieve stress with customized massage techniques.
Improve circulation and release muscle tension.
Perfect for back, neck, and shoulder pain relief.
Warm oils and gentle strokes calm the body and mind.
Leave light, relaxed, and recharged.`,
    icon: () => <Bath className="w-14 h-14 text-amber-500" />,
  },
  {
    title: "Hair Spa",
    desc: `Repair and nourish damaged hair deeply.
Scalp massage boosts circulation and relaxation.
Restores shine, smoothness, and strength.
Customized treatments for your hair type.
Enjoy silky, vibrant, healthy-looking hair.`,
    icon: () => <Bubbles className="w-14 h-14 text-amber-500" />,
  },
  {
    title: "Nail Art",
    desc: `Express yourself with creative nail art designs.
Choose from minimal, trendy, or bold styles.
Safe, long-lasting materials for a perfect finish.
Custom looks or on-trend designs available.
Walk out with nails that turn heads.`,
    icon: () => <Paintbrush className="w-14 h-14 text-amber-500" />,
  },
];




  return (
    <section className="py-3">
      <div>
          <Image src={flower} alt="flower"  className="relative -top-10"/>
      <h2 className="text-5xl font-extrabold absolute top-480 left-120 text-center bg-gradient-to-r from-amber-700 to-amber-300 bg-clip-text text-transparent -mb-20"
        style={{ filter: "drop-shadow(0 4px 6px rgba(255, 182, 193, 0.8))" }}>
        Our Services
      </h2>
      </div>
      


  <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        slidesPerView={3}
        spaceBetween={30}
        className="max-w-6xl mx-auto"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <div className="border-amber-500 border h-100 p-7 my-7 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 text-center">
              <service.icon className="w-30 h-30 text-amber-500 mb-4 " />
              <h3 className="font-semibold text-amber-500 text-xl my-4">{service.title}</h3>
              <p className="text-gray-600  text-sm">{service.desc}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      
    </section>
  );
}
