import { useState } from "react";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import { app } from "../Firebase/firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { signInFailed, signInStart, signInSuccess } from "../Redux/user/user.slice";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RootState } from "../Redux/Store";
import Modal from "./Modal.js";

type googleAuthUserType = {
  user: {
    displayName: string;
    photoURL: string;
    email: string;
  };
};

export default function OAuth() {
  const { isError } = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [googleAuthUser, setGoogleAuthUser] = useState<googleAuthUserType | null>({
    user: {
      displayName: "",
      photoURL: "",
      email: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(isError);

  const handleLoginWithGoogle = async () => {
    try {
      dispatch(signInStart());
      setIsModalOpen(prev => !prev);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      setGoogleAuthUser({
        user: {
          displayName: result.user.displayName || "",
          photoURL: result.user.photoURL || "",
          email: result.user.email || "",
        },
      });
      if (result) {
        console.log("Google authentication works");
      } else {
        console.log("Google authentication not works");
      }
    } catch (error) {
      dispatch(signInFailed(error));
      console.log(error);
    }
  };

  // const handleContinueAuthWithGoogle = async () => {
  //   try {
  //     const res = await fetch("/api/auth/google", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: googleAuthUser?.user?.displayName,
  //         profilePicture: googleAuthUser?.user?.photoURL,
  //         email: googleAuthUser?.user?.email,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(signInFailed(data.message));
  //       return;
  //     }
  //     dispatch(signInSuccess(data));

  //     navigate("/profile/account-details");
  //   } catch (error) {
  //     dispatch(signInFailed(error));
  //     console.log(error);
  //   }
  // };
  const handleCloseModal = () => {
    setIsModalOpen(prev => !prev);
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
      {isModalOpen && (
        <Modal
          closeModal={handleCloseModal}
          googleAuthUser={googleAuthUser}
        />
      )}
    </div>
  );
}
