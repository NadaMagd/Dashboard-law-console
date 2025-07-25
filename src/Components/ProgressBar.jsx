import React from 'react'



export default function ProgressCard({ title, value, total }) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="rounded-2xl p-5 shadow-md bgSecondary text-white border border-[#c9b38c] w-full max-w-md">
      <h3 className="text-md font-semibold goldTxt mb-3 text-center">{title}</h3>
      
      <div className="w-full bg-[#2f3448] rounded-full h-4 overflow-hidden">
        <div
          className="bgBtn h-full"
          style={{
            width: `${percent}%`,
            transition: "width 0.5s ease-in-out",
            borderRadius: percent === 100 ? "9999px" : "8px",
          }}
        ></div>
      </div>

      <p className="mt-2 text-sm text-right goldTxt">{percent}%</p>
    </div>
  );
}
