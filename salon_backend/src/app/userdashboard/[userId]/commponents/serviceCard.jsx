"use client";
import React from "react";
import { Edit2, Trash2, ToggleRight } from "lucide-react";

export default function ServiceCard({
  service,
  onEdit,
  onDelete,
  onToggleActive,
  onSelect,
}) {
  const {
    id,
    name,
    category,
    price,
    currency = "PKR",
    duration,
    images = [],
    status,
    bookingsCount,
  } = service;

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all relative border border-gray-200">
      {/* Top bar with checkbox + status */}
      <div className="flex items-center justify-between p-3">
        <input
          type="checkbox"
          aria-label={`select ${name}`}
          onChange={(e) => onSelect?.(id, e.target.checked)}
          className="h-4 w-4 accent-pink-600 cursor-pointer"
        />
        <span
          className={`text-xs font-medium px-2 py-1 rounded-md ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {status === "active" ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Thumbnail */}
      <div className="px-3">
        <div className="h-40 w-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center mb-3">
          <img
            src={images[0] || "/placeholder.png"}
            alt={`${name} thumbnail`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Service info */}
      <div className="px-3 pb-3">
        <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span className="inline-block bg-pink-50 text-pink-700 px-2 py-0.5 rounded-md">
            {category}
          </span>
          <div className="flex items-center gap-3 font-medium">
            <span>
              {currency} {price}
            </span>
            <span className="text-gray-400">·</span>
            <span>{duration} min</span>
          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Bookings: {bookingsCount ?? 0}
          </span>

          <div className="flex items-center gap-2">
            {/* Edit */}
            <button
              onClick={() => onEdit?.(id)}
              aria-label="Edit"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <Edit2 size={16} />
            </button>
            {/* Delete */}
            <button
              onClick={() => onDelete?.(id)}
              aria-label="Delete"
              className="p-2 rounded-full hover:bg-gray-100 text-red-600"
            >
              <Trash2 size={16} />
            </button>
            {/* Toggle active */}
            <button
              onClick={() =>
                onToggleActive?.(id, status === "active" ? "inactive" : "active")
              }
              aria-label="Toggle active"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <ToggleRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
