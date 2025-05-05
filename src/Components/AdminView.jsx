import { useAuth } from "../context/authContext";

export function AdminView() {
  const { user, logOut, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-200 dark:bg-gray-800">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Welcome, {user.displayName || user.email}
      </h1>

      <button
        className="mt-4 px-6 py-2 text-white bg-blue-600 rounded-full transition-all transform hover:scale-110 hover:bg-blue-700"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

