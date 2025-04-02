import React from "react";

interface IfProps {
  children: React.ReactNode;
  isTrue: boolean;
  fallback?: React.ReactNode;
}

const RenderWhen = ({ children, isTrue, fallback }: IfProps) => {
  if (isTrue) {
    return <>{children}</>;
  }
  if (fallback) {
    return <>{fallback}</>;
  }
  return <></>;
};
export default RenderWhen;
