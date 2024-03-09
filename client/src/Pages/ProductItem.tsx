import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../Redux/services/fetchData";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";

export default function ProductItem() {
  const params = useParams();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const { data, isError, isLoading } = useGetProductQuery(params?.id ?? "");
  const [currentImage, setCurrentImage] = useState(data?.pictures[0]);

  const handleChangeImage = (id: string) => {
    setCurrentImage(id);
  };
  console.log(data?.category.join(","));
  return (
    <>
      <div className="max-w-4xl mx-auto flex gap-10">
        <div className="flex flex-col gap-2 relative">
          {data && (
            <img
              src={currentImage || data?.pictures[0]}
              alt="pic"
              className="w-96 object-cover h-[500px]"
            />
          )}
          {/* <div className="flex justify-between absolute w-full top-56 px-10">
            <FaArrowLeftLong className="bg-neutral-02 text-neutral-05 rounded-xl w-8 h-5 cursor-pointer" />
            <FaArrowRightLong className="bg-neutral-02 text-neutral-05 rounded-xl w-8 h-5 cursor-pointer" />
          </div> */}
          <div className="flex w-96 gap-2">
            {data?.pictures.map((pic) => (
              <img
                src={pic}
                onClick={() => handleChangeImage(pic)}
                alt="pic"
                className="w-1/2 h-[90px] object-cover cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 w-1/2 justify-between">
          <div>
            {data?.reviews?.map((review) => <p> {review.like} Reviews</p>)}
          </div>
          <div>
            <h1 className="text-heading-05 text-neutral-07"> {data?.title}</h1>
          </div>
          <div>
            <p className="text-regular-06 text-neutral-04">
              {data?.description}
            </p>
          </div>
          <div className="flex gap-2 border-b border-neutral-03 pb-4">
            <p className="text-heading-06 text-neutral-07">
              {" "}
              ${data?.discountedPrice.toFixed(2)}
            </p>
            {data?.offer && (
              <p className="text-heading-06 text-neutral-04 line-through">
                ${data?.price.toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex flex-col mt-4 gap-2 ">
            <span className="text-neutral-04 text-regular-04">
              Measurements
            </span>
            {data?.measurements}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-neutral-04 text-regular-04 ">
              Choose Color {`>`}
            </span>
            <div className="flex gap-2">
              {data?.color?.map((color) => (
                <div className={`w-8 h-8 rounded-full ${color}`}></div>
              ))}
            </div>
          </div>
          <div className="border-b border-neutral-03 pb-4">
            {currentUser?.isAdmin ? (
              <div>
                <button className="bg-primary py-2 px-12 border rounded-lg text-neutral-01 w-full">
                  Edit
                </button>
              </div>
            ) : (
              <div>
                <p className="text-secondary-red">user is here</p>
                <button>Add to cart</button>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center text-neutral-04 ">
            <span className="text-regular-05">CATEGORY</span>
            <span className="font-thin">{data?.category.join(",")}</span>
          </div>
        </div>
      </div>
      <section className="max-w-4xl mx-auto mt-10 flex flex-col">
        <header className="mb-10 py-3 border rounded-2xl border-neutral-03 pl-5">
          <h2 className="text-regular-04">Reviews</h2>
        </header>

        <div>
          <h2 className="text-regular-03">Costumer Reviews</h2>
          <span className="text-regular-06">
            {data?.reviews?.map((review) => <p> {review.like} Reviews</p>)}
          </span>
        </div>
        <form className="relative">
          <textarea
            name=""
            id=""
            className="w-full border border-neutral-03 rounded-2xl  text-regular-06 h-16"
          ></textarea>
          <button className="absolute bg-primary py-2 px-10 text-neutral-01 rounded-3xl  text-btn-s right-0 top-2 mr-2">
            Write Review
          </button>
        </form>
        <article className="flex gap-10 flex-col mt-10">
          <div className="flex gap-10 border-b border-neutral-03 rounded-3xl p-10 shadow-xl relative">
            <img
              src="/assets/try.jpg"
              alt=""
              className="w-16 object-cover rounded-full"
            />

            <div>
              <h3>jon doe</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                fugit.
              </p>
            </div>
            <button className="absolute bottom-10 right-10">Reply</button>
          </div>
          <div className="flex gap-10 border-b border-neutral-03 rounded-3xl p-10 shadow-xl relative">
            <img
              src="/assets/try.jpg"
              alt=""
              className="w-16 object-cover rounded-full"
            />

            <div>
              <h3>jon doe</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                fugit.
              </p>
            </div>
            <button className="absolute bottom-10 right-10">Reply</button>
          </div>
          <div className="flex gap-10 border-b border-neutral-03 rounded-3xl p-10 shadow-xl relative">
            <img
              src="/assets/try.jpg"
              alt=""
              className="w-16 object-cover rounded-full"
            />

            <div>
              <h3>jon doe</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                fugit.
              </p>
            </div>
            <button className="absolute bottom-10 right-10">Reply</button>
          </div>
        </article>
      </section>
    </>
  );
}
