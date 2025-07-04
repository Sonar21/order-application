'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import StarRating from '@/app/components/StarRating';
import { FaArrowLeft } from 'react-icons/fa';
const MENU_API_URL = 'https://5o7lwwt7q4.microcms.io/api/v1/menus';

type MenuItem = {
  id: string;
  name: string;
  price: number;
  comment?: string;
  image?: { url: string; width: number; height: number };
  review?:number;
};

export default function ConfirmPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [item, setItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  // 単体取得
  useEffect(() => {
    fetch(`${MENU_API_URL}/${params.id}`, {
      headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY! },
    })
      .then(res => res.json())
      .then(data => setItem(data));
  }, [params.id]);

  if (!item) return <p className={styles.loading}>読み込み中…</p>;

  const addToCart = () => {
    // localStorage から既存のカートを取得
    const saved = localStorage.getItem('cart');
    const cart: MenuItem[] = saved ? JSON.parse(saved) : [];
    // 同じ商品を quantity 回だけ追加
    const updated = [
      ...cart,
      ...Array.from({ length: quantity }, () => item),
    ];
    localStorage.setItem('cart', JSON.stringify(updated));
    router.push('/');  // 完了したらメニュー画面へ戻る
  };

  return (
    

    <div className={styles.container}>
      <button className={styles.backIcon} onClick={() => router.back()}>
      <FaArrowLeft /> 戻る
    </button>
      <h1 className={styles.title}>注文確認</h1>

      {item.image && (
        <Image
          src={item.image.url}
          alt={item.name}
          width={item.image.width}
          height={item.image.height}
          className={styles.image}
        />
      )}

      <p className={styles.name}>{item.name}</p>
      <p className={styles.price}>{item.price}円</p>
      {item.comment && <p className={styles.comment}>{item.comment}</p>}

       {item.review && (
              <div className={styles.stars}>
                <StarRating rating={parseFloat(item.review)} />
              </div>
            )}
      <div className={styles.counter}>
        <button
          className={styles.button}
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
        >
        ー
        </button>
        <span className={styles.qty}>{quantity}</span>
        <button
          className={styles.button}
          onClick={() => setQuantity(q => q + 1)}
        >
        ＋
        </button>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.cancel}
          onClick={() => router.back()}
        >
          キャンセル
        </button>
        <button
          className={styles.confirm}
          onClick={addToCart}
        >
          カートに追加
        </button>
      </div>
    </div>
  );
}
