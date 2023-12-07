import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="max-w-xs sm:max-w-5xl flex flex-col gap-10 sm:flex-row mx-auto">
      <div className="image sm:w-[536px] sm:h-screen flex justify-center pt-8 text-center text-2xl font-medium">
        <h2>GG Commerce</h2>
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
        <div className="flex flex-col gap-8 relative ">
          <input
            type="text"
            placeholder="Enter your username or email address"
            className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05"
          />

          <input
            type="text"
            placeholder="Password"
            className="border-b border-b-neutral-04 pb-2 focus:outline-none text-regular-05"
          />
          <img
            src="./assets/eye.svg"
            className="text-primary w-6 z-10 absolute bottom-[62px] right-0"
            alt="eye"
          />

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
        </div>
        <button className="bg-primary rounded-xl py-2 text-neutral-01 text-btn-s mb-10">
          Sign In
        </button>
      </div>
    </div>
  );
}
