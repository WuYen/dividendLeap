import { useParams, useHistory } from "react-router-dom";

/**
 * Combine useParams and useHistory
 * @returns [params, history]
 */
export default function useRouter() {
  const params = useParams();
  const history = useHistory();
  return [params, history];
}
