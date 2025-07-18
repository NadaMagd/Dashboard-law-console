import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from './../firebase';


export default function TestConnection() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "chats")); 
        snapshot.forEach(doc => {
          console.log(doc.id, doc.data());
        });
        console.log("✅ الاتصال بـ Firebase تم بنجاح!");
      } catch (error) {
        console.error("❌ في مشكلة في الاتصال بـ Firebase:", error);
      }
    };

    fetchData();
  }, []);

  return <div>جاري اختبار الاتصال بـ Firebase...</div>;
}
