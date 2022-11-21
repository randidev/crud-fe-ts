import Link from "next/link";
import React, { FC } from "react";
import { Props } from "./type";

export const Breadcrumbs: FC<Props> = ({ links, activeIndex }) => {
  return (
    <nav className="w-full rounded-md py-5">
      <ol className="list-reset flex">
        {links.map((link, index) => {
          return (
            <React.Fragment key={index}>
              <li>
                <Link
                  href={link.href}
                  className={[
                    index === activeIndex
                      ? "text-gray-900 hover:text-gray-800"
                      : "text-blue-600 hover:text-blue-700",
                    "text-lg font-semibold capitalize",
                  ].join(" ")}>
                  {link.label}
                </Link>
              </li>
              {+index + 1 < links.length && (
                <li>
                  <span className="mx-2 text-gray-900">/</span>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
