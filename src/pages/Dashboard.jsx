import { useEffect, useState } from "react";
import {
  FaUserFriends,
  FaUserTie,
  FaUserClock,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaUsers,
  FaGavel,
} from "react-icons/fa";

import StatCard from "../components/StatCard";
import fetchConsultations from "../Service/Consultations/ConsultationsLogic";
import { getClientsCount } from "../Service/Client/UserService";
import { getLawyersNumbers } from "../Service/Lawers/Lawyers";
import LawyersBarChart from "../components/LawyersBarChart";
import ProgressCard from "../components/ProgressBar";
import UserDoughnutChart from "../components/UserDoughnutChart";
import ConsultationPieChart from "./../Components/ConsultationPieChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    lawyersAccepted: 0,
    lawyersPending: 0,
    consultationsAccepted: 0,
    consultationsPending: 0,
    lawyersTotal: 0,
  });

  // get all data
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
    <div className="space-y-8 p-6 min-h-screen fade-in">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Welcome to Law Counsel
        </h1>
        <p className="text-slate-400 text-lg">
          Professional Legal Management Dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard
          icon={<FaUserTie />}
          title="Accepted Lawyers"
          value={stats.lawyersAccepted}
        />
        <StatCard
          icon={<FaUserClock />}
          title="Pending Lawyers"
          value={stats.lawyersPending}
        />
        <StatCard
          icon={<FaUsers />}
          title="Total Clients"
          value={stats.clients}
        />
        <StatCard
          icon={<FaCheckCircle />}
          title="Accepted Consultations"
          value={stats.consultationsAccepted}
        />
        <StatCard
          icon={<FaClock />}
          title="Pending Consultations"
          value={stats.consultationsPending}
        />
      </section>

      {/* Progress Section */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Consultations Progress</h3>
              <p className="card-subtitle">Completion rate overview</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-blue-400 text-xl" />
            </div>
          </div>
          <ProgressCard
            title="Consultations Completed"
            value={stats.consultationsAccepted}
            total={consultationsTotal}
          />
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Lawyers Approval Rate</h3>
              <p className="card-subtitle">Acceptance statistics</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
              <FaGavel className="text-green-400 text-xl" />
            </div>
          </div>
          <ProgressCard
            title="Lawyers Accepted"
            value={stats.lawyersAccepted}
            total={stats.lawyersTotal}
          />
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Consultations Distribution</h3>
            <p className="card-subtitle">Accepted vs Pending</p>
          </div>
          <div className="flex items-center justify-center p-6">
            <ConsultationPieChart
              accepted={stats.consultationsAccepted}
              pending={stats.consultationsPending}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Lawyers Status</h3>
            <p className="card-subtitle">Pending vs Accepted</p>
          </div>
          <div className="flex items-center justify-center p-6">
            <UserDoughnutChart
              Pending={stats.lawyersPending}
              Accepted={stats.lawyersAccepted}
            />
          </div>
        </div>
      </section>

      {/* Main Chart */}
      <section className="card">
        <div className="card-header">
          <h3 className="card-title">Clients vs Lawyers Overview</h3>
          <p className="card-subtitle">Total population comparison</p>
        </div>
        <div className="p-6">
          <LawyersBarChart
            Clients={stats.clients}
            Lawyers={stats.lawyersTotal}
          />
        </div>
      </section>
    </div>
  );
}
