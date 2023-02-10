import {
  Box,
  Button,
  Typography,
  useTheme,
  Checkbox,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import state from "../../state/reducers/auth";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Control from "../../components/input";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../layout/Footer";
import { useLoginMutation } from "../../api/actions/auth";
import decode from "jwt-decode";
import { useEffect, useState } from "react";
import { authenticated } from "../../state/reducers/auth";

const Signing = () => {
  const [Disabled, setDisabled] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const [Err, setErr] = useState(null);
  const auth = useSelector(authenticated);
  const [Trusted, setTrusted] = useState(false);
  useEffect(() => {
    localStorage.setItem("persist", Trusted);
  }, [Trusted]);
  // UNCOMMENT FOR PRODUCTION
  // useEffect(() => {
  //   if (auth) {
  //     navigate("/");
  //   }
  // }, []);
  const dispatch = useDispatch();
  const [useLogin, login] = useLoginMutation();
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
  const token = useSelector((sa) => sa.token);
  const submitHandler = async (e, a) => {
    setDisabled(true);
    const data = new Object();
    const { email, password } = e;
    data.password = password;
    data.email = email;
    try {
      const fetching = await useLogin(data).unwrap();
      const decoded = decode(fetching.accessToken);
      const token = fetching.accessToken;
      const obb = {
        token,
        user: {
          userName: decoded.Userinfo.username,
        },
      };
      dispatch(state.actions.login(obb));
      navigate("/");
    } catch (err) {
      setDisabled(false);
      console.log(err);
      if (err?.status == 401) {
        a.setErrors({ password: "incorrect password" });
      } else {
        setErr(err ? err.message : "Oops something went wrong");
      }
    }
    // !1Aasdfg
  };
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt="12px">
        <img src="./logo.png" />
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
                      {Err ? (
                        <span
                          style={{
                            marginTop: "15px",
                            color: theme.palette.error.main,
                            fontSize: "14px",
                          }}
                        >
                          {Err}
                        </span>
                      ) : null}
                      <Control name="email" label="Email" type="email" />
                      <Control
                        name="password"
                        label="Password"
                        type="password"
                      />
                      <Tooltip
                        title="if you checked this you will be logged to this account even after exiting or refreshing the page"
                        arrow
                        placement="right"
                      >
                        <FormControlLabel
                          sx={{ m: " 5px auto 0" }}
                          control={
                            <Checkbox
                              size="small"
                              checked={Trusted}
                              onChange={() => setTrusted((prev) => !prev)}
                            />
                          }
                          label="Trust this device"
                        />
                      </Tooltip>
                      <Button
                        size="small"
                        variant="contained"
                        className="submit"
                        color="primary"
                        sx={{ width: "100%" }}
                        type="submit"
                        disabled={Disabled}
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
