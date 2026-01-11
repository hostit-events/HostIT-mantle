"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import React, { use, useEffect } from "react";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";

type Props = {
  children: any;
};

const layout = (props: Props) => {
  const { sdkHasLoaded } = useDynamicContext();
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  useEffect(() => {
    if (sdkHasLoaded && !isLoggedIn) {
      router.push("/explore");
    }
  }, [sdkHasLoaded, isLoggedIn, router]);

  return <DashboardLayout>{props.children}</DashboardLayout>;
};

export default layout;
