// "use client"; 
// import { useState, useEffect, useRef, createRef } from 'react'; // Import createRef
// import { usePathname, useRouter } from 'next/navigation'; 
// import Navbar from '../../../../../components/Navbar'; 
// import MarqueeTag from '../../../../../components/MarqueeTag';
// import AdvertismentLRRibbon from '../../../../../components/AdvertismentLR_Ribbon';
// import styles from './NewsArticlePage.module.css'; 

// const createSlug = (title) => {
//   return title
//     .toLowerCase()
//     .replace(/ /g, '-') 
//     .replace(/[^\w-]+/g, ''); // Remove non-word characters
// };

// const NewsArticlePage = () => {
//   const router = useRouter(); // Use router to update URL
//   const pathname = usePathname(); // Get the current pathname

//   const [article, setArticle] = useState(null); // Current article state
//   const [articles, setArticles] = useState([]); // All articles for infinite scroll
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(false); // Error state
//   const articleRefs = useRef([]); // Array of refs for articles

//   // Track the last visible article to prevent redundant updates
//   const lastVisibleArticle = useRef(null);

//   // Fetch initial article by ID from URL
//   useEffect(() => {
//     const id = pathname.split("/").pop(); // Assuming the ID is at the end of the URL
//     if (!id) {
//       console.log("ID is missing in the URL");
//       setError(true);
//       setLoading(false);
//       return;
//     }

//     // Fetch the article by ID and all articles
//     const fetchArticleById = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/posts`);
//         const data = await res.json(); // Parse the response JSON

//         // Sort all articles by their updated date in descending order
//         const sortedArticles = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

//         // Find the article by the matching ID
//         const foundArticle = sortedArticles.find((article) => article._id === id);

//         if (foundArticle) {
//           setArticle(foundArticle); // Set the found article

//           // Set the rest of the articles excluding the clicked one
//           setArticles(sortedArticles.filter((article) => article._id !== id));
//         } else {
//           console.log("Article not found");
//           setError(true);
//         }
//         setLoading(false); // Stop loading
//       } catch (err) {
//         console.error("Error fetching articles:", err);
//         setError(true);
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchArticleById(); // Call the fetch function
//   }, [pathname]);

//   // Initialize refs for articles to ensure IntersectionObserver works for all
//   useEffect(() => {
//     // Ensure refs exist for each article
//     articleRefs.current = Array(articles.length)
//       .fill()
//       .map((_, i) => articleRefs.current[i] || createRef());
//   }, [articles]);

//   // IntersectionObserver to track articles when they come into view
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const index = entry.target.getAttribute("data-index");
//             const article = articles[index];

//             // Prevent re-updating the same article URL if it's already visible
//             if (lastVisibleArticle.current !== article._id) {
//               lastVisibleArticle.current = article._id; // Update only if a new article becomes visible
//               const category = article.category || "all"; // Assuming there's a category field
//               const slug = createSlug(article.title);

//               // Introduce a delay of 1 second before updating the URL with shallow routing
//               setTimeout(() => {
//                 console.log(
//                   "Updating URL with shallow routing:",
//                   `/newsshorts/${category}/${slug}/${article._id}`
//                 );
//                 router.replace(`/newsshorts/${category}/${slug}/${article._id}`, undefined, {
//                   shallow: true,
//                 });
//               }, 100);
//             }
//           }
//         });
//       },
//       { threshold: 0.1 } // Trigger when at least 10% of the article is in view
//     );

//     // Observe all articleRefs
//     articleRefs.current.forEach((ref) => {
//       if (ref.current) {
//         observer.observe(ref.current); // Ensure each ref is observed
//       }
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, [articles, router]);

//   if (loading) {
//     return <p>Loading article...</p>;
//   }

//   if (error || !article) {
//     return <p>404 - Article not found</p>; // Display error if no article found
//   }

//   return (
//     <>
//       <Navbar />
//       <MarqueeTag />
//       <AdvertismentLRRibbon />

