import React, { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

interface FormData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission here, e.g., submit data to backend
    console.log(formData);
  };

  return (
    <div className="registration-form">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          placeholder="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <div>
          <div className="to-login">
            <div>Already have an account?</div>
            <Link to="/login">Login</Link>
          </div>
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
