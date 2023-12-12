import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  const [items, setItems] = useState(navItems);
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;

    setItems(prevItems =>
      prevItems.map(item => ({
        item: {
          ...item.item,
          activityStatus: item.item.link === pathname,
        },
      }))
    );
  }, [location.pathname]);

  return (
    <header className="flex items-center justify-between max-w-xs sm:min-w-full px-40 py-4">
      <div className="">
        <h1 className="text-regular-01 font-medium">GG Commerce</h1>
      </div>
      <nav className="flex justify-between">
        <ul className="flex gap-6">
          {items.map(navItem => (
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
        <div>
          <img
            src="../assets/search02.svg"
            alt="search icon"
            className="w-5 h-5"
          />
        </div>
        <div>
          <Link to={"/profile"}>
            <img
              src="../assets/user-circle.svg"
              alt="user icon"
              className="w-5 h-5"
            />
          </Link>
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
