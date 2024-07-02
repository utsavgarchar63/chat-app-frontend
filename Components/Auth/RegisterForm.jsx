import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { Card, Form, FloatingLabel } from "react-bootstrap";
import { validateForm } from "../../Utils/validation";
import { ApiPost } from "../../Helper/APIData";
import styles from "../../Components/Register/Register.module.css";
export default function RegisterForm() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNo: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    let trimmedValue = value;
    if (name === "userName") {
      trimmedValue = value.replace(/\s/g, ""); // Remove all spaces
    }

    setFormData({
      ...formData,
      [name]: trimmedValue,
    });

    const newErrors = validateForm(name, trimmedValue, formData);
    setErrors({
      ...errors,
      ...newErrors,
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phoneNo: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await ApiPost("/user/register", formData, {
        "Content-Type": "application/json",
      });
      const email = formData.email;
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      if (res.data?.success) {
        toast.success(res.data?.message, {
          duration: 4000,
          position: "top-right",
          icon: "📧",
        });
      }
    } catch (err) {
      toast.error(err.response.data?.message, {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const { userName, email, phoneNo, password } = formData;
  const {
    userName: userNameError,
    email: emailError,
    password: passwordError,
  } = errors;

  return (
    <Card className="p-lg-4 shadow-lg p-3 mb-5 bg-body rounded">
      <div className={styles.registerCard}>
        <h3 className="mb-3">Register</h3>
        <h6 className="mb-4">
          <span className="fs-5">👋🏻</span> Welcome to our platform
        </h6>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="userName"
              value={userName}
              onChange={handleChange}
              placeholder="Enter Username"
              isInvalid={!!userNameError}
            />
            <Form.Control.Feedback type="invalid">
              {userNameError}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Email"
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </FloatingLabel>
          <div>
            <PhoneInput
              className={styles.phone_input}
              placeholder="Enter phone number"
              value={phoneNo}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              country={"in"}
              onChange={handlePhoneChange}
            />
          </div>
          <div className={`${styles.password_visible_eye} mt-3`}>
            <div
              className={`d-flex align-items-center position-relative`}
              style={{
                marginBottom: passwordError ? "3.25rem" : "0",
                transition: "margin 0.3s ease",
              }}
            >
              <FloatingLabel className="w-100" label="Password">
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  className="pe-5"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                  isInvalid={!!passwordError}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.invalid_feedback}
                >
                  {passwordError}
                </Form.Control.Feedback>
              </FloatingLabel>
              <i
                className={styles.password_icon}
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </i>
            </div>
          </div>
          <Link
            href="/login"
            className="d-block float-end mt-3"
            style={{ color: "#5000ca", fontWeight: "500" }}
          >
            Login
          </Link>
          <button className="button mt-5" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </Form>
      </div>
    </Card>
  );
}
