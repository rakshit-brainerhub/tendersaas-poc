import React from 'react'

import { useAuth } from "../context/authContext";
import NavBar from "../Components/NavBar";

export function BrokerView() {
  const { loading } = useAuth();

  if (loading) return <h1>Loading</h1>;

  return (
    <div className="flex flex-col w-full">
      <NavBar />

      <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <p>Broker logged in</p>
      </div>
    </div>
  );
}

export default BrokerView
