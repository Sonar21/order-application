// app/components/CartAside.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import styles from "./index.module.css"; // Create or reuse styles

import { MenuItem } from "@/app/data/menu"; // Adjust path as needed
import React from "react";

type CartAsideProps = {
  cart: MenuItem[];
  removeFromCart: (index: number) => void;
  getTotalPrice: () => number;
};

export default function CartAside({
  cart,
  removeFromCart,
  getTotalPrice,
}: CartAsideProps) {
  const router = useRouter();

  return (
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
                <MdDeleteForever />
              </button>
            </div>
          ))}

          <div className={styles.cartTotal}>
            合計金額：{getTotalPrice()}円(税込)
          </div>

          <button
            className={styles.checkoutButton}
            onClick={() => router.push("/checkout")}
          >
            会計する
          </button>
        </>
      )}
    </aside>
  );
}
