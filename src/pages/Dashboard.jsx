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
    <div className="space-y-10 p-6 min-h-screen ">
      {/* Cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 ">
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

      {/* Progress Bars */}
      <section className="grid md:grid-cols-2 gap-2 max-w-10xl mx-auto">
        <div className="p-6">
          <ProgressCard
            title="Consultations Completed %"
            value={stats.consultationsAccepted}
            total={consultationsTotal}
          />
        </div>

        <div className=" p-6">
          <ProgressCard
            title="Lawyers Accepted %"
            value={stats.lawyersAccepted}
            total={stats.lawyersTotal}
          />
        </div>
      </section>

      {/* Charts Container */}
      <section className="flex flex-wrap justify-center gap-10 bgSecondary rounded-2xl overflow-hidden text-white shadow-neutral-600 shadow-md">
        <div className="p-6 rounded-2xl w-full max-w-md">
          <ConsultationPieChart
            accepted={stats.consultationsAccepted}
            pending={stats.consultationsPending}
          />
        </div>

        <div className="p-6 rounded-2xl w-full max-w-md">
          <UserDoughnutChart
            Pending={stats.lawyersPending}
            Accepted={stats.lawyersAccepted}
          />
        </div>

        <div className="p-6 rounded-2xl w-full max-w-md">
          <LawyersBarChart
            Clients={stats.clients}
            Lawyers={stats.lawyersTotal}
          />
        </div>
      </section>

      {/* Doughnut Chart */}
      {/* <section className="bgSecondary p-6 rounded-2xl overflow-hidden text-white shadow-neutral-600 shadow-md max-w-lg  mx-auto">

       
        
      </section> */}
    </div>
  );
}
