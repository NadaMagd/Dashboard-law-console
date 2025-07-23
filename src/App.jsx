import Dashboard from "./pages/Dashboard";

import "./index.css";
import ConsultationsUI from "./pages/ConsultationsUI";
import { useEffect } from "react";
import { getInformationPendingLawyers } from "./Service/Lawers/Lawyers";


function App() {
useEffect(() => {
  async function getData() {
    const data = await getInformationPendingLawyers();
    console.log(data);
  }

  getData();
}, []);

  return (
    <>

      <Dashboard></Dashboard>
      <ConsultationsUI />

    </>
  );
}

export default App;
