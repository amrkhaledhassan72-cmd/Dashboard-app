import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddUserMutation, useGetAllUsersQuery } from "../../api/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegistrationForm() {
  const navigate = useNavigate();
  const { data: users, error } = useGetAllUsersQuery();
  const [addUser, { isLoading }] = useAddUserMutation();

  const [formData, setFormData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (users) {
      //console.log("users: ", users);
      setFormData({
        ...formData,
        id: users.length + 1,
      });
    }
  }, [users]);

  const canSave = [formData].every(Boolean) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bcryptPassword = formData.password;

    if (canSave) {
      try {
        await addUser({
          id: formData.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: bcryptPassword,
        }).unwrap();

        setFormData({
          ...formData,
          id: users.length + 2,
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        toast("User Saved Successful...");
        navigate("/");
      } catch (err) {
        console.log("Failed to save the User");
        toast("User Saved Failed...");
      }
    }
  };

  const toggleForm = () => {
    navigate("/login");
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
              <h2 className="card-title text-center">Registration Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter your first name"
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter your last name"
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email address"
                    onChange={handleChange}
                    value={formData.email}
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
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
            </div>
            <div className="card-footer">
              <p className="text-center">
                Already have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={toggleForm}
                ></button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
