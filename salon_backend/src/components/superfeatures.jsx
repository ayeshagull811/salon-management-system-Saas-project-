import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import appointment from "../assets/appointment.png";
import staff from "../assets/staff.png";
import booking from "../assets/booking.png";

export default function SuperFeatures() {
  return (
    <div>
        <div>
             <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-700 to-pink-300 bg-clip-text text-transparent mt-30"
                    style={{ filter: "drop-shadow(0 4px 6px rgba(255, 182, 193, 0.8))" }}
                  >
                    Everything You Need, All in One Place
                  </motion.h2>
        </div>
        <div className="mt-20 space-y-15">
      <div className="relative flex justify-center items-center gap-10">
        <div className="absolute top-10 w-[90%] h-[80%] bg-pink-200/70 rounded-tr-[50px] rounded-es-[50px] -z-10"></div>

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
         className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 text-left p-6 sm:p-8 md:p-10"
        >
          <h1 className="text-xl sm:text-2xl bg-gradient-to-r from-pink-700 to-pink-300 bg-clip-text text-transparent font-bold mb-3 mt-5">
            Easy Appointment Scheduling
          </h1>
          <p className="text-sm sm:text-base leading-relaxed">
            Say goodbye to long wait times and complicated booking processes.
            With our smart scheduling system, clients can book their favorite
            salon services anytime, anywhere—right from their phone or computer.
            Manage your calendar, avoid double bookings, and send automatic
            reminders to keep your clients on time and happy. Simple, fast, and
            hassle-free!
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
           className="flex justify-center lg:justify-start"
        >
          <Image
            src={appointment}
            alt="Appointment"
            className="w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-auto relative -top-40"
          />
        </motion.div>
      </div>

      <div className="relative flex justify-center items-center gap-10">
        <div className="absolute top-10 w-[90%] h-[80%] bg-pink-200/70 rounded-tr-[50px] rounded-es-[50px] -z-10"></div>

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-start"
        >
          <Image
            src={staff}
            alt="Staff"
            className="w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-auto relative -top-25 -left-30 rounded-br-[200px]"
          />
        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
         className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 text-left p-7 sm:p-8 md:p-10"
        >
          <h1 className="text-xl sm:text-2xl bg-gradient-to-r from-pink-700 to-pink-300 bg-clip-text text-transparent font-bold mb-3 mt-5">
            Staff & Role Management
          </h1>
          <p className="text-sm sm:text-base leading-relaxed">
            Easily organize your team with our powerful staff and role
            management features. Assign specific roles, set permissions, and
            track performance—all from one place. Whether you’re managing
            stylists, receptionists, or assistants, our system keeps everything
            running smoothly and efficiently. Give your team the tools they need
            to deliver their best work every day.
          </p>
        </motion.div>
      </div>

      {/* <div className="relative flex justify-center items-center gap-10">
        <div className="absolute top-10 w-[90%] h-[80%] bg-pink-200/70 rounded-tr-[50px] rounded-es-[50px] -z-10"></div>

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 text-left p-7 sm:p-8 md:p-10"
        >
          <h1 className="text-xl sm:text-2xl bg-gradient-to-r from-pink-700 to-pink-300 bg-clip-text text-transparent font-bold mb-3 mt-5">
            Public Booking Page for Customers
          </h1>
          <p className="text-sm sm:text-base leading-relaxed">
            Give your clients the convenience they deserve with a beautiful,
            easy-to-use public booking page. Customers can browse your services,
            check availability, and book appointments instantly—anytime,
            anywhere. No calls, no hassle—just a smooth booking experience that
            keeps them coming back.
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start"
        >
          <Image
            src={booking}
            alt="Booking"
            className="w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-auto relative -top-18 rounded-bl-[100px] -right-30"
          />
        </motion.div>
      </div> */}
    </div>
    </div>
    
  );
}
