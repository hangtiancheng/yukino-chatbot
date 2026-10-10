import { isAuthenticatedAtom } from "@/stores/auth";
import { useAtomValue } from "jotai";
import { useEffect, type ComponentType } from "react";
import { useNavigate } from "react-router-dom";

function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  return function (props: P) {
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    const navigate = useNavigate();
    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login", { replace: true });
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
