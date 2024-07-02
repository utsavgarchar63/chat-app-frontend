export const validatePassword = (value) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!regex.test(value)) {
    return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)";
  }
  return "";
};

export const validateForm = (name, value, formData) => {
  const errors = {};

  switch (name) {
    case "userName":
      errors.userName =
        value.length < 3 ? "Username must be at least 3 characters long" : "";
      break;
    case "email":
      errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Invalid email address";
      break;
    case "phoneNo":
      errors.phoneNo = /^\d{10}$/.test(value)
        ? ""
        : "Phone number must be 10 digits";
      break;
    case "password":
      errors.password = validatePassword(value);
      break;
    default:
      break;
  }

  return errors;
};
