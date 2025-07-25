export default function ProgressCard({ title, value, total }) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className=" w-full max-w-md rounded-2xl overflow-hidden text-white shadow-neutral-600 shadow-md p-6 ">
      <h3 className="text-md font-semibold goldTxt mb-3 text-center">{title}</h3>
      
      <div className="w-full bgSecondary rounded-full h-4 overflow-hidden">
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
