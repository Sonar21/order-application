

"use client"; // クライアントコンポーネント宣言、このコードはクライアント（ブラウザ）側で動く。  Next.js では何も書かなければサーバーコンポーネントになります。

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import StarRating from '@/app/components/StarRating';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import { FaSearch } from "react-icons/fa";
const MENU_API_URL = "https://5o7lwwt7q4.microcms.io/api/v1/menus"; // microCMS のエンドポイント URL

// データをセットする配列を用意
type MenuItem = {
  id: string;
  name: string;
  price: number;
  comment?: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  review?:number;
};

export default function MenuPage() {
// menu,cart 表示データを入れる配列、
// setMenu,setCart は、menu,cart を更新する関数function
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<MenuItem[]>([]);
const [searchTerm, setSearchTerm] = useState("");
const [searchQuery, setSearchQuery] = useState("");  // 検索確定キーワード

const handleSearch = () => {
  setSearchQuery(searchTerm);
};

const filteredMenu = menu.filter((item) =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase())
);

  const router = useRouter(); //画面移動で使用

  // useEffect(() => { fetch(...); }, []); 画面の準備が終わったタイミングでmicroCMSからデータを取得する
  useEffect(() => {
    // CMSからメニューデータ取得
    fetch(MENU_API_URL, {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
      },
    })
      // => はアロー関数といいます。functionを短く書いたのもです。
      // 例　これを短く書いたものです
      // .then(function(res) {
      //   return res.json();
      // })
      // res.json();の戻り値が res に入ります。
      .then((res) => res.json()) // 文字列からオブジェクトへ変換
      .then((data) => setMenu(data.contents)); // res オブジェクト が data に入る return が呼ばれる
      // 下記のように書き換えるとdataの中をブラウザ console で確認できます。
      // .then((data) => {
      //   setMenu(data.contents);
      //   console.table(data.contents); // contents 配列をテーブル形式で表示
      // });

    // localStorage からカートを復元
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);
    
  // カートに追加する
  const addToCart = (item: MenuItem) => {
    const updated = [...cart, item];
    setCart(updated);
    // JSON.stringify で配列を文字列化し、「cart」というキーで保存
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeFromCart = (indexToRemove: number) => {
  const updated = cart.filter((_, index) => index !== indexToRemove);
  setCart(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};


const getTotalPrice = () => {
  return cart.reduce((total, item) => total + item.price, 0);
};


  return (
    <div className={styles.container}>
      {/* メニュー一覧 */}
<main className={styles.menuList}>
  <h1 className={styles.title}>メニュー一覧</h1>

<div className={styles.searchContainer}>
  <input
    type="text"
    className={styles.searchBox}
    placeholder="メニューを検索"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSearch(); // ボタンと同じ関数を呼び出す
    }
  }}
  />
  <button
    className={styles.searchButton}
    onClick={() => handleSearch()}
  >
    検索
  </button>
</div>


  <div className={styles.grid}>
    {/* {menu.map((item) => ( */}
    {filteredMenu.map((item) => (
      <div key={item.id} className={styles.card}>
        {item.image && (
          <Image
            src={item.image.url}
            alt={item.name}
            width={item.image.width}
            height={item.image.height}
            className={styles.menuImage}
          />
        )}
        <p className={styles.name}>{item.name}</p>
        <p className={styles.price}>{item.price}円</p>
        {item.comment && <p className={styles.comment}>{item.comment}</p>}
         <div className={styles.stars}>
    

      {item.review && (
              <div className={styles.stars}>
                <StarRating rating={parseFloat(item.review)} />
              </div>
            )}

  </div>
        <button
          className={styles.addButton}
          onClick={() => router.push(`/confirm/${item.id}`)}
        >
          追加
        </button>
      </div>
    ))}
  </div>
</main>

      {/* 注文状況 */}
     
      <aside className={styles.cart}>
  <h2 className={styles.cartTitle}>注文状況</h2>
  {cart.length === 0 ? (
    <p className={styles.empty}>まだ注文はありません。</p>
  ) : (
    <>
      {cart.map((item, i) => (
        <div key={`${item.id}-${i}`} className={styles.cartItem}>
          {item.image && (
            <Image
              src={item.image.url}
              alt={item.name}
              width={60}
              height={40}
              className={styles.cartImage}
            />
          )}
          <p className={styles.cartName}>
            {item.name} — {item.price}円
          </p>
          <button
            className={styles.deleteButton}
            onClick={() => removeFromCart(i)}
          >
            削除
          </button>
        </div>
      ))}
      {/* 👇 合計金額 */}
      <p className={styles.totalPrice}>
        合計金額：{getTotalPrice()}円
      </p>
    </>
  )}
</aside>

    </div>
  );
}
