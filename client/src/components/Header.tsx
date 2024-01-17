import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { RootState } from "../Redux/Store";

const navItems = [
  {
    item: {
      id: 0,
      title: "Home",
      activityStatus: false,
      link: "/",
    },
  },
  {
    item: {
      id: 1,
      title: "Shop",
      activityStatus: false,
      link: "/shop",
    },
  },
  {
    item: {
      id: 2,
      title: "Product",
      activityStatus: false,
      link: "/product",
    },
  },
  {
    item: {
      id: 3,
      title: "Contact Us",
      activityStatus: false,
      link: "/contact-us",
    },
  },
];

export default function Header() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [items, setItems] = useState(navItems);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleBurgerMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const pathname = location.pathname;

    setItems((prevItems) =>
      prevItems.map((item) => ({
        item: {
          ...item.item,
          activityStatus: item.item.link === pathname,
        },
      })),
    );
  }, [location.pathname]);

  return (
    <header className="flex items-center max-w-sm justify-between sm:min-w-full  py-4 sm:px-40 relative mx-auto">
      <div className="relative flex gap-4 items-center ">
        <div
          onClick={() => handleBurgerMenu()}
          className={`sm:hidden w-[3px] h-6 bg-primary border rotate-90 rounded-lg before:w-[3px] before:h-6 before:bg-primary before:border  before:rounded-lg before:absolute before:-right-2 before:-top-[1px] after:w-[3px] after:h-6 after:bg-primary after:border  after:rounded-lg after:absolute after:-left-2 after:-top-[1px]  ${
            isOpen
              ? "bg-transparent border-none after:-rotate-45  before:rotate-45 before:right-0 after:left-0 before:transition-all before:duration-200 before:ease-linear after:transition-all after:duration-200 after:ease-linear"
              : "bg-primary border after:rotate-0  before:rotate-0 before:-right-2 after:-left-2 before:transition-all before:duration-200 before:ease-linear after:transition-all after:duration-200 after:ease-linear"
          }`}
        ></div>

        <Link
          to={"/"}
          className="text-regular-04 sm:text-regular-01 font-medium"
        >
          GG Commerce
        </Link>
      </div>

      {isOpen && (
        <nav
          className={`absolute left-10 top-20 border p-4 ${
            isOpen
              ? "animate-fade-right animate-once animate-duration-200 animate-delay-100 animate-ease-linear"
              : "block opacity-0 transition-opacity animate-fade-left animate-delay-100 animate-ease-linear animate-duration-200"
          } `}
        >
          <ul className="flex flex-col gap-8">
            {items.map((navItem) => (
              <Link
                to={navItem.item.link}
                key={navItem.item.title}
                className={`${
                  navItem.item.activityStatus
                    ? "text-primary"
                    : "text-neutral-04"
                } text-regular-06 font-medium`}
              >
                {navItem.item.title}
              </Link>
            ))}
            <div className="flex flex-col gap-6">
              <div className="block sm:hidden">
                <img
                  src="../assets/search02.svg"
                  alt="search icon"
                  className="w-5 h-5"
                />
              </div>
              <div className="block sm:hidden">
                <Link to={"/profile/account-details"}>
                  <img
                    src="../assets/user-circle.svg"
                    alt="user icon"
                    className="w-5 h-5"
                  />
                </Link>
              </div>
            </div>
          </ul>
        </nav>
      )}
      <nav className="hidden sm:flex">
        <ul className="flex gap-6">
          {items.map((navItem) => (
            <Link
              to={navItem.item.link}
              key={navItem.item.title}
              className={`${
                navItem.item.activityStatus ? "text-primary" : "text-neutral-04"
              } text-regular-06 font-medium`}
            >
              {navItem.item.title}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="flex gap-4">
        <div className="hidden sm:block">
          <img
            src="../assets/search02.svg"
            alt="search icon"
            className="w-5 h-5"
          />
        </div>
        <div className="hidden sm:block">
          {currentUser?.isAdmin ? (
            <Link to={"/dashboard"}>
              <CiUser className="w-5 h-5" />
            </Link>
          ) : (
            <Link to={"/profile/account-details"}>
              <img
                src="../assets/user-circle.svg"
                alt="user icon"
                className="w-5 h-5"
              />
            </Link>
          )}
        </div>
        <div className="flex gap-1">
          <img
            src="../assets/shoppingbag.svg"
            alt="shopping bag icon"
            className="w-5 h-5"
          />
          <div className="bg-primary rounded-3xl w-5 h-5 flex justify-center items-center text-center">
            <span className="text-neutral-01 font-bold text-[0.75rem]">1</span>
          </div>
        </div>
      </div>
    </header>
  );
}
