import { FC } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Props } from "./type";

export const Loading: FC<Props> = ({ className }) => {
  return (
    <AiOutlineLoading3Quarters
      className={["animate-spin", className].join(" ")}
      color="text-blue-800"
    />
  );
};
