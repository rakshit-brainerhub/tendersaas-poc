import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const OrdersTable = () => {
  const [val, setVal] = useState([]);
  const value = collection(db, "orders");

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);

  const handleUpdate = async () => {
    const updateData = doc(db, "orders", id);
    await updateDoc(updateData, { approval: true });
};

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {val.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order.orderName}
                </th>
                <td className="px-6 py-4">${order.orderPrice}</td>
                <td className="px-6 py-4">{order.approval === true ? 'approved' : 'pending'}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={handleUpdate}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
