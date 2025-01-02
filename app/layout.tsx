
// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import Head from "next/head";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Property Plateau Times",
//   description: "Find the latest real estate news, views and updates from all top sources for the Indian Realty industry.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <Head>
//         {/* Favicon */}
//         <link rel="icon" href="https://www.propertyplateau.com/wp-content/uploads/2023/09/logo-36x36.png" />
        
//         {/* Google Translate script */}
//         <script
//           type="text/javascript"
//           dangerouslySetInnerHTML={{
//             __html: `
//               function googleTranslateElementInit() {
//                 new google.translate.TranslateElement({
//                   pageLanguage: 'en', 
//                   includedLanguages: 'en,hi,mr', // English, Hindi, Marathi
//                   layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
//                 }, 'google_translate_element');
//               }
//             `,
//           }}
//         />
//         <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
        
//       </Head>
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         {children}

//         {/* Google Translate element (hidden, used by the API) */}
//         <div id="google_translate_element" style={{ display: "none" }}></div>

        
//       </body>
      
//     </html>
//   );
// }

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Property Plateau Times",
  description:
    "Find the latest real estate news, views and updates from all top sources for the Indian Realty industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Favicon */}
        <link
          rel="icon"
          href="https://www.propertyplateau.com/wp-content/uploads/2023/09/logo-36x36.png"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RPF36E6MRL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RPF36E6MRL');
          `}
        </Script>

        {/* Google Translate Script */}
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,hi,mr', // English, Hindi, Marathi
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* Hidden Google Translate Element */}
        <div id="google_translate_element" style={{ display: "none" }}></div>

        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}
