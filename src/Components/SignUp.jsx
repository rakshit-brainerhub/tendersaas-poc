import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { userRoles } from "../utils/constants";

export function SignUp() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: ""
  });

  const { signUp } = useAuth();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (user.email.trim() === "" || user.password.trim() === "" || user.role.trim() === "") return;
      await signUp(user.email, user.password, user.role);
    } catch (error) {
      alert(error.message);
      console.error("Signup Error:", error.code, error.message);

      if (error.code === "auth/email-already-in-use") {
        setError("Email address is already in use.");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <p>error</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-center">Signup Page</h1>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-fold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="yourEmail@gmail.ltd"
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="******"
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Role
          </label>
          <select
            name="role"
            id="role"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          >
            <option value="">Select a role</option>
            {userRoles.map((userRole) => (
              <option key={userRole.key} value={userRole.value}>
                {userRole.key}
              </option>
            ))}
          </select>
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Signup
        </button>
      </form>
      <p className="my-4 text-sm flex justify-between px-5">
        Already have an account?<Link to={"/Login"}>Login</Link>
      </p>
    </div>
  );
}
