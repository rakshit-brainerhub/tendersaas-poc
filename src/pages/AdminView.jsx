import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import OrdersTable from "../Components/OrdersTable";
import { useAuth } from "../context/authContext";

export function AdminView() {
    const navigate = useNavigate();
  const { loading } = useAuth();

  if (loading) return <h1>Loading</h1>;

  return (
    <div className="flex flex-col w-full">
      <NavBar />

      <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <button
          type="button"
          onClick={() => navigate('/order')}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Order
        </button>

        <br />
        <br />
        <OrdersTable />
      </div>
    </div>
  );
}
