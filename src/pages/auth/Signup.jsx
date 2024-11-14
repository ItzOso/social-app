import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signup } from "../../firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

// Define validation schema using Yup
const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const signUpErrorMessages = {
  "auth/email-already-in-use": "Email is already in use. Try signing in.",
  "auth/invalid-email": "Invalid email format.",
  "auth/weak-password": "Password too weak. Use at least 6 characters.",
  "auth/operation-not-allowed": "Sign-up is disabled. Contact support.",
  "auth/network-request-failed": "Network error. Check your connection.",
  "auth/internal-error": "Internal error. Try again later.",
  "auth/too-many-requests": "Too many attempts. Try again later.",
};

const handleSignup = async (values, { setFieldError, setStatus }) => {
  const q = query(
    collection(db, "users"),
    where("username", "==", values.username)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    try {
      await signup(values.username, values.email, values.password);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage =
        signUpErrorMessages[errorCode] || "An unexpected error occured";
      setStatus(errorMessage);
    }
  } else {
    setFieldError("username", "Username is taken");
  }
};

function Signup() {
  return (
    <div className="flex w-screen h-screen items-center justify-center flex-col">
      <h2 className="text-4xl mb-2">Create an Account</h2>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
      >
        {({ isSubmitting, status }) => (
          <Form className="flex flex-col bg-secondary rounded-md p-6 gap-4 w-[450px]">
            <div className="flex flex-col space-y-2">
              <label htmlFor="username">Username</label>
              <Field
                name="username"
                placeholder="Enter username"
                className="p-3 rounded-md"
                type="text"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                placeholder="Enter email"
                className="p-3 rounded-md"
                type="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                placeholder="Enter password"
                className="p-3 rounded-md"
                type="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {status && <p className="text-red-500">{status}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary rounded-md text-xl px-8 py-3 text-white hover:brightness-95"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
      <p className="mt-2">
        Already have an account?{" "}
        <Link to="/signin" className="text-primary">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default Signup;
