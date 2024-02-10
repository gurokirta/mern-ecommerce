import { useGetProductsQuery } from "../Redux/services/fetchData";
import { Link, useLocation } from "react-router-dom";

export default function Home() {
  const { data, isError, isLoading } = useGetProductsQuery();

  if (isError) {
    console.log(isError);
  }

  return (
    <>
      {data?.map((product) => (
        <div className="flex gap-4">
          <Link to={`/product/${product?._id}`}>{product.title}</Link>
        </div>
      ))}
    </>
  );
}
