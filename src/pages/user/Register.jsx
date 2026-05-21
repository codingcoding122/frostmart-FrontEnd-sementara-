import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCheckCircle,
} from "react-icons/fi";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDASI PASSWORD
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Confirm Password harus sama!");
      return;
    }

    // VALIDASI TERMS
    if (!formData.agreeTerms) {
      alert("Kamu harus menyetujui Terms of Service dan Privacy Policy!");
      return;
    }

    // REGISTER SUCCESS
    console.log(formData);

    alert("Register berhasil!");
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f"
          alt="Frozen Food"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white px-10 text-center">
          <h1 className="text-5xl font-bold mb-6">
            FrostMart
          </h1>

          <p className="text-2xl font-semibold mb-4">
            Freshness preserved, quality delivered.
          </p>

          <p className="text-lg text-gray-200">
            Experience precision-chilled gourmet logistics
tailored for culinary excellence.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 bg-gradient-to-b from-blue-500 to-blue-700 flex justify-center items-center px-8 py-10">

        <div className="w-full max-w-md text-white">

          <h2 className="text-4xl font-bold mb-3">
            Create an Account
          </h2>

          <p className="mb-10 text-lg text-blue-100">
            Join FrostMart today.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* FULL NAME */}
            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <div className="flex items-center bg-white rounded-lg px-4 py-3">
                <FiUser className="text-gray-500 text-xl mr-3" />

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <div className="flex items-center bg-white rounded-lg px-4 py-3">
                <FiMail className="text-gray-500 text-xl mr-3" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <div className="flex items-center bg-white rounded-lg px-4 py-3">
                <FiLock className="text-gray-500 text-xl mr-3" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  required
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <div className="flex items-center bg-white rounded-lg px-4 py-3">
                <FiCheckCircle className="text-gray-500 text-xl mr-3" />

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  required
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            {/* TERMS */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 accent-blue-900"
              />

              <p className="text-sm text-blue-100 leading-relaxed">
                I agree to the{" "}
                <span className="underline cursor-pointer font-medium">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="underline cursor-pointer font-medium">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-950 transition py-4 rounded-lg font-semibold text-lg"
            >
              Create Account
            </button>

          </form>

          {/* LOGIN LINK */}
          <p className="text-center mt-8">
            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold underline"
            >
              Login here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;