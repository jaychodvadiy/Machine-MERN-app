import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import loginImg from "../../assets/images/login.png";
import userIcon from "../../assets/images/user.png";
import { BASE_URL } from "../../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");  // ✅ Handle errors without dispatch
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };



  const handleClick = async (e) => {
    e.preventDefault();
    setError(""); // ✅ Reset previous errors

    try {

      const res = await fetch(`${BASE_URL}/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",  // ✅ Important for cookies/auth
        body: JSON.stringify(credentials),
      });


      const result = await res.json();
      // console.log("API Response:", result);

      if (!res.ok) {
        setError(result.message || "Login failed!"); // ✅ Set error message
        return;
      }

      localStorage.setItem("user", JSON.stringify(result.user)); // ✅ Store user data
      navigate("/"); // ✅ Redirect on success
    } catch (err) {
      console.error("Error during login:", err);
      setError("Something went wrong. Please try again!"); // ✅ Handle fetch errors
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>
                {error && <p className="error-text">{error}</p>} {/* ✅ Show error message */}
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an account? <Link to="/register"> Register Here!</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
