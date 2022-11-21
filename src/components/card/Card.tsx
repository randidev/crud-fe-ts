import { FC } from "react";
import { PropsWithChildren } from "react";

export const Card: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div className={["flex justify-center", className].join(" ")}>
      <div className="block w-full rounded-lg bg-white p-6 shadow-lg">
        {children}
      </div>
    </div>
  );
};
