import { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { setLogin } from "../../state";
import FlexBetween from "../../components/FlexBetween";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().required("Role is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Confirm Password is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const navigate = useNavigate();
  const [pageType, setPageType] = useState("login");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const [token, setToken] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  const register = async (values, onSubmitProps) => {
    try {
      const savedUserResponse = await fetch(
        "http://localhost:8000/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();

      if (savedUserResponse.ok) {
        setToken(savedUser.access_token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInUserResponse = await fetch(
        "http://localhost:8000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify(values),
        }
      );
      console.log("-----------------");
      console.log(values);
      console.log("-----------------");

      const loggedInUser = await loggedInUserResponse.json();
      onSubmitProps.resetForm();

      if (loggedInUser["detail"] === "Invalid email or password") {
        setErrorMessage("Invalid email or password");
      } else {
        setToken(loggedInUser.access_token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      await login(values, onSubmitProps);
    } else {
      await register(values, onSubmitProps);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Role"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role}
                  name="role"
                  error={Boolean(touched.role) && Boolean(errors.role)}
                  helperText={touched.role && errors.role}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 2" }}
                />
              </>
            )}

            {isLogin && (
              <>
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 2" }}
                />
              </>
            )}
          </Box>
          <br />
          <ErrorMessage message={errorMessage} />

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "#00D5FA",
                color: "#FFFFFF",
                "&:hover": { color: "#00D5FA" },
              }}
            >
              Submit
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: "#00D5FA",
                "&:hover": { cursor: "pointer", color: "#E6FBFF" },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign up here"
                : "Already have an account? Log in here"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
