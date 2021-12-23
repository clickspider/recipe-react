import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../contexts/AuthContext";

function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, loginWithEmailAndPassword } = useAuth();

  async function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    try {
      await loginWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      );
      console.log(user);
    } catch (error: any) {
      setError(error.message);
      console.warn(user);
    }
  }
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="formBasicEmail" className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          ref={emailRef}
          placeholder="Enter email"
          required
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required
        />
        <Form.Text className="text-muted">
          We'll never share your password with anyone else.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;
