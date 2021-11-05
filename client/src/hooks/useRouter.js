import React from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

/**
 * Combine useParams, useHistory and convert queryString to object
 * @returns [params, history]
 */
export default function useRouter() {
  const params = useParams();
  const history = useHistory();
  const query = useQuery();

  return [{ ...params, ...query }, history];
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => {
    let query = {};
    for (const [key, value] of new URLSearchParams(search)) {
      query[key] = value;
    }
    return query;
  }, [search]);
}
