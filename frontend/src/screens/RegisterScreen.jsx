import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) toast.error("Password do not match");
    else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials(res));
        navigate(redirect);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup className="my-3" controlId="name">
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup className="my-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter Email Address"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup className="my-3" controlId="password">
          <FormLabel>Password</FormLabel>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup className="my-3" controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <Button
          type="submit"
          className="btn btn-primary"
          onClick={submitHandler}
        >
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account ?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
