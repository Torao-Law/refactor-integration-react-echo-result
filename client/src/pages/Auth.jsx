import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import ImgDumbMerch from "../assets/DumbMerch.png";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

export default function Auth() {
  // navigation initialization
  let navigate = useNavigate();

  // get data login from context
  const [state] = useContext(UserContext);

  // as a value reference to display the modal register
  const [isRegister, setIsRegister] = useState(false);

  // side effect to run the checkAuth() function during the mounting process
  useEffect(() => {
    checkAuth();
  }, [])
  
  // function to check login status
  const checkAuth = () => {
    if (state.isLogin) {
      navigate("/");
    }
  };

  // function to change the state value and display the login modal
  const switchLogin = () => {
    setIsRegister(false);
  };

  // function to change the state value and display the register modal
  const switchRegister = () => {
    setIsRegister(true);
  };

  return (
    <div className="bg-black">
      <Container>
        <Row className="vh-100 d-flex align-items-center">
          <Col md="6">
            <img src={ImgDumbMerch} className="img-fluid" style={{ width: "264px", height: "264px" }} alt="brand" />
            <div className="text-auth-header mt-4">Easy, Fast and Reliable</div>
            <p className="text-auth-parag mt-3">Go shopping for merchandise, just go to dumb merch <br /> shopping. the biggest merchandise in{" "}<b>Indonesia</b></p>

            <div className="mt-5">
              <button onClick={switchLogin} className="btn btn-login px-5">
                Login
              </button>
              <button onClick={switchRegister} className="btn btn-register px-5">
                Register
              </button>
            </div>
          </Col>
          <Col md="6">{isRegister ? <Register /> : <Login />}</Col>
        </Row>
      </Container>
    </div>
  );
}
