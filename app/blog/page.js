// // import ArticleRenderer from "../components/ArticleRenderer";

// // export default function Page() {
// //   const decodedContent = `
// //     <h1>Hello World</h1>
// //     <p>This is a <a href="https://nextjs.org">Next.js</a> test.</p>
// //     <img src="https://picsum.photos/400/200" alt="Random" />
// //     <h2>Features</h2>
// //     <ul>
// //       <li>Fast</li>
// //       <li>Scalable</li>
// //     </ul>
// //     <blockquote>This is a highlighted quote.</blockquote>
// //   `;

// //   return (
// //     <main className="py-10">
// //       <ArticleRenderer htmlContent={decodedContent} />
// //     </main>
// //   );
// // }
// "use client";
// import React, { Suspense, useState } from "react";
// import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
// import { useSearchParams } from "next/navigation";
// import ArticleRenderer from "../components/ArticleRenderer";

// const PageContent = () => {
//   const search = useSearchParams();
//   const content = `<img class="hts-content-image size-large wp-image-0" src="https://images.unsplash.com/photo-1631543722888-01f8a17ebf3f" alt="Understanding Medical Insurance: A Comprehensive Guide" />
// <h2>What is Medical Insurance?</h2>
// Medical insurance is a type of coverage that pays for medical and surgical expenses incurred by the insured. It serves as a financial safety net, ensuring that individuals can access necessary healthcare without facing crippling costs. Understanding the basics of medical insurance is crucial for making informed decisions regarding healthcare needs.
// <h2>The Importance of Having Medical Insurance</h2>
// Having medical insurance provides individuals with a sense of security and access to a broader range of healthcare services. It typically covers hospital visits, preventive care, and sometimes even emergency services. Without adequate insurance, individuals may delay seeking treatment due to cost concerns, which can lead to worsening health conditions.

// <img class="alignnone wp-image-22 size-large" src="https://admin.costaricaninsurance.com/wp-content/uploads/2025/08/WhatsApp-Image-2025-07-27-at-23.26.33_2844e7cf-1024x717.jpg" alt="" width="1024" height="717" />
// <h2>Types of Medical Insurance Plans</h2>
// There are various types of medical insurance plans available, each with unique features. Common options include employer-sponsored plans, private insurance, and government programs like Medicare and Medicaid. Each plan comes with specific benefits and costs, making it essential to compare options based on individual needs and budget.`;
//   const title = search.get("title");
//   const postid = search.get("postid");
//   const image = search.get("image");

//   const [formData, setFormData] = useState({
//     comment: "",
//     name: "",
//     email: "",
//     save: false,
//   });
//   const decodedContent = content ? decodeURIComponent(content) : "<p></p>";
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // API call can go here
//   };

//   const handleSubscribe = async () => {
//     const formData = new FormData();
//     formData.append("your-email", email);

