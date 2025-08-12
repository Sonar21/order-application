"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import styles from "./index.module.css";

type Props = {
  rating: number;
};

const StarRating = ({ rating }: Props) => {
  // Clamp rating between 0 and 5
  const safeRating = Math.max(0, Math.min(5, isNaN(rating) ? 0 : rating));
  const stars = [];

  for (let i = 0; i < 5; i++) {
    const filled = safeRating - i;

    if (filled >= 1) {
      stars.push(<FontAwesomeIcon icon={solidStar} key={i} color="#fbbf24" />);
    } else if (filled >= 0.5) {
      stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key={i} color="#fbbf24" />);
    } else {
      stars.push(<FontAwesomeIcon icon={regularStar} key={i} color="#fbbf24" />);
    }
  }

  return (
    <div className={styles.starContainer}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        {stars}
        <span style={{ fontSize: '0.9rem', color: '#555' }}>{safeRating.toFixed(1)} / 5</span>
      </div>
    </div>
  );
};

export default StarRating;