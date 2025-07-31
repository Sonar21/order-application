

import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"], // または ["latin", "japanese"]
  weight: ["400", "700"], // 必要な太さ
  display: "swap",
});
// import Header from "./components/Header";
config.autoAddCss = false;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        
        {children}</body>
    </html>
  );
}
