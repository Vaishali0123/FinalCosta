// "use client";

// import React from "react";
// import parse, { domToReact } from "html-react-parser";

// export default function ArticleRenderer({ htmlContent }) {
//   const options = {
//     replace: (domNode) => {
//       if (domNode.type === "tag") {
//         const { name, attribs, children } = domNode;

//         switch (name) {
//           case "h1":
//             return (
//               <h1 className="text-3xl font-bold mb-4">
//                 {domToReact(children, options)}
//               </h1>
//             );

//           case "h2":
//             return (
//               <h2 className="text-2xl font-semibold mt-6 mb-3">
//                 {domToReact(children, options)}
//               </h2>
//             );

//           case "p":
//             return (
//               <p className="text-gray-600 mb-6">
//                 {domToReact(children, options)}
//               </p>
//             );

//           case "a":
//             return (
//               <a
//                 href={attribs.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline hover:text-blue-800"
//               >
//                 {domToReact(children, options)}
//               </a>
//             );

//           case "img":
//             return (
//               <div className="my-6 flex justify-center">
//                 <img
//                   src={attribs.src}
//                   alt={attribs.alt || "image"}
//                   className="rounded-xl shadow-md max-w-full"
//                 />
//               </div>
//             );

//           case "ul":
//             return (
//               <ul className="list-disc pl-6 mb-4 space-y-2">
//                 {domToReact(children, options)}
//               </ul>
//             );

//           case "li":
//             return (
//               <li className="marker:text-red-500">
//                 {domToReact(children, options)}
//               </li>
//             );

//           case "blockquote":
//             return (
//               <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
//                 {domToReact(children, options)}
//               </blockquote>
//             );

//           default:
//             return;
//         }
//       }
//     },
//   };

//   return (
//     <article className="max-w-3xl  mx-auto px-4">
//       {parse(htmlContent, options)}
//     </article>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";
import { useLanguage } from "../context/LanguageContext";

export default function ArticleRenderer({ htmlContent }) {
  const { language } = useLanguage();
  const [translatedContent, setTranslatedContent] = useState(htmlContent);
  async function translateText(text, targetLang) {
    if (!text || targetLang === "en") return text;
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang }),
      });
      const data = await res.json();
      return data.translatedText || text;
    } catch (err) {
      console.error("Translation error:", err);
      return text;
    }
  }
  useEffect(() => {
    async function doTranslate() {
      if (!htmlContent || language === "en") {
        setTranslatedContent(htmlContent);
        return;
      }

      try {
        // Parse HTML and walk nodes
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");

        async function walkAndTranslate(node) {
          if (
            node.nodeType === Node.TEXT_NODE &&
            node.nodeValue.trim() !== ""
          ) {
            node.nodeValue = await translateText(node.nodeValue, language);
          }
          if (node.childNodes) {
            for (let child of node.childNodes) {
              await walkAndTranslate(child);
            }
          }
        }

        await walkAndTranslate(doc.body);
        setTranslatedContent(doc.body.innerHTML);
      } catch (err) {
        console.error("Article translation error:", err);
        setTranslatedContent(htmlContent);
      }
    }

    doTranslate();
  }, [language, htmlContent]);

  const options = {
    replace: (node) => {
      if (!node.name) return;
      const children = node.children
        ? domToReact(node.children, options)
        : null;
      if (node.name === "p") {
        return (
          <p className="text-gray-600 dark:text-white/90 mb-6">
            {domToReact(node.children, options)}
          </p>
        );
      }
      if (node.name === "h2") {
        return (
          <div className="bg-gray-50 dark:bg-white/10 flex items-center rounded-lg p-4 mb-4">
            <h3 className="text-2xl font-bold dark:text-white/90  text-gray-800 ">
              {domToReact(node.children, options)}
            </h3>
          </div>
        );
      }
      if (node.name === "img") {
        return (
          <div className="relative mb-8">
            <div className="bg-white dark:bg-white/10 rounded-2xl p-4">
              <img
                src={node.attribs.src}
                alt={node.attribs.alt || "Blog"}
                className="rounded-lg mb-4"
              />
            </div>
            {/* <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-400 rounded-full"></div>
            <div className="absolute top-1/2 -left-6 w-6 h-6 bg-yellow-400 rounded-full"></div>
            <div className="absolute -bottom-6 left-1/3 w-4 h-4 bg-blue-400 rounded-full"></div> */}
          </div>
        );
      }
      return (
        <p className="text-gray-600 dark:text-white/90 mb-6">{children}</p>
      );
    },
  };

  return <>{parse(translatedContent, options)}</>;
}
