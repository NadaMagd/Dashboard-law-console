import { useEffect, useState } from "react";
import { getClientsCount } from "../Service/Client/UserService";

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const count = await getClientsCount();
      setUserCount(count);
    };

    fetchStats();
  }, []);

  return (
    <div >
      <h2>عدد المستخدمين: {userCount}</h2>
    </div>
  );
}
