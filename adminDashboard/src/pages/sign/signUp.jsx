import React, { useEffect } from "react";
import { Box, Button, Typography, Chip } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Control from "../../components/input";
import { useNavigate } from "react-router-dom";

import Footer from "../../layout/Footer";
import { useSelector } from "react-redux";
const signUp = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authenticated);
  // useEffect(() => {
  //   if (auth) {
  //     navigate("/");
  //   }
  // }, []);

  const registerValues = {
    Name: "",
    email: "",
    password: "",
    rePassword: "",
  };
  const registerSchema = yup.object({
    Name: yup.string().required("Required!"),
    email: yup
      .string()
      .email("enter a valid email")
      .required("Please enter your email here"),
    password: yup.string().required("Please Enter your password").min(8),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "passwords must match"),
  });
  const submitHandler = async (e, a) => {
    const data = new Object();
    const { Name, email, password } = e;
    data.username = Name;
    data.password = password;
    data.email = email;
    const req = await fetch("http://localhost:3000/api/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (req.statusText === "Created") {
      navigate("/sign-in");
    } else {
      a.setErrors({ email: "email already exist" });
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt="12px">
        <img src="../../../public/logo.png" className="amazon-logo" />

        <Box>
          <Formik
            initialValues={registerValues}
            validationSchema={registerSchema}
            onSubmit={submitHandler}
            validateOnChange
          >
            {(formik) => {
              return (
                <>
                  <Form>
                    <Box
                      sx={{
                        outline: "1px solid #ddd",
                        padding: "20px",
                        width: "350px",
                        borderRadius: "4px",
                      }}
                    >
                      <Typography variant="h5">Create account</Typography>
                      <Control name="Name" label="Your name" type="name" />

                      <Control name="email" label="Email" type="email" />
                      <Control
                        name="password"
                        label="Password"
                        type="password"
                      />
                      <Control
                        name="rePassword"
                        label="Re-enter Password"
                        type="password"
                      />
                      <Button
                        size="small"
                        variant="contained"
                        className="submit"
                        color="primary"
                        sx={{ width: "100%" }}
                        type="submit"
                      >
                        continue
                      </Button>
                      <Typography mt="20px" fontSize="13px" variant="body1">
                        By continuing, you agree to Flipcart's Conditions of Use
                        and Privacy Notice.
                      </Typography>
                    </Box>
                  </Form>
                  <div
                    style={{
                      fontSize: "15px",
                      width: "350px",
                      padding: "5px",
                      marginTop: "5px",
                    }}
                  >
                    Already have an account?{" "}
                    <Chip
                      label="Sign in"
                      color="primary"
                      onClick={() => navigate("/sign-in")}
                    />
                  </div>
                </>
              );
            }}
          </Formik>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default signUp;
