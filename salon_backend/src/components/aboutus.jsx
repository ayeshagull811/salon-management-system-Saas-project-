"use client";
import Image from "next/image";
import salon from "../assets/img1.jpeg";
import team from "../assets/img2.jpeg";
import imgaes from "../assets/img3.jpeg";

export default function AboutSection() {
  return (
    <section className="bg-[#CA9871] relative rounded-4xl h-100  my-20">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white my-7">About Us</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Welcome to{" "}
              <span className="font-semibold">Glamour Touch Salon</span>, where
              beauty meets relaxation. We specialize in luxurious hair, skin,
              and spa treatments to help you feel and look your best. Our expert
              stylists and therapists bring years of experience, ensuring you
              receive the perfect service tailored to your style.
            </p>
            <p className="text-white/70 leading-relaxed">
              From elegant haircuts to rejuvenating spa therapies, we promise an
              experience that blends comfort, style, and care. Come in, unwind,
              and leave glowing inside and out.
            </p>
          </div>
          <div className="relative">
            <div className="bg-amber-50 rounded-full w-60 h-60 absolute -bottom-5 left-50">
              <Image
                src={team}
                alt="Salon Interior"
                width={600}
                height={400}
                className="rounded-full h-50 w-50 left-5 top-5 absolute"
              />
            </div>
            <div className="bg-amber-50 rounded-full w-60 h-60 absolute -top-10 left-25">
              <Image
                src={salon}
                alt="Salon Team"
                width={300}
                height={200}
                className="rounded-full h-50 w-50 left-5 top-5 absolute"
              />
            </div>
            <div className="bg-amber-50 rounded-full w-60 h-60 absolute -top-10 left-75">
              <Image
                src={imgaes}
                alt="Happy Client"
                width={300}
                height={200}
                 className="rounded-full h-50 w-50 left-5 top-5 absolute"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