//     try {
//       const response = await fetch(
//         "https://admin.costaricaninsurance.com/wp-json/contact-form-7/v1/contact-forms/1234/feedback", // 👈 Replace 1234 with your form ID
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (data.status === "mail_sent") {
//         setMessage("✅ Subscription successful!");
//         setEmail("");
//       } else {
//         setMessage("❌ Failed to subscribe. Try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("⚠️ Error occurred. Try again later.");
//     }
//   };
//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, comment } = formData;

//     const payload = {
//       post: postid,
//       author_name: name,
//       author_email: email,
//       content: comment,
//     };

//     try {
//       const res = await fetch(
//         "https://admin.costaricaninsurance.com/wp-json/wp/v2/comments",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (res.ok) {
//         setMessage("Comment submitted successfully!");
//         setFormData({ comment: "", name: "", email: "", save: formData.save });
//       } else {
//         const err = await res.json();
//         setMessage(`Failed: ${err.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("An error occurred. Try again later.");
//     }
//   };
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <section className="relative scale-95 rounded-3xl bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
//         <div className="container mx-auto px-6 py-20">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-6">
//                 {title}
//                 <br />
//                 {/* <span className="text-blue-600">
//                   ORGANIZE YOUR WORKING PLACE
//                 </span> */}
//               </h2>
//               {/* <p className="text-gray-600 text-lg mb-8">
//                 Relationship tips couples therapists are giving all the time
//               </p> */}
//             </div>

//             <div className="relative">
//               <div className="bg-white rounded-2xl p-8 shadow-lg">
//                 <img
//                   src={image}
//                   alt={title}
//                   className="w-full h-64 object-cover rounded-lg mb-4"
//                 />
//               </div>
//               {/* Decorative elements */}
//               <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-400 rounded-full"></div>
//               <div className="absolute top-1/2 -left-6 w-6 h-6 bg-yellow-400 rounded-full"></div>
//               <div className="absolute -bottom-6 left-1/3 w-4 h-4 bg-blue-400 rounded-full"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <main className="container  mx-auto pn:max-sm:px-0 px-6 py-16">
//         <div className="flex sm:max-md:flex-wrap  gap-4">
//           <div className="w-[300px] pn:max-md:hidden h-full flex sm:flex-col pn:max-sm:justify-center items-center gap-3">
//             {" "}
//             <Facebook className="w-5 h-5 text-blue-600" />
//             <Twitter className="w-5 h-5 text-blue-400" />
//             <Instagram className="w-5 h-5 text-pink-500" />
//             <Linkedin className="w-5 h-5 text-blue-700" />
//             <Youtube className="w-5 h-5 text-red-600" />
//           </div>
//           {/* Main Article Content */}
//           <div className="lg:col-span-2">
//             {/* <article
//               className="prose max-w-none text-gray-800"
//               dangerouslySetInnerHTML={{ __html: decodedContent }}
//             /> */}
//             <ArticleRenderer htmlContent={content} />
//             {/* <article className="prose max-w-none"> */}

//             {/* <p className="text-gray-600 mb-6">
//                 Dreams and visions that excite students can be changes that lead
//                 young entrepreneurs from raw talent. Recent vet clinic brings a
//                 new bold idea that stays good to care for being medical
//                 insurance because it involves in financial disclosure. Modern
//                 business owners need quick finance access that companies provide
//                 by working their best business operations. Here comes also
//                 understanding why every business needs world-class insurance
//                 with which their world meets.
//               </p>

//               <p className="text-gray-600 mb-8">
//                 As being proper qualified salesmen, their nice done interesting,
//                 useful change, others also minds interested works. Financial
//                 advisors no doubt always think out of planning future world
//                 financial work. Perhaps buy anything a financial opportunity may
//                 always be no such things. Through regular actions, they usually
//                 lead any smart planning projects. One of the professional
//                 actions they help satisfy their income.
//               </p> */}

//             {/* Article 1 */}
//             {/* <div className="bg-gray-50 rounded-lg p-8 mb-8">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">
//                   KNICKER LINING CONCEALED BACK ZIP FASTEN SWING STYLE SHORT
//                   SLEEVED DOUBLE LAYER FULL PATTERN FLORAL.
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   Free walking in the clothing fashion Ease makes under foot
//                   cotton sleeves around can all edge jane. Black leather lining
//                   concealed back zip swing style short sleeve double layer full
//                   pattern in. Item regular long items.
//                 </p>
//                 <p className="text-gray-600">
//                   Our various letter research create tall enough, two not
//                   windows added white spare persons can it quit very regular
//                   in-Shirt women various heights welcome interior in life much
//                   one. Need purchase in business from business people, clothing
//                   through business around excellent. Here much they are just
//                   every choose to general commercial, extremely management
//                   others.
//                 </p>
//               </div> */}

//             {/* Article 2 */}
//             {/* <div className="mb-8">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">
//                   EU RIDICULUS FRINGILLA AENEAN
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   The is impure consequatur nostru, finally nostru ut aute risus
//                   aliquam nobis. Non more price discharge honam. Features nos do
//                   ante malesuada interdum hue ante vehicula et mauris, both mo
//                   quod et dignassim ante consequiti, dolores risus. Content age
//                   augmentum ut auto urna vehicles et.
//                 </p>

//                 <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
//                   <li>Cras lorem massa pharetra bibendum quis posuere</li>
//                   <li>Nulla pretium nunc at bibendum efficitur eget viverra</li>
//                   <li>
//                     Suspendisse bibendum cras at ex bibendum efficitur posuere
//                     vehicula by never nunc ullam quam etiam vestibulum sem
//                     mauris
//                   </li>
//                 </ul>

//                 <p className="text-gray-600">
//                   Non torquent tellus non ruthonem vaginant elit, telling future
//                   ruthonem est volutpat mollit pharetra. nonlor nibor pharetra
//                   conmentere nibor, consequat ullam, eu dui cras, et nostru at
//                   ligulas varius et gravida porttitor et lobortis ullamcis
//                   augmentum. Morbittas sollicitudin eu finibus bibendum et magna
//                   nascetur lorem consequil at ligulas.
//                 </p>
//               </div> */}

//             {/* Social Share */}
//             {/* <div className="flex items-center space-x-4 pt-8 border-t">
//                 <span className="text-gray-600 font-medium">SHARE:</span>
//                 <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
//                   <Facebook className="w-4 h-4" />
//                   <span>SHARE</span>
//                 </button>
//                 <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-600">
//                   <Twitter className="w-4 h-4" />
//                   <span>TWEET</span>
//                 </button>
//                 <button className="flex items-center space-x-2 text-red-500 hover:text-red-700">
//                   <span>PIN</span>
//                 </button>
//               </div> */}
//             {/* </article> */}
//           </div>

//           {/* Sidebar */}
//           <aside className="space-y-8  pn:max-md:hidden">
//             {/* Follow Us */}
//             <div className="bg-white p-6 rounded-lg shadow-sm border">
//               <h4 className="font-bold text-gray-800 mb-4">Follow Us</h4>
//               <div className="flex space-x-4">
//                 <Facebook className="w-5 h-5 text-blue-600" />
//                 <Twitter className="w-5 h-5 text-blue-400" />
//                 <Instagram className="w-5 h-5 text-pink-500" />
//                 <Linkedin className="w-5 h-5 text-blue-700" />
//                 <Youtube className="w-5 h-5 text-red-600" />
//               </div>
//               <p className="text-sm text-gray-600 mt-4">
//                 Join thousands in growing subscriber and improve a collection of
//                 tools to help your team every work.
//               </p>
//               <div className="mt-4">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   className="w-full px-3 py-2 border rounded-lg text-sm"
//                 />
//                 <button
//                   onClick={handleSubscribe}
//                   className="w-full bg-black text-white py-2 rounded-lg mt-2 text-sm hover:bg-gray-800 transition-colors"
//                 >
//                   SUBSCRIBE
//                 </button>
//                 {message && <p className="text-sm mt-2">{message}</p>}
//               </div>
//             </div>

//             {/* The Latest */}
//             {/* <div className="bg-white p-6 rounded-lg shadow-sm border">
//               <h4 className="font-bold text-gray-800 mb-4">The Latest</h4>
//               <div className="space-y-4">
//                 <div className="flex space-x-3">
//                   <img
//                     src="/api/placeholder/80/60"
//                     alt="Article"
//                     className="w-20 h-15 object-cover rounded"
//                   />
//                   <div>
//                     <h5 className="text-sm font-medium text-gray-800 mb-1">
//                       Ut enim Mos Difficiore Sea Cras Qui Metadis Eros A
//                       interdum
//                     </h5>
//                     <p className="text-xs text-gray-500">
//                       June 14, 2023 • 3 minute read
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex space-x-3">
//                   <img
//                     src="/api/placeholder/80/60"
//                     alt="Article"
//                     className="w-20 h-15 object-cover rounded"
//                   />
//                   <div>
//                     <h5 className="text-sm font-medium text-gray-800 mb-1">
//                       Curabitur Nunc Molestae Eros Cras Sed Suscipit Duis ac
//                       Cela
//                     </h5>
//                     <p className="text-xs text-gray-500">
//                       May 14, 2023 • 5 minute read
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex space-x-3">
//                   <img
//                     src="/api/placeholder/80/60"
//                     alt="Article"
//                     className="w-20 h-15 object-cover rounded"
//                   />
//                   <div>
//                     <h5 className="text-sm font-medium text-gray-800 mb-1">
//                       Ut enim Mos Difficiore Sea Cras Qui Metadis Eros A
//                       interdum
//                     </h5>
//                     <p className="text-xs text-gray-500">
//                       June 14, 2023 • 3 minute read
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div> */}
//           </aside>
//         </div>
//       </main>

