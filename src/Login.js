import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import "./App.css";

const AUTHORIZE_MUTATION = gql`
  mutation Authorize($email: String!, $password: String!) {
    authorize(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: "",
  });

  const [login, { data, loading, error }] = useMutation(AUTHORIZE_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
      ...(formState.login ? {} : { name: formState.name }), // Add name only for signup
    },
    onCompleted: ({ authorize }) => {
      console.log("login", authorize);
      localStorage.setItem("token", authorize.token);
      navigate("/");
    },
  });

  return (
    <div className="App-header">
      <h4>{formState.login ? "Login" : "Sign Up"}</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}

        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>

      <div style={{ display: "flex", marginTop: "1rem" }}>
        <button
          style={{ marginRight: "1rem" }}
          onClick={formState.login ? login : login}
        >
          {formState.login ? "login" : "create account"}
        </button>
        <button
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login
            ? "need to create an account?"
            : "already have an account?"}
        </button>
      </div>
    </div>
  );
};

export default Login;
