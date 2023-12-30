import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutFailed,
  signOutStart,
  signOutSuccess,
} from "../Redux/user/user.slice";
import { RootState } from "../Redux/Store";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase/firebase";
import { PiCameraLight } from "react-icons/pi";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import Account from "../components/Account";
import Wishlist from "../components/Wishlist";
import Orders from "../components/Orders";
import Address from "../components/Address";

const profileInfo = [
  {
    item: {
      title: "Account",
      path: "/profile/account-details",
      activeStatus: false,
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
  const { isError, isLoading, currentUser } = useSelector(
    (state: RootState) => state.user
  );
  const [profileItem, setProfileItem] = useState(profileInfo);
  const [dropDownTitle, setDropDownTitle] = useState("Account");
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<undefined | File | null>(undefined);
  const [profilePic, setProfilePic] = useState<string>("");

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileRef = useRef<HTMLInputElement>(null);

  const pathname = location.pathname;

  const handleDropDownName = (val: string) => {
    const paths = profileItem.map(item => item.item.path);
    for (let i = 0; i < paths.length; i++) {
      const element = paths[i];
      if (element === pathname) {
        setDropDownTitle(val);
      }
    }
  };

  const handleDropDown = () => {
    setIsOpen(prev => !prev);
  };

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

  const handleUploadImage = (file: any) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime().toString() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(Math.round(progress));
      },
      error => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setProfilePic(downloadURL);
        });
      }
    );
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.item(0);
    const selectedFile = files;
    setFile(selectedFile);
  };

  useEffect(() => {
    if (file) {
      handleUploadImage(file);
    }
  }, [file]);

  let componentToRender: React.ReactNode;
  switch (pathname) {
    case "/profile/account-details":
      componentToRender = <Account profilePic={profilePic} />;
      break;
    case "/profile/address":
      componentToRender = <Address />;
      break;
    case "/profile/wishlist":
      componentToRender = <Wishlist />;
      break;
    case "/profile/orders":
      componentToRender = <Orders />;
      break;
    default:
      componentToRender = <div>Page not found</div>;
  }

  return (
    <main className="w-96 sm:w-[100vw] flex flex-col sm:justify-center items-center mt-20 mx-auto">
      <div className="flex flex-col gap-10">
        <Link
          to={"/"}
          className="flex items-center gap-1 sm:hidden"
        >
          <FaChevronLeft className="text-neutral-04 text-regular-07" />
          <h2 className="text-neutral-04 text-regular-06">Back</h2>
        </Link>

        <h1 className="sm:text-heading-03 text-heading-04">My Account</h1>
      </div>
      <section className="flex sm:items-start sm:flex-row flex-col mt-20 gap-10">
        <aside className="sm:h-[30rem] w-[17.5rem]  py-10 px-4 bg-neutral-02  rounded-lg flex flex-col">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative">
              <img
                src={currentUser?.profilePicture || profilePic}
                alt="profile pic"
                className="w-20 h-20 rounded-full object-cover"
                onClick={() => fileRef.current?.click()}
              />
              <PiCameraLight className="absolute  -bottom-1 -right-1 text-neutral-01 w-9 h-9 p-2 border-2 rounded-full bg-primary " />
            </div>
            <input
              type="file"
              ref={fileRef}
              onChange={e => handleChangeImage(e)}
              accept="image/*"
              hidden
            />
            <h2 className="text-regular-03">{currentUser?.displayName}</h2>
          </div>
          <div className="relative flex flex-col border-2 rounded-lg border-neutral-04 py-2 pl-4 pr-2 bg-neutral-01 sm:hidden">
            <button
              onClick={() => handleDropDown()}
              className="flex items-center justify-between text-neutral-07 text-regular-06 font-semibold "
            >
              {dropDownTitle}
              {isOpen ? (
                <FaChevronDown className="rotate-180 duration-300 transition-all ease-in text-neutral-04 h-3 w-3 " />
              ) : (
                <FaChevronDown className="transition-all duration-300 ease-in text-neutral-04 h-3 w-3" />
              )}
            </button>
            {isOpen && (
              <div
                className={`absolute mt-2  top-12 w-full left-0 bg-neutral-02 ${
                  isOpen &&
                  "animate-fade-down animate-once animate-duration-[1500ms] animate-delay-100 animate-ease-out animate-normal"
                }`}
              >
                <ul className="overflow-hidden flex flex-col justify-center border-2 border-neutral-04 rounded-lg">
                  {profileItem.map(item => (
                    <Link
                      to={`${item.item.path}`}
                      key={item.item.title}
                      onClick={() => handleDropDownName(item.item.title)}
                      className={`${
                        item.item.path === location.pathname ? " text-primary " : ""
                      } p-2 text-regular-06 font-semibold text-neutral-04`}
                    >
                      <li>{item.item.title}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex-col justify-center gap-3 hidden sm:flex">
            {profileItem.map(item => (
              <Link
                to={`${item.item.path}`}
                key={item.item.title}
                className={`${
                  item.item.path === location.pathname
                    ? "border-b text-primary border-b-primary"
                    : "border-none"
                } py-2 text-regular-04 font-semibold text-neutral-04`}
              >
                {item.item.title}
              </Link>
            ))}

            <div className="">
              <Link
                to={"/"}
                onClick={handleSignOut}
                className="py-3 text-regular-04 font-semibold text-neutral-04"
              >
                Log out
              </Link>
            </div>
          </div>
        </aside>
        <article className="sm:mx-20">{componentToRender}</article>
      </section>
    </main>
  );
}
