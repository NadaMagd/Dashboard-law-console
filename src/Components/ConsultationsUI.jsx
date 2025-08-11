import { useEffect, useState } from "react";
import fetchConsultations from "../Service/Consultations/ConsultationsLogic";
import { FaClock, FaCheckCircle } from "react-icons/fa";

export default function ConsultationsUI() {
  const [pendingStatus, setPendingStatus] = useState(0);
  const [acceptsStatus, setAcceptsStatus] = useState(0);

  useEffect(() => {
    const data = async () => {
      const getData = await fetchConsultations();
      setPendingStatus(getData.pendingStatus);
      setAcceptsStatus(getData.acceptsStatus);
    };
    data();
  }, []);

  return (
    <div className="space-y-6">
      <div className="card-header">
        <h2 className="card-title">Consultations Overview</h2>
        <p className="card-subtitle">Real-time consultation status tracking</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Consultations */}
        <div className="card group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <FaClock className="text-white text-xl" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Pending</h3>
              <p className="text-slate-400 text-sm">Awaiting response</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-400">{pendingStatus}</div>
              <div className="text-slate-500 text-sm">consultations</div>
            </div>
          </div>
        </div>

        {/* Accepted Consultations */}
        <div className="card group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <FaCheckCircle className="text-white text-xl" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Accepted</h3>
              <p className="text-slate-400 text-sm">Confirmed sessions</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-400">{acceptsStatus}</div>
              <div className="text-slate-500 text-sm">consultations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Total Overview</h3>
        </div>
        <div className="p-6">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {pendingStatus + acceptsStatus}
            </div>
            <p className="text-slate-400 mt-2">Total Consultations</p>
          </div>
          
          {pendingStatus + acceptsStatus > 0 && (
            <div className="mt-6">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Pending</span>
                <span>{Math.round((pendingStatus / (pendingStatus + acceptsStatus)) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(pendingStatus / (pendingStatus + acceptsStatus)) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
