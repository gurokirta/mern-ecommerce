import { Link, useLocation, useParams } from "react-router-dom";
import { useGetProductQuery } from "../Redux/services/fetchData";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import Breadcrumbs from "../components/Breadcrumbs";

export default function ProductItem() {
  const params = useParams();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const { data, isError, isLoading } = useGetProductQuery(params?.id ?? "");

  return (
    <>
      <Breadcrumbs />
      {currentUser?.isAdmin ? (
        <div>
          <p className="text-secondary-red">Admin is here</p>
        </div>
      ) : (
        <div>
          <p className="text-secondary-red">user is here</p>
        </div>
      )}
    </>
  );
}
