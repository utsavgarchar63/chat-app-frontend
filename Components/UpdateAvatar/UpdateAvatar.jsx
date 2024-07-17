import { useRouter } from "next/router";
export default function UpdateAvatar() {
  const router = useRouter();
  const { email } = router.query;
  return (
    <>
      <svg
        className="wave"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#5000ca"
          fillOpacity="1"
          d="M0,128L48,122.7C96,117,192,107,288,133.3C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,186.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
        <h1>Hello11sd11asassdx1</h1>
      </svg>
    </>
  );
}
