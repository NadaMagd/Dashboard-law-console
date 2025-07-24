import { useEffect, useState } from "react";
import {
  FaUserFriends,
  FaUserTie,
  FaUserClock,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import StatCard from "./../Components/StatCard";
import fetchConsultations from "../Service/Consultations/ConsultationsLogic";
import { getClientsCount } from "../Service/Client/UserService";
import { getLawyersNumbers } from "../Service/Lawers/Lawyers";
import ConsultationPieChart from "../Components/ConsultationPieChart";
import LawyersBarChart from "../Components/LawyersBarChart";
import ProgressCard from "../Components/ProgressBar";
import ClientLawyerLineChart from "./../Components/ClientLawyerLineChart";
import PolarAreaChart from "../Components/PolarAreaChart";
import UserDoughnutChart from "../Components/UserDoughnutChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    lawyersAccepted: 0,
    lawyersPending: 0,
    consultationsAccepted: 0,
    consultationsPending: 0,
    lawyersTotal: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const clients = await getClientsCount();
      const lawyerStats = await getLawyersNumbers();
      const consultStats = await fetchConsultations();

      setStats({
        clients,
        lawyersAccepted: lawyerStats.accepted,
        lawyersPending: lawyerStats.pending,
        lawyersTotal: lawyerStats.total,
        consultationsAccepted: consultStats.acceptsStatus,
        consultationsPending: consultStats.pendingStatus,
      });
    };

    fetchStats();
  }, []);

  const consultationsTotal =
    stats.consultationsAccepted + stats.consultationsPending;
  return (
    <div className="space-y-10 p-6 bg-[#1c202e] min-h-screen">
      {/* Cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<FaUserTie size={24} />}
          title="Accepted Lawyers"
          value={stats.lawyersAccepted}
        />
        <StatCard
          icon={<FaUserClock size={24} />}
          title="Pending Lawyers"
          value={stats.lawyersPending}
        />
        <StatCard
          icon={<FaUserFriends size={24} />}
          title="Clients"
          value={stats.clients}
        />
        <StatCard
          icon={<FaCheckCircle size={24} />}
          title="Accepted Consultations"
          value={stats.consultationsAccepted}
        />
        <StatCard
          icon={<FaClock size={24} />}
          title="Pending Consultations"
          value={stats.consultationsPending}
        />
      </section>

      {/* Charts Container */}
      <section className="flex flex-wrap justify-center gap-10">
        <div className="bgSecondary p-6 rounded-2xl border border-[#c9b38c] shadow-md w-full max-w-md">
          <ConsultationPieChart
            accepted={stats.consultationsAccepted}
            pending={stats.consultationsPending}
          />
        </div>

        <div className="bgSecondary p-6 rounded-2xl border border-[#c9b38c] shadow-md w-full max-w-md">
          <UserDoughnutChart
            Pending={stats.lawyersPending}
            Accepted={stats.lawyersAccepted}
          />
        </div>
      </section>

      {/* Doughnut Chart */}
      <section className="bgSecondary p-6 rounded-2xl border border-[#c9b38c] shadow-md max-w-4xl mx-auto">
          <LawyersBarChart
            Clients={stats.clients}
            Lawyers={stats.lawyersTotal}
          />
      </section>


      {/* Progress Bars */}
      <section className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bgSecondary p-6 rounded-2xl border border-[#c9b38c] shadow-md">
          <ProgressCard
            title="Lawyers Accepted %"
            value={stats.lawyersAccepted}
            total={stats.lawyersTotal}
          />
        </div>

        <div className="bgSecondary p-6 rounded-2xl border border-[#c9b38c] shadow-md">
          <ProgressCard
            title="Consultations Completed %"
            value={stats.consultationsAccepted}
            total={consultationsTotal}
          />
        </div>
      </section>
    </div>
  );
}
