import { useDispatch } from "react-redux";
import {
  signOutStart,
  signOutFailed,
  signOutSuccess,
} from "../Redux/user/user.slice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const [colors, setColors] = useState([
    {
      name: "bg-primary",
      active: false,
    },
    {
      name: "bg-secondary-green",
      active: false,
    },
    {
      name: "bg-secondary-red",
      active: false,
    },
    {
      name: "bg-secondary-blue",
      active: false,
    },
    {
      name: "bg-secondary-orange",
      active: false,
    },
  ]);

  const [activeColors, setActiveColors] = useState<string[]>([]);

  const handleSetActiveColor = (ItemId: string) => {
    const updatedColors = colors.map((color) => {
      return {
        ...color,
        active: color.name === ItemId ? !color.active : color.active,
      };
    });

    const colorNames = updatedColors
      .filter((color) => color.active)
      .map((color) => color.name);

    setActiveColors(colorNames);

    setColors(updatedColors);
  };

  console.log(activeColors);

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
    <div className="flex flex-col max-w-sm justify-center gap-8 sm:max-w-lg mx-auto">
      <h1 className="text-heading-07 sm:text-heading-04">Dashboard</h1>
      <form className="flex flex-col gap-8">
        <div className="relative">
          <input
            id="title"
            type="text"
            placeholder="Username or Email"
            className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
          />
          <label
            htmlFor="title"
            className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
          >
            Title
          </label>
        </div>
        <div className="relative">
          <input
            id="description"
            type="text"
            placeholder="Description"
            className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
          />
          <label
            htmlFor="description"
            className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
          >
            Description
          </label>
        </div>
        <div className="relative">
          <input
            id="measurements"
            type="text"
            placeholder="Measurements"
            className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
          />
          <label
            htmlFor="measurements"
            className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
          >
            Measurements
          </label>
        </div>
        <div className="relative">
          <input
            id="price"
            type="text"
            placeholder="Price"
            className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
          />
          <label
            htmlFor="price"
            className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
          >
            Price
          </label>
        </div>
        <div className="relative">
          <input
            id="discount"
            type="text"
            placeholder="Discount"
            className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
          />
          <label
            htmlFor="discount"
            className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
          >
            Discount
          </label>
        </div>

        <h2 className="text-regular-03 text-neutral-04">
          Please choose color:{" "}
        </h2>
        <div className="flex gap-3">
          {colors.map((color) => (
            <div
              key={color.name}
              onClick={() => handleSetActiveColor(color.name)}
              className={`cursor-pointer rounded-lg w-10 h-10 ${color.name}`}
            ></div>
          ))}
        </div>
        <div className="flex gap-2 w-64 h-12  rounded-lg border-neutral-05 border px-3 py-1 ">
          {colors.map(
            (color) =>
              color.active && (
                <div
                  key={color.name}
                  className={`w-10 h-10 rounded-lg ${color.name}`}
                ></div>
              ),
          )}
        </div>
      </form>
      <button type="button" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}
