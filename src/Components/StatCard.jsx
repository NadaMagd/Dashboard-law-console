import React from "react";

export default function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl overflow-hidden text-white shadow-neutral-600 shadow-md p-6 hover:shadow-lg transition-all duration-200 w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-md font-semibold goldTxt">{title}</h3>
          <p className="text-3xl font-bold goldTxt mt-2">{value}</p>
        </div>
        <div className="text-4xl text-[#c9b38c]">{icon}</div>
      </div>
    </div>
  );
}
