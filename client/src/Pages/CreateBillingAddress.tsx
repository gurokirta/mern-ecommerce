import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/Store";
import {
  creatingStart,
  creatingFailure,
  creatingSuccess,
} from "../Redux/address/address.slice";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object().shape({
  name: yup.string().required("Full name is required").min(1),
  phoneNumber: yup.string().required().min(1),
  address: yup.string().required().min(1),
});

type CreateAddressSchema = {
  name: string;
  phoneNumber: string;
  address: string;
};

export default function CreateBillingAddress() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.user);
  const { isError, isLoading, billingAddress } = useSelector(
    (state: RootState) => state.address
  );

  const { errors, values, handleChange, handleSubmit } =
    useFormik<CreateAddressSchema>({
      initialValues: {
        name: "",
        phoneNumber: "",
        address: "",
      },
      validationSchema,
      onSubmit: async (values: CreateAddressSchema) => {
        try {
          dispatch(creatingStart());
          const res = await fetch("/api/address/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: values.name,
              phoneNumber: values.phoneNumber,
              address: values.address,
              userRef: currentUser?._id,
            }),
          });
          const data = await res.json();
          if (data.success === false) {
            dispatch(creatingFailure(data.message));
            return;
          }
          dispatch(creatingSuccess(data));
          navigate("/profile/address");
        } catch (error) {
          dispatch(creatingFailure(error));
        }
      },
    });

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <input
          onChange={handleChange}
          value={values.name}
          id="name"
          type="text"
          className="border rounded-lg"
          placeholder="Enter your name here"
        />
        <input
          onChange={handleChange}
          value={values.address}
          id="address"
          type="text"
          className="border rounded-lg"
          placeholder="Enter your address here"
        />
        <input
          onChange={handleChange}
          value={values.phoneNumber}
          id="phoneNumber"
          type="text"
          className="border rounded-lg"
          placeholder="Enter your phone number here"
        />

        <button
          type="submit"
          className="bg-primary text-neutral-01 px-4 py-2 border rounded-lg"
        >
          Create
        </button>
      </form>
    </>
  );
}
