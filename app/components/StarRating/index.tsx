// components/StarRating.tsx
"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import styles from "./index.module.css";
type Props = {
  rating: number;
};

const StarRating = ({ rating }: Props) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    const filled = rating - i;

    if (filled >= 1) {
      stars.push(<FontAwesomeIcon icon={solidStar} key={i} color="#fbbf24" />);
    } else if (filled >= 0.5) {
      stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key={i} color="#fbbf24" />);
    } else {
      stars.push(<FontAwesomeIcon icon={regularStar} key={i} color="#fbbf24" />);
    }
  }

  return (
     <div
    className={styles.starContainer}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      {stars}
      <span style={{ fontSize: '0.9rem', color: '#555' }}>{rating.toFixed(1)} / 5</span>
    </div>
  </div>
  );
};

export default StarRating;
