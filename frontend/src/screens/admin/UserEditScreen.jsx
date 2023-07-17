import { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";

import {
  useGetUserDetailsQuery,
  useGetUsersQuery,
  useUpdateUserDetailsMutation,
} from "../../slices/usersApiSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UserEditScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState("");

  const { id: userId } = useParams();

  const { data: userInfo, isLoading, error } = useGetUserDetailsQuery(userId);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setAdmin(userInfo.isAdmin);
    }
  }, [userInfo]);

  const [updateUserDetails, { isLoading: userDetailsUpdate }] =
    useUpdateUserDetailsMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUserDetails({
        id: userId,
        name,
        email,
        isAdmin: admin,
      });
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Row>
      <Col>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="isAdmin" className="my-2">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={admin}
              onChange={(e) => setAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default UserEditScreen;
