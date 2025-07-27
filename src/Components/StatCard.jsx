export default function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-xl flex bgSecondary items-center justify-between mb-4 overflow-hidden text-white shadow-neutral-600 shadow-md p-6 hover:shadow-lg duration-200 w-full h-full transition-transform hover:scale-[1.01]">
      
        <h3 className="text-md  font-semibold">{title}</h3>
        <div className=" flex gap-3 items-center text-3xl font-bold mt-2">
          {value}
          {icon}
        </div>
      
    </div>
  );
}
