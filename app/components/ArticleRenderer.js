"use client";

import React from "react";
import parse, { domToReact } from "html-react-parser";

export default function ArticleRenderer({ htmlContent }) {
  const options = {
    replace: (domNode) => {
      if (domNode.type === "tag") {
        const { name, attribs, children } = domNode;

        switch (name) {
          case "h1":
            return (
              <h1 className="text-3xl font-bold mb-4">
                {domToReact(children, options)}
              </h1>
            );

          case "h2":
            return (
              <h2 className="text-2xl font-semibold mt-6 mb-3">
                {domToReact(children, options)}
              </h2>
            );

          case "p":
            return (
              <p className="text-gray-600 mb-6">
                {domToReact(children, options)}
              </p>
            );

          case "a":
            return (
              <a
                href={attribs.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {domToReact(children, options)}
              </a>
            );

          case "img":
            return (
              <div className="my-6 flex justify-center">
                <img
                  src={attribs.src}
                  alt={attribs.alt || "image"}
                  className="rounded-xl shadow-md max-w-full"
                />
              </div>
            );

          case "ul":
            return (
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {domToReact(children, options)}
              </ul>
            );

          case "li":
            return (
              <li className="marker:text-red-500">
                {domToReact(children, options)}
              </li>
            );

          case "blockquote":
            return (
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
                {domToReact(children, options)}
              </blockquote>
            );

          default:
            return;
        }
      }
    },
  };

  return (
    <article className="max-w-3xl  mx-auto px-4">
      {parse(htmlContent, options)}
    </article>
  );
}
