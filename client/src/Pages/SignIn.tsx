import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../Redux/Store";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { signInFailed, signInStart, signInSuccess } from "../Redux/user/user.slice";

const validationSchema = yup.object().shape({
  usernameOrEmail: yup
    .string()
    .required("Please enter your email or username")
    .min(1),
  password: yup.string().required("please enter your password").min(1),
});

export default function SignIn() {
  const { isError } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit } = useFormik<UserLoginSchema>({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values: UserLoginSchema) => {
      try {
        dispatch(signInStart());
        const res = await fetch("/api/auth/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await res.json();

        if (data.success === false) {
          dispatch(signInFailed(data.message));
          return;
        }
        dispatch(signInSuccess(data));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

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
          <h1 className="text-heading-04">Sign In</h1>
          <p className="text-neutral-04 text-regular-05 ">
            Don't have an account ?{" "}
            <Link
              className="text-secondary-green"
              to={"/sign-up"}
            >
              Sign up
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          <div className="relative">
            <input
              id="usernameOrEmail"
              type="text"
              onChange={handleChange}
              value={values.usernameOrEmail}
              placeholder="Username or Email"
              className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
            />
            <label
              htmlFor="usernameOrEmail"
              className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
            >
              Username or Email
            </label>
          </div>
          <div className="relative">
            <input
              onChange={handleChange}
              value={values.password}
              id="password"
              type="text"
              placeholder="Password"
              className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
            >
              Enter your Password
            </label>
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
              <p className="text-neutral-04">Remember me</p>
            </div>
            <Link
              to={"/sign-in"}
              className="text-regular-05"
            >
              Forgot password ?
            </Link>
          </div>
          <button
            type="submit"
            className="bg-primary rounded-xl py-2 text-neutral-01 text-btn-s mb-10"
          >
            Sign In
          </button>
        </form>
        {isError ? <p className="text-secondary-red">{isError}</p> : ""}
      </div>
    </div>
  );
}
