
import UpdateAvatarForm from "./UpdateAvatarForm";
export default function UpdateAvatar() {
  return (
    <>
      <svg
        className="wave"
        style={{ zIndex: "-1" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#5000ca"
          fillOpacity="1"
          d="M0,128L48,117.3C96,107,192,85,288,74.7C384,64,480,64,576,85.3C672,107,768,149,864,160C960,171,1056,149,1152,144C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <div className="d-flex align-items-center justify-content-center vh-100">
        <UpdateAvatarForm />
      </div>
    </>
  );
}
