import Head from "next/head";
import { useState, React, FormEvent } from "react";
import styles from "./Login.module.css";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { setToken } from "../../Utils/auth.util"
import { ApiPost } from "../../Helper/APIData";
import { Card, Container, FloatingLabel, Form } from "react-bootstrap";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await ApiPost("/user/login", formData, {
        "Content-Type": "application/json",
      });
      if (res.data?.success) {
        toast.success(res.data?.message, {
          duration: 4000,
          position: "top-right",
          icon: "📧",
        });
        router.push("/");
      }
    } catch (err) {
      toast.error(err.response.data?.message, {
        duration: 4000,
        position: "top-right",
      });
    }
  };
  return (
    <>
      <div>
        <svg
          className={styles.wave}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#5000ca"
            fillOpacity="1"
            d="M0,32L48,42.7C96,53,192,75,288,96C384,117,480,139,576,122.7C672,107,768,53,864,53.3C960,53,1056,107,1152,133.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <Container>
        <div
          className="d-flex align-items-center  
                        justify-content-center vh-100"
        >
          <Card className="p-5 shadow-lg p-3 mb-5 bg-body rounded">
            <div className={styles.loginCard}>
              <h3 className="mb-4">Login</h3>
              <Form>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </FloatingLabel>

                <Link
                  href="/register"
                  style={{ color: "#5000ca", fontWeight: "500" }}
                  className="d-block float-end mt-3 "
                >
                  Register
                </Link>
                <button
                  as="input"
                  className="mt-5 button"
                  type="button"
                  value="Register"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </Form>
            </div>
          </Card>
        </div>
      </Container>
    </>
  );
}
