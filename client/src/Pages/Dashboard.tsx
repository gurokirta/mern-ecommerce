import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  signOutStart,
  signOutFailed,
  signOutSuccess,
} from "../Redux/user/user.slice";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { app } from "../Firebase/firebase";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const validationSchema = yup.object().shape({
  title: yup.string().required().min(3, "min 3 char"),
  description: yup.string().required(),
  measurements: yup.string().required(),
  price: yup.number().required(),
  discountedPrice: yup.number(),
  category: yup.string().required(),
  quantity: yup.number().required(),
  offer: yup.boolean(),
});

export default function Dashboard() {
  const { errors, values, handleSubmit, handleChange } = useFormik<Product>({
    initialValues: {
      title: "",
      description: "",
      measurements: "",
      price: 0,
      imageURLs: [],
      discountedPrice: 0,
      category: "",
      quantity: 0,
      offer: false,
    },
    validationSchema,
    onSubmit: async (values: Product) => {
      if (values.offer === false) {
        values.discountedPrice = 0;
      }

      try {
      } catch (error) {}
    },
  });

  const [product, setProduct] = useState({
    title: "",
    description: "",
    measurements: "",
    price: 0,
    discountedPrice: 0,
    imageURLs: [],
    category: "",
    quantity: 0,
    offer: false,
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
  const [activeColors, setActiveColors] = useState<string[]>([]);
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

    setActiveColors(colorNames);

    setColors(updatedColors);
  };
  const fileRef = useRef<HTMLInputElement>(null);

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

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages: File[] = Array.from(e.target.files);

      console.log(selectedImages);

      setImage(selectedImages);
    }
  };

  const handleStorageImage = async (file: any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      console.log(fileName);
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
    if (image.length > 0 && image.length + product.imageURLs.length < 7) {
      const promises = [];

      for (let i = 0; i < image.length; i++) {
        promises.push(handleStorageImage(image[i]));
      }

      Promise.all(promises)
        .then((urls: any) => {
          setProduct((prev) => ({
            ...prev,
            imageURLs: product.imageURLs.concat(urls),
          }));
          console.log(urls);
        })
        .catch((error) => console.log(error));
    } else {
      console.log("You can upload only 6 pics or less");
    }
  };

  const handleChangeValue = (e: string) => {
    console.log(e);
  };

  return (
    <div className="flex flex-col max-w-sm justify-center gap-8 sm:max-w-lg mx-auto">
      <h1 className="text-heading-07 sm:text-heading-04">Dashboard</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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
            {product.imageURLs.map((url) => (
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
            onChange={(e) => handleChangeValue(e.target.id)}
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
            value={values.description}
            onChange={handleChange}
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
            value={values.measurements}
            onChange={handleChange}
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
            value={values.category}
            onChange={handleChange}
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
            value={values.price}
            onChange={handleChange}
            className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
          />
          <label
            htmlFor="price"
            className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
          >
            Price
          </label>
        </div>

        {values.offer === true && (
          <div className="relative flex gap-2 flex-col">
            <input
              id="discountedPrice"
              type="number"
              value={values.discountedPrice}
              onChange={handleChange}
              placeholder="Discount"
              className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
            />
            <label
              htmlFor="discountedPrice"
              className="absolute left-0 -top-5 text-regular-07 text-neutral-04 peer-placeholder-shown:text-regular-05 peer-placeholder-shown:text-neutral-04 peer-placeholder-shown:top-[0.5px] transition-all"
            >
              Discount
            </label>
            {(values.discountedPrice > values.price && (
              <span className="border rounded-lg text-secondary-red px-2 py-1 mt-2">
                Discount must be lower then price
              </span>
            )) ||
              (values.discountedPrice === 0 && (
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
            checked={values.offer}
            onChange={handleChange}
          />
        </div>

        <input
          type="number"
          name="quantity"
          id="quantity"
          value={values.quantity}
          onChange={handleChange}
          className="border-b border-b-neutral-04 pb-2 focus:outline-none  text-regular-05 w-full peer placeholder-transparent"
        />

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
        <button type="submit">Create</button>
      </form>
      <button type="button" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}
