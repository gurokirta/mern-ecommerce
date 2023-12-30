import { useState } from "react";
import { CiEdit } from "react-icons/ci";

export default function Address() {
  const [isEditable, setIsEditable] = useState(false);

  const handleEditMode = () => {
    setIsEditable(prev => !prev);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <h1 className="text-regular-07 font-semibold">Address</h1>
      </div>
      <div className="flex flex-col gap-6">
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
          {!isEditable ? (
            <div className="flex flex-col gap-1">
              <p className="text-regular-06">Name</p>
              <p className="text-regular-06">Number</p>
              <p className="text-regular-06">Address</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <input
                className="text-regular-06"
                placeholder="Change"
              />
              <input
                className="text-regular-06"
                placeholder="Change"
              />
              <input
                className="text-regular-06"
                placeholder="Change"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
