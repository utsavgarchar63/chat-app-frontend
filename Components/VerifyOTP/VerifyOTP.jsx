import Head from "next/head";
import { React, useState } from "react";
import { useRouter } from "next/router";
import styles from "./VerifyOTP.module.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { ApiPost } from "../../Helper/APIData";

export default function VerifyOTP() {
  const router = useRouter();
  const { email } = router.query;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input${index + 2}`).focus();
      }
    } else if (value.length === 0) {
      if (index > 0) {
        document.getElementById(`otp-input${index}`).focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").trim();
    if (/^[0-9]{1,4}$/.test(pasteData)) {
      const newOtp = [...otp];
      for (let i = 0; i < Math.min(pasteData.length, otp.length); i++) {
        newOtp[i] = pasteData.charAt(i);
      }
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        document.getElementById(`otp-input${index}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const concatenatedString = otp.join("");
    console.log(concatenatedString);
    try {
      const res = await ApiPost(
        "/user/verify-otp",
        { email, otp: concatenatedString },
        {
          "Content-Type": "application/json",
        }
      );
      if (res.responce.data?.success) {
        toast.success(res.responce.data?.message, {
          duration: 4000,
          position: "top-right",
        });
        router.push("/login");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "OTP verification failed", {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <svg
        className="wave"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#5000ca"
          fillOpacity="1"
          d="M0,256L48,218.7C96,181,192,107,288,106.7C384,107,480,181,576,224C672,267,768,277,864,250.7C960,224,1056,160,1152,144C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <Container fluid>
        <Row className="justify-content-center align-items-center vh-100">
          <div className="d-flex align-items-center justify-content-center vh-100">
            <Col xs={11} sm={8} md={6} lg={3}>
              <Card className="p-lg-4 shadow-lg p-3 mb-5 p-5 bg-body rounded text-center">
                <span className={`${styles.mainHeading} fs-2 `}>Enter OTP</span>
                <p className={`${styles.otpSubheading} fs-6`}>
                  We have sent a verification code to your <br /> mail box
                </p>
                <form onSubmit={handleSubmit}>
                  <div className={styles.inputContainer}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        required
                        maxLength="1"
                        type="text"
                        pattern="[0-9]*"
                        className={styles.otp_input}
                        id={`otp-input${index + 1}`}
                        value={digit}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                      />
                    ))}
                  </div>

                  <button
                    className={`${styles.verifyButton} button`}
                    type="submit"
                  >
                    Verify
                  </button>
                </form>
                <p className="mt-4 resendNote">
                  Didn't receive the code? <br />
                  <button className={styles.resendBtn}>Resend Code</button>
                </p>
              </Card>
            </Col>
          </div>
        </Row>
      </Container>
    </>
  );
}
