import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { replace, useNavigate } from "react-router-dom";

const OrderForm = () => {
      const navigate = useNavigate();
  const [oName, setOName] = useState("");
  const [oPrice, setOPrice] = useState("");

  const value = collection(db, "orders");

  const listPage = () => {
    window.location.href = '/AdminView'
  }

  const handleCreate = async () => {
    if (oName.trim() === "" || oPrice.trim() === "") return;
    await addDoc(value, { orderName: oName, orderPrice: oPrice, approval: false }).then(() => listPage())
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <form className="w-full max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Order Name
          </label>
          <input
            type="text"
            id="email"
            value={oName}
            onChange={(e) => setOName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Order Price
          </label>
          <input
            type="text"
            id="password"
            value={oPrice}
            onChange={(e) => setOPrice(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          onClick={handleCreate}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
