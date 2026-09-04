import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Directly navigate to Composer page (no backend auth yet)
    navigate("/composer");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Login to Continue</h1>

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-80 bg-gray-800 p-6 rounded-xl shadow-lg border border-purple-700"
      >
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 py-2 rounded font-semibold transition transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
}
