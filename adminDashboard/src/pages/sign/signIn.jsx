import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import state from "../../state";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Control from "../../components/input";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../layout/Footer";
const Signing = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authenticated);
  useEffect(() => {
    if (auth) {
      navigate("/home");
    }
  }, []);
  const dispatch = useDispatch();
  const registerValues = {
    email: "",
    password: "",
  };
  const registerSchema = yup.object({
    email: yup
      .string()
      .email("enter a valid email")
      .required("Please enter your email here"),
    password: yup.string().required("Required!"),
  });
  const submitHandler = (e, a) => {
    console.log(e);
    dispatch(state.actions.login({ user: e, token: "TOKEN" }));
    navigate("/");
  };
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt="12px">
        <img src="../../../public/logo.png" />
        <Box>
          <Formik
            initialValues={registerValues}
            validationSchema={registerSchema}
            onSubmit={submitHandler}
          >
            {(formik) => {
              return (
                <>
                  <Form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "end",
                    }}
                  >
                    <Box
                      sx={{
                        outline: "1px solid #ddd",
                        padding: "20px",
                        width: "350px",
                        borderRadius: "4px",
                      }}
                    >
                      <Typography variant="h5">Sign in</Typography>
                      <Control name="email" label="Email" type="email" />
                      <Control
                        name="password"
                        label="Password"
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
                  <div className="divider">
                    <p>new to Flipcart?</p>
                  </div>
                  <Button
                    variant="outlined"
                    style={{
                      fontSize: "15px",
                      width: "350px",
                      padding: "5px",
                    }}
                    onClick={() => navigate("/sign-up")}
                  >
                    Create your Flipcart's account
                  </Button>
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

export default Signing;
