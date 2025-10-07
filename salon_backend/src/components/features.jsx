import React from "react";
import { motion } from "framer-motion";
import flower from "@/assets/flower1.png";
import {
  CalendarCheck,
  Users,
  UserRound,
  Package,
  BarChart3,
  Star,
} from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: CalendarCheck,
    title: "Online Appointment Booking",
    desc: "Let clients book services online anytime without calling. Choose preferred date, time, and staff in just a few clicks. Your schedule stays up-to-date automatically.",
  },
  {
    icon: Users,
    title: "Staff Scheduling",
    desc: "Manage shifts, breaks, and workloads with ease. Avoid double bookings by keeping everyone’s schedule in sync. Notify staff instantly of any changes.",
  },
  {
    icon: UserRound,
    title: "Customer Management",
    desc: "Store client profiles with contact info, service history, and preferences. Build stronger relationships and offer a more personalized experience every visit",
  },
  {
    icon: Package,
    title: "Inventory Tracking",
    desc: "Track all your salon products in real time. Get alerts when items are low in stock so you can restock before running out. Prevent wastage and over-purchasin",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    desc: "Monitor your salon’s performance with detailed reports. See revenue trends, top services, and busiest days to make smarter business decisions.",
  },
  {
    icon: Star,
    title: "Loyalty & Rewards",
    desc: "	Keep customers coming back with reward points and exclusive offers. Automatically track loyalty progress and send promotions to your top clients.",
  },
];

export default function KeyFeatures() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 }, // Delay between each child
    },
  };

  // Child animation for each card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <motion.section className="py-25 -mb-9">
      <div>
        <Image src={flower} alt="flower" className="relative -top-15 left-230 w-50 h-60" /> 
        <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
        className="text-5xl font-extrabold text-center absolute top-200 left-90 bg-gradient-to-r from-amber-700 to-amber-300 bg-clip-text text-transparent mb-12"
        style={{ filter: "drop-shadow(0 4px 6px rgba(255, 182, 193, 0.8))" }}
      >
        Why Salons Love Us
      </motion.h2>
      </div>
      

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
      >
        {features.map((feature, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
            key={index}
            className=" border border-amber-600 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
          >
            <feature.icon className="w-14 h-14 text-amber-500 mb-6" />
            <motion.h3 className="font-semibold text-xl mb-3">
              {feature.title}
            </motion.h3>
            <motion.p className="text-gray-600 text-base">
              {feature.desc}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