//       {/* Display the clicked article first */}
//       <div className={styles.articleContainer}>
//         <h1 className={styles.articleTitle}>{article.title}</h1>
//         <p className={styles.articleSynopsis}>
//           In the latest news:{" "}
//           {article.synopsis ||
//             "A quick overview of the topic being discussed in this article."}
//         </p>
//         <img
//           src={article.picture}
//           alt={article.title}
//           className={styles.articleImage}
//         />
//         <hr className={styles.articleDivider} />
//         <div
//           className={styles.articleDescription}
//           dangerouslySetInnerHTML={{ __html: article.description }}
//         />
//         <div className={styles.socialShare}>
//           <a href="#">Share on LinkedIn</a> | <a href="#">Share on Twitter</a> |{" "}
//           <a href="#">Share on Facebook</a>
//         </div>
//       </div>

//       {/* Display other articles below the current one */}
//       <div className={styles.articleList}>
//         {articles.map((otherArticle, index) => (
//           <div
//             key={otherArticle._id}
//             className={styles.articleContainer}
//             ref={articleRefs.current[index]} // Attach ref to observe when in view
//             data-index={index}
//           >
//             <h2 className={styles.articleTitle}>{otherArticle.title}</h2>
//             <p className={styles.articleSynopsis}>
//               {otherArticle.synopsis ||
//                 "A quick overview of the topic being discussed in this article."}
//             </p>
//             <img
//               src={otherArticle.picture}
//               alt={otherArticle.title}
//               className={styles.articleImage}
//             />
//             <div
//               className={styles.articleDescription}
//               dangerouslySetInnerHTML={{ __html: otherArticle.description }}
//             />
//             <div className={styles.socialShare}>
//               <a href="#">Share on LinkedIn</a> | <a href="#">Share on Twitter</a> |{" "}
//               <a href="#">Share on Facebook</a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default NewsArticlePage;


////+++++++++++++++++++++++++++++++++ Trying to add getserversideprops +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import Navbar from '../../../../../components/Navbar'; 
import MarqueeTag from '../../../../../components/MarqueeTag';
import AdvertismentLRRibbon from '../../../../../components/AdvertismentLR_Ribbon';
import styles from './NewsArticlePage.module.css';

// Helper function to create a slug
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-') 
    .replace(/[^\w-]+/g, ''); // Remove non-word characters
};

export async function fetchArticles(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/posts`, { cache: "no-store" });
  const data = await res.json();

  // Sort articles by updated date in descending order
  const sortedArticles = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  const article = sortedArticles.find((item) => item._id === id);
  const articles = sortedArticles.filter((item) => item._id !== id);

  return { article, articles };
}

export default async function NewsArticlePage({ params }) {
  const { id } = params;

  // Fetch data server-side
  const { article, articles } = await fetchArticles(id);

  if (!article) {
    return <p>404 - Article not found</p>;
  }

  return (
    <>
      <Navbar />
      <MarqueeTag />
      <AdvertismentLRRibbon />

      {/* Main Article */}
      <div className={styles.articleContainer}>
        <h1 className={styles.articleTitle}>{article.title}</h1>
        <p className={styles.articleSynopsis}>
          {/* {article.synopsis || ""} */}
        </p>
        <img src={article.picture} alt={article.title} className={styles.articleImage} />
        <hr className={styles.articleDivider} />
        <div
          className={styles.articleDescription}
          dangerouslySetInnerHTML={{ __html: article.description }}
        />
        <div className={styles.socialShare}>
          <a href="#">Share on LinkedIn</a> | <a href="#">Share on Twitter</a> |{" "}
          <a href="#">Share on Facebook</a>
        </div>
      </div>

      {/* Other Articles */}
      <div className={styles.articleList}>
        {articles.map((otherArticle, index) => (
          <div key={otherArticle._id} className={styles.articleContainer}>
            <h2 className={styles.articleTitle}>{otherArticle.title}</h2>
            <p className={styles.articleSynopsis}>
              {otherArticle.synopsis || "No synopsis available."}
            </p>
            <img
              src={otherArticle.picture}
              alt={otherArticle.title}
              className={styles.articleImage}
            />
            <div
              className={styles.articleDescription}
              dangerouslySetInnerHTML={{ __html: otherArticle.description }}
            />
            <div className={styles.socialShare}>
              <a href="#">Share on LinkedIn</a> | <a href="#">Share on Twitter</a> |{" "}
              <a href="#">Share on Facebook</a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
