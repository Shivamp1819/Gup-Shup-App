import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/slice/user/user.thunk";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, buttonLoading } = useSelector((state) => state.userReducer);

  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    gender: "male",
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupData.fullName || !signupData.username || !signupData.password) {
      toast.error("All fields are required");
      return;
    }
    const response = await dispatch(registerUserThunk(signupData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Please Signup</h2>

        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input
            type="text"
            className="grow"
            placeholder="Full name"
            name="fullName"
            value={signupData.fullName}
            onChange={handleChange}
            autoComplete="name"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
            value={signupData.username}
            onChange={handleChange}
            autoComplete="username"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <IoKeySharp />
          <input
            type="password"
            className="grow"
            placeholder="Password"
            name="password"
            value={signupData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </label>

        <div className="flex items-center gap-4">
          <label className="label">
            <span className="label-text">Gender:</span>
          </label>
          <select
            name="gender"
            className="select select-bordered"
            value={signupData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button
          onClick={handleSignup}
          className="btn btn-primary"
          disabled={buttonLoading}
        >
          {buttonLoading ? "Signing up..." : "Signup"}
        </button>

        <p className="text-sm">
          Already have an account?{" "}
          <Link className="link" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
