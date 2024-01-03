import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RootState } from "../Redux/Store";

export default function Address() {
  const [billingInfo, setBillingInfo] = useState<BillingAddress[]>([]);
  const [isEditable, setIsEditable] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  const handleEditMode = () => {
    setIsEditable(prev => !prev);
  };

  useEffect(() => {
    const fetchBillingAddresses = async () => {
      try {
        const res = await fetch(`/api/user/getaddress/${currentUser?._id}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setBillingInfo(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (location.pathname === "/profile/address") {
      console.log(true);
      fetchBillingAddresses();
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="">
        <h1 className="text-regular-07 font-semibold sm:text-regular-03">Address</h1>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:grid sm:grid-cols-2 sm:max-w-4xl">
        {billingInfo.map(billingAddress => (
          <div className="border border-neutral-04 p-4 rounded-lg flex flex-col gap-2">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-regular-07 font-semibold">Billing Address</h2>
              <span
                onClick={handleEditMode}
                className="flex items-center gap-1 text-neutral-04 text-regular-07 font-semibold cursor-pointer"
              >
                <CiEdit className="w-4 h-4" />
                Edit
              </span>
            </div>

            <div
              className="flex flex-col gap-1"
              key={billingAddress._id}
            >
              <p className="text-regular-06">{billingAddress?.name}</p>
              <p className="text-regular-06">{billingAddress?.phoneNumber}</p>
              <p className="text-regular-06">{billingAddress?.address}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/profile/address/create"
        className="w-full"
      >
        <button className="bg-primary text-neutral-01 text-regular-06 px-3 py-2 border rounded-lg w-full">
          Create Billing address
        </button>
      </Link>
    </div>
  );
}
