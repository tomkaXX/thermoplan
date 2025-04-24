import React from "react";
import classNames from "classnames";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={classNames("bg-white shadow-md rounded-2xl p-4", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={classNames("text-gray-800", className)}>{children}</div>;
}
