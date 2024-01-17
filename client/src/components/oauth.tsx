import { useState } from "react";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import { app } from "../Firebase/firebase.js";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailed,
  signInStart,
  signInSuccess,
} from "../Redux/user/user.slice";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RootState } from "../Redux/Store";
import Modal from "./Modal.js";

type googleAuthUserType = {
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
};

export default function OAuth() {
  const { isError } = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [googleAuthUser, setGoogleAuthUser] = useState<googleAuthUserType>({
    displayName: "",
    photoURL: "",
    email: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(googleAuthUser);

  const handleLoginWithGoogle = async () => {
    try {
      dispatch(signInStart());
      setIsModalOpen((prev) => !prev);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result.user.email);
      setGoogleAuthUser({
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        email: result.user.email,
      });
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result?.user?.displayName,
          profilePicture: result?.user?.photoURL,
          email: result?.user?.email,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailed(data.message));
        return;
      }
      console.log(result.user);
      if (isError) {
        console.log(isError);

        setIsModalOpen((prev) => !prev);
        console.log(googleAuthUser);

        return;
      }
      console.log(googleAuthUser);
      dispatch(signInSuccess(data));
      navigate("/profile/account-details");
    } catch (error) {
      dispatch(signInFailed(error));
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={handleLoginWithGoogle}
        className="bg-secondary-red rounded-xl py-3  text-btn-s w-full flex items-center justify-center text-center"
      >
        <FaGoogle className="text-neutral-01" />
      </button>
      {isError && isModalOpen && (
        <Modal closeModal={handleCloseModal} googleAuthUser={googleAuthUser} />
      )}
    </div>
  );
}
