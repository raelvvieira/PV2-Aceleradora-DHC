import React from 'react';
import { Star } from 'lucide-react';

interface ReviewStarsProps {
  rating: number; // 0 to 5
  onChange?: (rating: number) => void;
  interactive?: boolean;
  size?: number;
}

export function ReviewStars({
  rating,
  onChange,
  interactive = false,
  size = 18
}: ReviewStarsProps) {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const displayRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex items-center gap-1" id="review-stars-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          id={`star-btn-${star}`}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(null)}
          className={`transition-all duration-150 ${
            interactive ? 'cursor-pointer hover:scale-115 active:scale-90' : 'cursor-default'
          } focus:outline-hidden`}
        >
          <Star
            size={size}
            className={`transition-colors duration-150 ${
              star <= displayRating
                ? 'fill-amber-400 text-amber-400 filter drop-shadow-[0_0_2px_rgba(251,191,36,0.3)]'
                : 'text-zinc-300 dark:text-zinc-600 fill-transparent'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
