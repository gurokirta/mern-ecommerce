import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import OAuth from "../components/oauth";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .max(18, "Please enter max 18 characters only")
    .min(3, "Please enter min 3 characters"),
  username: yup
    .string()
    .required("Username is required")
    .min(4, "Please enter min 4 characters")
    .max(18, "Please enter max 18 characters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .required("Password is required")
    .max(18, "Please enter max 18 character")
    .min(8, "Please enter min 8 characters"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit } =
    useFormik<UserRegisterSchema>({
      initialValues: {
        name: "",
        username: "",
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: async (values: UserRegisterSchema) => {
        try {
          const res = await fetch("/api/auth/sign-up", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          const data = await res.json();
          if (data.success === false) {
            console.log(data.message);
            return;
          }
          navigate("/sign-in");
        } catch (error) {
          console.log(errors);
        }
      },
    });

  const [error, setError] = useState(true);
  return (
    <div className="max-w-xs sm:max-w-full flex flex-col gap-10 sm:flex-row mx-auto">
      <div className="image sm:w-[46rem] sm:h-screen flex justify-center pt-8 ">
        <Link
          to={"/"}
          className="text-center text-2xl font-medium h-fit"
        >
          GG Commerce
        </Link>
      </div>
      <div className="flex flex-col gap-8 sm:w-[28rem] justify-center w-[368px]">
        <div className="flex flex-col gap-6">
          <h1 className="text-heading-04">Sign Up</h1>
          <p className="text-neutral-04 text-regular-05 ">
            Already have an account ?{" "}
            <Link
              className="text-secondary-green"
              to={"/sign-in"}
            >
              Sing In
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          <div className="relative">
            <input
              value={values.name}
              name="name"
              onChange={handleChange}
              id="name"
              type="text"
              placeholder="Enter your name"
              className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
            />
            <label
              htmlFor="name"
              className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
            >
              Enter your name
            </label>
            {values.name.length > 0 && errors.name ? (
              <p className="text-secondary-red">{errors.name}</p>
            ) : (
              ""
            )}
          </div>
          <div className="relative">
            <input
              value={values.username}
              onChange={handleChange}
              name="username"
              id="username"
              type="text"
              placeholder="Enter your username"
              className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
            />
            <label
              htmlFor="username"
              className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
            >
              Enter your username
            </label>
            {values.username.length > 0 && errors.username ? (
              <p className="text-secondary-red">{errors.username}</p>
            ) : (
              ""
            )}
          </div>
          <div className="relative">
            <input
              value={values.email}
              onChange={handleChange}
              name="email"
              id="email"
              type="text"
              placeholder="Enter your Email Address"
              className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
            >
              Enter your Email Address
            </label>
            {values.email.length > 0 && errors.email ? (
              <p className="text-secondary-red">{errors.email}</p>
            ) : (
              ""
            )}
          </div>
          <div className="relative">
            <input
              value={values.password}
              onChange={handleChange}
              name="password"
              id="password"
              type="text"
              placeholder="Password"
              className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
            >
              Password
            </label>
            {values.password.length > 0 && errors.password ? (
              <p className="text-secondary-red">{errors.password}</p>
            ) : (
              ""
            )}
            <img
              src="./assets/eye.svg"
              className="text-primary w-6 z-10 absolute bottom-[5px] right-0"
              alt="eye"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className=""
              />
              <p className="text-neutral-04">
                I agree with{" "}
                <span className="font-semibold text-primary">Privacy Policy </span>
                and <span className="font-semibold text-primary">Terms of Use</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between text-center gap-4">
            <button
              type="submit"
              className="bg-primary rounded-xl py-2 text-neutral-01 text-btn-s w-full"
            >
              Sign Up
            </button>
            <OAuth />
          </div>
        </form>
      </div>
    </div>
  );
}
