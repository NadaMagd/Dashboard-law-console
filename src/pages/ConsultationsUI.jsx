import { useEffect, useState } from "react";
import fetchConsultations from "../Service/Consultations/ConsultationsLogic";

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
    <>
      <h1>pendingStatus: {pendingStatus}</h1>
      <h1>acceptsStatus: {acceptsStatus}</h1>
    </>
  );
}
