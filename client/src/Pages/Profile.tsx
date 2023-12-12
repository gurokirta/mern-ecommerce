import { PiCameraLight } from "react-icons/pi";
import { Link } from "react-router-dom";

const profileInfo = [
  {
    item: {
      title: "Account",
      path: "/profile/account-details",
      activeStatus: true,
    },
  },
  {
    item: {
      title: "Address",
      path: "/profile/address",
      activeStatus: false,
    },
  },
  {
    item: {
      title: "Orders",
      path: "/profile/orders",
      activeStatus: false,
    },
  },
  {
    item: {
      title: "Wishlist",
      path: "/profile/wishlist",
      activeStatus: false,
    },
  },
];

export default function Profile() {
  return (
    <main className="flex flex-col justify-center items-center mt-20">
      <div className="">
        <h1 className="text-heading-03">My Account</h1>
      </div>
      <section className="flex mt-20">
        <aside className="w-[16rem] h-[30rem] py-10 px-4 bg-neutral-02 rounded-lg flex flex-col">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative ">
              <img
                src=""
                alt="profile pic"
                className="w-20 h-20 rounded-full bg-primary"
              />
              <PiCameraLight className="absolute  -bottom-1 -right-1 text-neutral-01 w-9 h-9 p-2 border-2 rounded-full bg-primary " />
            </div>
            <h2 className="text-regular-03">Name</h2>
          </div>
          <div className="flex flex-col gap-3">
            {profileInfo.map(item => (
              <Link
                to={`${item.item.path}`}
                key={item.item.title}
                className={`${
                  item.item.activeStatus
                    ? "border-b text-primary border-b-primary"
                    : "border-0"
                } py-2 text-regular-04 font-semibold text-neutral-04`}
              >
                {item.item.title}
              </Link>
            ))}
            <div className="">
              <Link
                to={"/"}
                className="py-3 text-regular-04 font-semibold text-neutral-04"
              >
                Log out
              </Link>
            </div>
          </div>
        </aside>
        <article className="mx-20">
          <h1 className="text-regular-03 font-semibold mb-6">Account details</h1>
          <form
            action=""
            className="flex flex-col w-[44rem]"
          >
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-3 ">
                <label className="text-neutral-04  font-bold uppercase text-regular-06">
                  first name *
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  className="border rounded-lg h-10 px-4 text-regular-05 font-normal"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-neutral-04  font-bold uppercase text-regular-06">
                  last name *
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="border rounded-lg h-10 px-4 text-regular-05 font-normal"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-neutral-04  font-bold uppercase text-regular-06">
                  email *
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  className="border rounded-lg h-10 px-4 text-regular-05 font-normal"
                />
              </div>
              <div className="flex flex-col gap-3 mb-6">
                <label className="text-neutral-04  font-bold uppercase text-regular-06">
                  display name*
                </label>
                <input
                  type="text"
                  placeholder="Display name"
                  className="border rounded-lg h-10 px-4 text-regular-05 font-normal"
                />
                <span className="text-neutral-04  font-normal text-regular-07">
                  This will be how your name will be displayed in the account section
                  and in reviews
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
                  type="text"
                  placeholder="Old password"
                  className="border rounded-lg h-10 px-4 text-regular-05 font-normal"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-neutral-04  font-bold uppercase text-regular-06">
                  new password *
                </label>
                <input
                  type="text"
                  placeholder="New password"
                  className="border rounded-lg h-10 px-4 text-regular-05 font-normal"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-neutral-04  font-bold uppercase text-regular-06">
                  repeat password *
                </label>
                <input
                  type="text"
                  placeholder="Repeat password"
                  className="border rounded-lg h-10 px-4 text-regular-05 font-normal"
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
        </article>
      </section>
    </main>
  );
}
