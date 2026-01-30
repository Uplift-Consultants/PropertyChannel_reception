"use client";

import { useState, useEffect } from "react";
import MobileView from "./listMobile";
import DesktopView from "./listDesktop";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mql.matches);
    
    setIsMobile(mql.matches); // Set initial state
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

// Usage
export default function Propertylist({data, isLoading, isSuccess}) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileView data={data} isLoading={isLoading} isSuccess={isSuccess}/> : <DesktopView data={data} isLoading={isLoading} isSuccess={isSuccess}/>;
}