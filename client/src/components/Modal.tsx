import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInFailed, signInSuccess } from "../Redux/user/user.slice";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

type propsType = {
  closeModal: () => void;
  googleAuthUser: {
    displayName: string | null;
    photoURL: string | null;
    email: string | null;
  };
};

type FinishGoogleAuthTypes = {
  username: string;
  password: string;
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Please create your username").min(1),
  password: yup.string().required("Create your password").min(8).max(16),
});

export default function Modal({ closeModal, googleAuthUser }: propsType) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(googleAuthUser, "In modal");
  const { values, errors, handleChange, handleSubmit } =
    useFormik<FinishGoogleAuthTypes>({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema,
      onSubmit: async (values: FinishGoogleAuthTypes) => {
        try {
          const res = await fetch("/api/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: googleAuthUser?.displayName || googleAuthUser?.email,
              profilePicture: googleAuthUser?.photoURL,
              email: googleAuthUser?.email || "",
              password: values.password,
              username: values.username,
            }),
          });
          const data = await res.json();
          if (data.success === false) {
            dispatch(signInFailed(data.message));
            return;
          }
          dispatch(signInSuccess(data));

          navigate("/profile/account-details");
        } catch (error) {
          dispatch(signInFailed(error));
          console.log(error);
        }
      },
    });

  console.log(errors);

  return (
    <div className="absolute right-1/2 bottom-36 w-[40rem]  bg-neutral-03 z-10 flex justify-center items-center flex-col gap-20">
      <h1 className="text-secondary-red text-heading-06 relative">
        Please create your username and password
      </h1>
      <div className="flex flex-col gap-8 w-80">
        <div className="relative">
          <input
            id="username"
            onChange={handleChange}
            value={values.username}
            type="text"
            placeholder="Username"
            className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
          />
          <label
            htmlFor="username"
            className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
          >
            Username
          </label>
        </div>
        <div className="relative">
          <input
            id="password"
            onChange={handleChange}
            value={values.password}
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
          <img
            src="./assets/eye.svg"
            className="text-primary w-6 z-10 absolute bottom-[5px] right-0"
            alt="eye"
          />
        </div>
        <button
          type="submit"
          onClick={e => handleSubmit()}
          className="text-secondary-red py-2 px-4 rounded-lg border-secondary-red border hover:bg-secondary-red hover:text-neutral-01 transition-colors mb-10"
        >
          Continue
        </button>
        <span
          onClick={closeModal}
          className="absolute top-1 right-0 mr-3 text-lg cursor-pointer"
        >
          X
        </span>
      </div>
    </div>
  );
}
