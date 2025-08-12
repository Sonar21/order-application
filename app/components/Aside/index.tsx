"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import styles from "./index.module.css";
import { MenuItem } from "@/app/data/menu";
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

  // Group cart items by id to combine duplicates
  const groupedCart = cart.reduce((acc, item, index) => {
    const existing = acc.find((group) => group.id === item.id);
    if (existing) {
      // Ensure quantity is a number and handle potential undefined cases
      existing.quantity += Number(item.quantity ?? 1);
      existing.indices.push(index);
    } else {
      acc.push({
        ...item,
        quantity: Number(item.quantity ?? 1), // Default to 1 if undefined
        indices: [index],
      });
    }
    return acc;
  }, [] as (MenuItem & { quantity: number; indices: number[] })[]); // Explicitly define quantity as number

  const handleConfirmOrder = () => {
    router.push("/checkout");
  };

  const clearCart = () => {
    cart.forEach((_, i) => removeFromCart(i));
  };

  // Remove all instances of an item by its indices
  const removeItem = (indices: number[]) => {
    // Sort indices in descending order to avoid index shifting
    const sortedIndices = [...indices].sort((a, b) => b - a);
    sortedIndices.forEach((index) => removeFromCart(index));
  };

  return (
    <aside className={styles.cart}>
      <h2 className={styles.cartTitle}>注文状況</h2>
      {groupedCart.length === 0 ? (
        <p className={styles.empty}>まだ注文はありません。</p>
      ) : (
        <>
          {groupedCart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              {item.image && (
                <Image
                  src={item.image.url}
                  alt={item.name}
                  width={80}
                  height={80}
                  className={styles.cartImage}
                />
              )}
              <p className={styles.cartName}>
                {item.name} × {item.quantity} — {item.price * item.quantity}円
              </p>
              <button
                className={styles.deleteButton}
                onClick={() => removeItem(item.indices)}
              >
                <MdDeleteForever />
              </button>
            </div>
          ))}
          <div className={styles.cartTotal}>
            合計金額：{getTotalPrice()}円(税込)
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.clearCartButton}
              onClick={handleConfirmOrder}
            >
              注文を確定する
            </button>
            {/* <button className={styles.checkoutButton} onClick={clearCart}>
              カートを全て削除
            </button> */}
          </div>
        </>
      )}
    </aside>
  );
}