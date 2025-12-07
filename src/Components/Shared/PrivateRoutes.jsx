import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = ({ publicPage = false, adminOnly = false }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const roles = user?.roles || [];
  const isAdmin = roles.includes("ROLE_ADMIN");
  const isSeller = roles.includes("ROLE_SELLER");
  const isUser = roles.includes("ROLE_USER");

  // ------------------ PUBLIC PAGE -------------------
  if (publicPage) {
    return user ? <Navigate to="/" /> : <Outlet />;
  }

  // ------------------ ADMIN ONLY ROUTES --------------
  if (adminOnly) {
    if (!isAdmin && !isSeller) {
      return <Navigate to="/" replace />;
    }

    // Seller allowed admin pages
    if (isSeller && !isAdmin) {
      const allowedSellerPaths = ["/admin/orders", "/admin/products"];
      const isAllowed = allowedSellerPaths.some((p) =>
        location.pathname.startsWith(p)
      );
      if (!isAllowed) {
        return <Navigate to="/" replace />;
      }
    }

    return <Outlet />;
  }

  // ------------------ GENERAL PRIVATE ROUTES ---------
  // ANY logged-in user can access (checkout, etc.)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
