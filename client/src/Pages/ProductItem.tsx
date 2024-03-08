import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../Redux/services/fetchData";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

export default function ProductItem() {
  const params = useParams();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const { data, isError, isLoading } = useGetProductQuery(params?.id ?? "");

  return (
    <>
      <div className="max-w-2xl mx-auto flex gap-10">
        <div className="flex flex-col gap-2 relative">
          {data && (
            <img
              src={data.pictures[0]}
              alt="pic"
              className="w-96 object-cover h-[500px]"
            />
          )}
          <div className="flex justify-between absolute w-full mx-10">
            <FaArrowLeftLong className="bg-neutral-02 text-neutral-05 rounded-2xl w-3" />
            <FaArrowRightLong className="bg-neutral-02 text-neutral-05 rounded-2xl w-3" />
          </div>
          <div className="flex w-96 gap-2">
            {data?.pictures.map((pic) => (
              <img
                src={pic}
                alt="pic"
                className="w-1/2 h-[90px]  object-cover"
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
          <div>
            {currentUser?.isAdmin ? (
              <div>
                <p className="text-secondary-red">Admin is here</p>
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
        </div>
      </div>
      <FaArrowAltCircleLeft className="bg-neutral-03 text-secondary-red" />
      <FaArrowAltCircleRight />
      <div className="flex justify-between absolute">
        <FaArrowLeftLong className="bg-neutral-02 text-neutral-05 rounded-2xl w-3" />
        <FaArrowRightLong className="bg-neutral-02 text-neutral-05 rounded-2xl w-3" />
      </div>
    </>
  );
}
