import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { FaDatabase, FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";

export default function TestConnection() {
  const [connectionStatus, setConnectionStatus] = useState('testing');
  const [dataCount, setDataCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setConnectionStatus('testing');
        const snapshot = await getDocs(collection(db, "chats")); 
        let count = 0;
        snapshot.forEach(doc => {
          console.log(doc.id, doc.data());
          count++;
        });
        setDataCount(count);
        setConnectionStatus('success');
        console.log("✅ الاتصال بـ Firebase تم بنجاح!");
      } catch (error) {
        setError(error.message);
        setConnectionStatus('error');
        console.error("❌ في مشكلة في الاتصال بـ Firebase:", error);
      }
    };

    fetchData();
  }, []);

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'testing':
        return <FaSpinner className="w-8 h-8 text-blue-400 animate-spin" />;
      case 'success':
        return <FaCheckCircle className="w-8 h-8 text-green-400" />;
      case 'error':
        return <FaExclamationTriangle className="w-8 h-8 text-red-400" />;
      default:
        return <FaDatabase className="w-8 h-8 text-slate-400" />;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'testing':
        return 'Testing Firebase Connection...';
      case 'success':
        return 'Firebase Connection Successful!';
      case 'error':
        return 'Firebase Connection Failed';
      default:
        return 'Ready to test connection';
    }
  };

  const getStatusDescription = () => {
    switch (connectionStatus) {
      case 'testing':
        return 'Establishing connection to Firebase database...';
      case 'success':
        return `Successfully connected! Found ${dataCount} documents in chats collection.`;
      case 'error':
        return `Connection failed: ${error}`;
      default:
        return 'Click to test the Firebase connection';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Firebase Connection Test
          </h1>
          <p className="text-slate-400 text-lg">
            Test and verify database connectivity
          </p>
        </div>

        {/* Main Card */}
        <div className="card text-center">
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-6 mx-auto">
            {getStatusIcon()}
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            {getStatusText()}
          </h2>
          
          <p className="text-slate-300 mb-6 max-w-md mx-auto">
            {getStatusDescription()}
          </p>

          {/* Status Details */}
          {connectionStatus === 'success' && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-green-400">
                <FaCheckCircle className="w-5 h-5" />
                <span className="font-medium">Connection Established</span>
              </div>
              <p className="text-green-300 text-sm mt-2">
                Database is accessible and responding correctly
              </p>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-red-400">
                <FaExclamationTriangle className="w-5 h-5" />
                <span className="font-medium">Connection Failed</span>
              </div>
              <p className="text-red-300 text-sm mt-2">
                Please check your Firebase configuration and network connection
              </p>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Database Info</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Collection:</span>
                  <span className="font-mono">chats</span>
                </div>
                <div className="flex justify-between">
                  <span>Documents:</span>
                  <span className="font-mono">{dataCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`font-medium ${
                    connectionStatus === 'success' ? 'text-green-400' : 
                    connectionStatus === 'error' ? 'text-red-400' : 'text-blue-400'
                  }`}>
                    {connectionStatus.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Console Output</h3>
              <div className="text-sm text-slate-300">
                <p>Check browser console for detailed logs:</p>
                <div className="bg-slate-900/50 rounded p-2 mt-2 font-mono text-xs">
                  {connectionStatus === 'success' ? 
                    '✅ Firebase connection successful!' : 
                    connectionStatus === 'error' ? 
                    '❌ Firebase connection failed' : 
                    '🔄 Testing connection...'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
