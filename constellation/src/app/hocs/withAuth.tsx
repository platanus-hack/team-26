// components/withAuth.js
/* eslint-disable react/display-name */
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { JSX, useEffect } from "react";

import React from "react";

const withAuth = (
  WrappedComponent: React.ComponentType<JSX.IntrinsicAttributes>
) => {
  return (props: JSX.IntrinsicAttributes) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        // Prevent redirection if the user state is in the process of being updated
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
        }
      }
    }, [user, router]);

    if (!user) {
      return null; // Or show a loading spinner while checking auth
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
