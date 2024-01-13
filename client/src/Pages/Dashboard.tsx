import { useDispatch } from "react-redux";
import {
  signOutStart,
  signOutFailed,
  signOutSuccess,
} from "../Redux/user/user.slice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailed(data.message));
        return;
      }
      dispatch(signOutSuccess());
      navigate("/sign-in");
    } catch (error) {
      dispatch(signOutFailed(error));
    }
  };
  return (
    <div>
      <form>
        <h1 className="text-heading-04">Dashboard</h1>
      </form>
      <button
        type="button"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
}
