/** Shape returned by /api/google-reviews (see api/google-reviews.ts). */
export type GoogleReview = {
  author: string;
  authorUri: string | null;
  photoUri: string | null;
  rating: number;
  text: string;
  relativeTime: string | null;
  publishTime: string | null;
};

export type GoogleReviewsPayload = {
  rating: number | null;
  userRatingCount: number | null;
  mapsUri: string | null;
  reviews: GoogleReview[];
  fetchedAt: string;
};

/** Set VITE_REVIEWS_API=true once api/google-reviews.ts is deployed with its server env vars. */
export const reviewsApiEnabled = import.meta.env.VITE_REVIEWS_API === 'true';

export async function fetchGoogleReviews(signal: AbortSignal): Promise<GoogleReviewsPayload | null> {
  if (!reviewsApiEnabled) return null;
  try {
    const res = await fetch('/api/google-reviews', { signal, headers: { Accept: 'application/json' } });
    if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) return null;
    return (await res.json()) as GoogleReviewsPayload;
  } catch {
    return null;
  }
}
