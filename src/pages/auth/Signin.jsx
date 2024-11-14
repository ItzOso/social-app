import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signin, signup } from "../../firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

// Define validation schema using Yup
const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const signinErrorMessages = {
  "auth/user-not-found": "No account found. Please sign up.",
  "auth/invalid-credential": "Email or password is incorrect.",
  "auth/user-disabled": "Account disabled. Contact support.",
  "auth/too-many-requests": "Too many login attempts. Try again later.",
  "auth/network-request-failed": "Network error. Check your connection.",
  "auth/internal-error": "Internal error. Try again later.",
};

const handleSignin = async (values, { setStatus }) => {
  try {
    await signin(values.email, values.password);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage =
      signinErrorMessages[errorCode] || "An unexpected error occured";
    setStatus(errorMessage);
  }
};

function Signin() {
  return (
    <div className="flex w-screen h-screen items-center justify-center flex-col">
      <h2 className="text-4xl mb-2">Welcome Back</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SigninSchema}
        onSubmit={handleSignin}
      >
        {({ isSubmitting, status }) => (
          <Form className="flex flex-col bg-secondary rounded-md p-6 gap-4 w-[450px]">
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
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </Form>
        )}
      </Formik>
      <p className="mt-2">
        Dont have an account?{" "}
        <Link to="/signup" className="text-primary">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Signin;
