import { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import useAuthStore from "src/store/authStore";

export const AuthGuard = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting");
      router.replace("/auth/login").catch(console.error);
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
