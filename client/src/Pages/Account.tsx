import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import {
  updateFailed,
  updateStart,
  updateSuccess,
} from "../Redux/user/user.slice";

type PropsTypes = {
  profilePic: string;
};

const validationSchema = yup.object().shape({
  firstName: yup.string().min(3, "Must be at least 3 characters"),
  secondName: yup.string().min(2, "Must be at least 2 characters"),
  displayName: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .max(15, "Max 15 characters only"),
  email: yup.string().email("Invalid email").min(1),
  oldPassword: yup.string().required().min(8, "at least 8 characters"),
  newPassword: yup.string().required().min(8, "at least 8 characters"),
  newPassword2: yup
    .string()
    .oneOf([yup.ref("newPassword"), ""], "Passwords must match"),
});

export default function Account({ profilePic }: PropsTypes) {
  const { isLoading, isError, currentUser } = useSelector(
    (state: RootState) => state.user,
  );
  console.log(profilePic);
  const dispatch = useDispatch();
  const { values, errors, handleChange, handleSubmit } = useFormik<UserSchema>({
    initialValues: {
      _id: 0,
      firstName: "",
      secondName: "",
      displayName: "",
      email: currentUser?.email,
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
      profilePicture: "",
      isAdmin: false,
    },
    validationSchema,
    onSubmit: async (values: UserSchema) => {
      try {
        dispatch(updateStart());
        const res = await fetch(`/api/user/update/${currentUser?._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, profilePicture: profilePic }),
        });
        const data = await res.json();

        if (data.success === false) {
          dispatch(updateFailed(data.message));
          return;
        }
        dispatch(updateSuccess(data));
      } catch (error) {
        dispatch(updateFailed(error));
      }
    },
  });

  return (
    <div className="sm:max-w-4xl">
      <h1 className="text-regular-03 font-semibold mb-6 mt-10 sm:mt-0">
        Account details
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col ">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-3 ">
            <label className="text-neutral-04  font-bold uppercase text-regular-06">
              first name *
            </label>
            <input
              value={values.firstName}
              id="firstName"
              onChange={handleChange}
              type="text"
              placeholder="First name"
              className="border rounded-lg  h-10 px-4 text-regular-05 font-normal  sm:w-full"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-neutral-04  font-bold uppercase text-regular-06">
              last name *
            </label>
            <input
              value={values.secondName}
              id="secondName"
              onChange={handleChange}
              type="text"
              placeholder="Last name"
              className="border rounded-lg h-10 px-4 text-regular-05 font-normal   sm:w-full"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-neutral-04  font-bold uppercase text-regular-06">
              email *
            </label>
            <input
              value={values.email}
              id="email"
              onChange={handleChange}
              type="text"
              placeholder="Email"
              className="border rounded-lg h-10 px-4 text-regular-05 font-normal  sm:w-full"
            />
          </div>
          <div className="flex flex-col gap-3 mb-6">
            <label className="text-neutral-04  font-bold uppercase text-regular-06">
              display name*
            </label>
            <input
              value={values.displayName}
              id="displayName"
              onChange={handleChange}
              type="text"
              placeholder="Display name"
              className="border rounded-lg h-10 px-4 text-regular-05 font-normal  sm:w-full"
            />
            <span className="text-neutral-04  font-normal text-regular-07">
              This will be how your name will be displayed in the account
              section and in reviews
            </span>
          </div>
        </div>
        <section className="flex flex-col gap-6">
          <h1 className="text-regular-03 font-semibold">Password</h1>
          <div className="flex flex-col gap-3">
            <label className="text-neutral-04  font-bold uppercase text-regular-06">
              old password *
            </label>
            <input
              value={values.oldPassword}
              id="oldPassword"
              onChange={handleChange}
              type="text"
              placeholder="Old password"
              className="border rounded-lg h-10 px-4 text-regular-05 font-normal  sm:w-full"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-neutral-04  font-bold uppercase text-regular-06">
              new password *
            </label>
            <input
              value={values.newPassword}
              id="newPassword"
              onChange={handleChange}
              type="text"
              placeholder="New password"
              className="border rounded-lg h-10 px-4 text-regular-05 font-normal  sm:w-full"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-neutral-04  font-bold uppercase text-regular-06">
              repeat password *
            </label>
            <input
              value={values.newPassword2}
              id="newPassword2"
              onChange={handleChange}
              type="text"
              placeholder="Repeat password"
              className="border rounded-lg h-10 px-4 text-regular-05 font-normal  sm:w-full"
            />
          </div>
        </section>
        <div className="">
          <button
            type="submit"
            className="px-6 py-3 text-neutral-01 bg-primary mt-6 rounded-lg"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
