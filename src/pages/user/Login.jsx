import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-500 flex justify-center items-center relative overflow-hidden">

      {/* CARD */}
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 z-10">
        <h1 className="text-4xl font-bold mb-3 text-gray-700">
          Login to your Account
        </h1>

        <p className="text-gray-500 mb-8">
          Welcome back to FrostMart
        </p>

        {/* FORM */}
        <form className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="mail@example.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* OPTIONS */}
          <div className="flex justify-between items-center text-sm">

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="text-blue-700"
            >
              Forgot Password?
            </button>

          </div>

          {/* BUTTON */}
          <button
            className="w-full bg-blue-900 hover:bg-blue-950 transition text-white py-4 rounded-xl text-lg font-semibold"
          >
            Login
          </button>

        </form>

        {/* REGISTER LINK */}
        <p className="text-center mt-8">
          Not registered yet?{" "}

          <Link
            to="/register"
            className="font-semibold text-blue-800"
          >
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;