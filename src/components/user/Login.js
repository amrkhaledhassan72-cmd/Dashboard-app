import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../auth/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = (e) => {
    e.preventDefault();

    dispatch(
      setCredentials({
        id: 1,
        firstName: "Amr",
        lastName: "Khaled",
        email: formData.email || "demo@example.com",
      }),
    );

    navigate("/home");
  };

  const toggleForm = () => {
    navigate("/register");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="auth-page">
      <ToastContainer />

      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-5">
          <div className="card auth-card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>

              <form onSubmit={handleSignIn}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Sign In
                </button>
              </form>
            </div>

            <div className="card-footer text-center">
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={toggleForm}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