//       {/* Comments Section */}
//       {/* <section className="bg-gray-50 py-16">
//         <div className="container mx-auto px-6">
//           <div className="bg-black text-white text-center py-8 rounded-lg">
//             <h3 className="text-lg font-bold mb-2">VIEW COMMENTS (8)</h3>
//           </div>
//         </div>
//       </section> */}

//       <div className="max-w-3xl mx-auto p-6">
//         <h2 className="text-2xl font-bold mb-2">Leave a Reply</h2>
//         <p className="text-gray-600 mb-4">
//           Your email address will not be published. Required fields are marked{" "}
//           <span className="text-red-500">*</span>
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Comment */}
//           <textarea
//             name="comment"
//             value={formData.comment}
//             onChange={handleChange}
//             placeholder="Your Comment"
//             required
//             className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
//             rows={6}
//           />

//           {/* Name + Email */}
//           <div className="flex gap-4">
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Name"
//               required
//               className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
//             />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               required
//               className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
//             />
//           </div>

//           {/* Save Checkbox */}
//           <label className="flex items-center gap-2 text-sm text-gray-700">
//             <input
//               type="checkbox"
//               name="save"
//               checked={formData.save}
//               onChange={handleChange}
//               className="accent-lime-400"
//             />
//             Save my name, email, and website in this browser for the next time I
//             comment.
//           </label>

//           {/* Submit Button */}
//           <button
//             onClick={handleCommentSubmit}
//             // type="submit"
//             className="px-6 py-3 bg-lime-400 text-black font-bold rounded-full hover:bg-lime-500 transition"
//           >
//             Post Comment
//           </button>
//         </form>
//       </div>

//       {/* You May Also Like Section */}
//       {/* <section className=" py-16">
//         <div className="container mx-auto px-6">
//           <h3 className="text-2xl font-bold text-gray-800 mb-12">
//             YOU MAY ALSO LIKE
//           </h3>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//             {[1, 2, 3, 4, 5, 6].map((item) => (
//               <article
//                 key={item}
//                 className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <img
//                   src="/api/placeholder/400/250"
//                   alt="Article"
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <h4 className="font-bold text-gray-800 mb-2">
//                     Integer Maecenas Eget Viverra
//                   </h4>
//                   <p className="text-gray-600 text-sm mb-4">
//                     Aenean eleifend ante maecenas pulvinar montes lorem et pede.
//                   </p>
//                   <div className="text-xs text-gray-500">
//                     June 14, 2023 • 5 minute read
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section> */}
//     </div>
//   );
// };

// const Page = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <PageContent />
//     </Suspense>
//   );
// };

// export default Page;
import React from "react";

function page() {
  return <div></div>;
}

export default page;
