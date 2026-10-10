import { isAuthenticatedAtom } from "@/stores/auth";
import { useAtomValue } from "jotai";
import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: PropsWithChildren) {
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

  return <>{children}</>;
}

export default ProtectedRoute;
