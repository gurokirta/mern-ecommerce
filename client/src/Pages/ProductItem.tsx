import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../Redux/services/fetchData";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";

export default function ProductItem() {
  const params = useParams();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const { data, isError, isLoading } = useGetProductQuery(params?.id ?? "");

  return (
    <>
      <div className="max-w-lg mx-auto flex gap-8">
        <div className="flex flex-col gap-2 w-[268px] ">
          {data && (
            <img
              src={data.pictures[0]}
              alt="pic"
              className="w-[268px] h-[328px] object-cover"
            />
          )}
          <div className="flex w-[547px]  ">
            {data?.pictures.map((pic) => (
              <img
                src={pic}
                alt="pic"
                className="w-[84px] h-[90px] mr-2 object-cover"
              />
            ))}
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            {data?.reviews?.map((review) => <p>Review: {review.like}</p>)}
            <h1 className="text-heading-05 text-neutral-07"> {data?.title}</h1>
            {data?.description}
            <div className="flex gap-2">
              <p className="text-heading-06 text-neutral-07">
                {" "}
                ${data?.discountedPrice.toFixed(2)}
              </p>
              <p className="text-heading-06 text-neutral-04 line-through">
                ${data?.price.toFixed(2)}
              </p>
            </div>
            {data?.measurements}
          </div>
          <div>
            {currentUser?.isAdmin ? (
              <div>
                <p className="text-secondary-red">Admin is here</p>
                <button className="bg-primary py-2 px-12 border rounded-lg text-neutral-01">
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
    </>
  );
}
