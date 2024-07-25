import { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
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
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // const { title, description } = data || {};
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleGenderChange = (event) => {
    setFormData({
      ...formData,
      gender: event.target.value,
    });

    const newErrors = validateForm("gender", event.target.value, formData);
    setErrors({
      ...errors,
      ...newErrors,
    });
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
    const validationErrors = {
      ...validateForm("userName", formData.userName, formData),
      ...validateForm("email", formData.email, formData),
      ...validateForm("phoneNo", formData.phoneNo, formData),
      ...validateForm("password", formData.password, formData),
      ...validateForm("gender", formData.gender, formData),
    };

    setErrors(validationErrors);
    setLoading(true);
    try {
      let avatar = "";
      if (formData.gender === "male") {
        let boyId = [
          40, 16, 33, 2, 24, 34, 17, 32, 15, 35, 47, 7, 30, 9, 45, 23, 14, 13,
          3, 21, 6, 31, 22, 43, 50, 12, 25, 11, 10, 39, 8, 19, 49, 27, 18, 37,
          36, 44, 29, 48, 26, 41, 5, 1, 4, 42, 20, 38,
        ];
        let randomIndex = Math.floor(Math.random() * boyId.length);
        let selectedId = boyId[randomIndex];
        avatar = `https://avatar.iran.liara.run/public/${selectedId}`;
      } else if (formData.gender === "female") {
        let girlId = [
          95, 61, 74, 51, 81, 78, 53, 84, 94, 72, 75, 77, 67, 82, 90, 65, 71,
          80, 57, 55, 99, 83, 59, 58, 73, 69, 76, 64, 52, 66, 88, 91, 92, 63,
          86, 93, 98, 100, 87, 70, 62, 97, 60, 96, 85, 56, 79, 54, 89,
        ];
        let randomIndex = Math.floor(Math.random() * girlId.length);
        let selectedId = girlId[randomIndex];
        avatar = `https://avatar.iran.liara.run/public/${selectedId}`;
      }

      const dataToSubmit = {
        ...formData,
        avatar,
      };
      const res = await ApiPost("/user/register", dataToSubmit, {
        "Content-Type": "application/json",
      });
      const email = formData.email;
      if (res.data?.success) {
        toast.success(res.data?.message, {
          duration: 4000,
          position: "top-right",
          icon: "📧",
        });
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
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

  const { userName, email, phoneNo, password, gender } = formData;
  const {
    userName: userNameError,
    email: emailError,
    password: passwordError,
    gender: genderError,
  } = errors;

  return (
    <>
      <Card className="p-lg-4  shadow-lg p-3 mb-5 bg-body rounded">
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
            <FormControl className="mt-2" error={!!genderError}>
              <FormLabel
                className="text-dark"
                id="demo-row-radio-buttons-group-label"
              >
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                value={gender}
                onChange={handleGenderChange}
              >
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      sx={{
                        color: "#5000ca",
                        "&.Mui-checked": {
                          color: "#5000ca",
                        },
                      }}
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      sx={{
                        color: "#5000ca",
                        "&.Mui-checked": {
                          color: "#5000ca",
                        },
                      }}
                    />
                  }
                  label="Female"
                />
              </RadioGroup>
              {genderError && (
                <div className="invalid-feedback d-block">{genderError}</div>
              )}
            </FormControl>
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
    </>
  );
}
