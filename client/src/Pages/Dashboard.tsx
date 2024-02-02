import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutStart,
  signOutFailed,
  signOutSuccess,
} from "../Redux/user/user.slice";
import {
  useCreateProductMutation,
  productApi,
} from "../Redux/services/fetchData";
import { useNavigate } from "react-router-dom";
import { app } from "../Firebase/firebase";
import { RootState } from "../Redux/Store";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

export default function Dashboard() {
  const [productApi, { isLoading, isError }] = useCreateProductMutation();
  const fileRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    measurements: "",
    price: 0,
    discountedPrice: 0,
    pictures: [],
    colors: [],
    category: "",
    quantity: 0,
    offer: false,
    userRef: currentUser?._id,
  });

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
  const [image, setImage] = useState<File[]>([]);

  console.log(product);
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

    setProduct((prev) => ({
      ...prev,
      colors: colorNames,
    }));

    setColors(updatedColors);
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

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages: File[] = Array.from(e.target.files);

      setImage(selectedImages);
    }
  };

  const handleStorageImage = async (file: any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl: any) => {
            resolve(downloadUrl);
          });
        },
      );
    });
  };
  const handleUploadImage = () => {
    if (image.length > 0 && image.length + product.pictures.length < 7) {
      const promises = [];

      for (let i = 0; i < image.length; i++) {
        promises.push(handleStorageImage(image[i]));
      }

      Promise.all(promises)
        .then((urls: any) => {
          setProduct((prev) => ({
            ...prev,
            pictures: product.pictures.concat(urls),
          }));
        })
        .catch((error) => console.log(error));
    } else {
      console.log("You can upload only 6 pics or less");
    }
  };

  const handleChangeValue = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.id === "offer" && e.target.type === "checkbox") {
      setProduct((prev) => ({
        ...prev,
        discountedPrice: 0,
        // @ts-ignore
        [e.target.id]: e.target.checked,
      }));
    }
    if (e.target.id === "discountedPrice") {
      setProduct((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
    if (e.target.id === "description") {
      setProduct((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
    if (e.target.id === "quantity") {
      setProduct((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
    if (e.target.id === "title") {
      setProduct((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
    if (e.target.id === "measurements") {
      setProduct((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
    if (e.target.id === "category") {
      setProduct((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
    if (e.target.id === "price") {
      setProduct((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const handleSubmitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await productApi(product);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col max-w-sm justify-center gap-8 sm:max-w-lg mx-auto">
      <h1 className="text-heading-07 sm:text-heading-04">Dashboard</h1>
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-8">
        <div>
          <input
            type="file"
            id="pictures"
            multiple
            ref={fileRef}
            accept="image/*"
            hidden
            onChange={(e) => handleSetImage(e)}
          />

          <div
            onClick={() => fileRef.current?.click()}
            className="w-10 h-10 bg-primary"
          >
            {" "}
          </div>
          <div className="flex overflow-x-auto">
            {product.pictures.map((url) => (
              <img src={url} key={url} className="w-20 h-20 object-contain " />
            ))}
          </div>

          <button onClick={handleUploadImage} type="button">
            Upload
          </button>
        </div>
        <div className="relative">
          <input
            id="title"
            type="text"
            value={product.title}
            onChange={(e) => handleChangeValue(e)}
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
          <textarea
            id="description"
            placeholder="Description"
            value={product.description}
            onChange={(e) => handleChangeValue(e)}
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
            value={product.measurements}
            onChange={(e) => handleChangeValue(e)}
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
            id="category"
            type="text"
            placeholder="category"
            value={product.category}
            onChange={(e) => handleChangeValue(e)}
            className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
          />
          <label
            htmlFor="category"
            className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
          >
            category
          </label>
        </div>
        <div className="relative">
          <input
            id="price"
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) => handleChangeValue(e)}
            className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
          />
          <label
            htmlFor="price"
            className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
          >
            Price
          </label>
        </div>

        {product.offer === true && (
          <div className="relative flex gap-2 flex-col">
            <input
              id="discountedPrice"
              type="number"
              value={product.discountedPrice}
              onChange={(e) => handleChangeValue(e)}
              placeholder="Discount"
              className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
            />
            <label
              htmlFor="discountedPrice"
              className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
            >
              Discount
            </label>
            {(product.discountedPrice > product.price && (
              <span className="border rounded-lg text-secondary-red px-2 py-1 mt-2">
                Discount must be lower then price
              </span>
            )) ||
              (product.discountedPrice === 0 && (
                <span className="border rounded-lg text-secondary-red px-2 py-1 mt-2">
                  Discount must be higher then 0
                </span>
              ))}
          </div>
        )}
        <div className="flex gap-3 items-center">
          <span className="text-regular-05 text-neutral-04">Offer: </span>

          <input
            type="checkbox"
            name="offer"
            id="offer"
            checked={product.offer}
            onChange={(e) => handleChangeValue(e)}
          />
        </div>
        <div className="relative">
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={product.quantity}
            onChange={(e) => handleChangeValue(e)}
            className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
          />
          <label
            htmlFor="quantity"
            className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
          >
            Quantity
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
        <button
          type="submit"
          className="border bg-primary text-neutral-03 py-2 px-4 rounded-lg"
        >
          Create
        </button>
      </form>
      <button
        type="button"
        className="border bg-primary text-neutral-03 py-2 px-4 rounded-lg"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
}
