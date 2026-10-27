/**
 * Serverless function (Vercel `api/` convention, Web Request/Response API).
 * Fetches rating, review count and up to 5 reviews from the Google Places API (New).
 * The API key never reaches the browser.
 *
 * Env: GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID (ChIJ…), optional REVIEWS_CACHE_SECONDS.
 * Google Maps Platform terms limit caching of Places content; keep the cache short
 * and review https://cloud.google.com/maps-platform/terms before raising it.
 */

type PlacesReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

type PlaceDetails = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

const json = (body: unknown, status: number, cacheSeconds = 0) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cacheSeconds > 0 ? `public, max-age=${cacheSeconds}` : 'no-store',
    },
  });

export async function GET(): Promise<Response> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return json({ error: 'not_configured' }, 503);

  const cacheSeconds = Math.max(0, Number(process.env.REVIEWS_CACHE_SECONDS ?? 600) || 0);

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return json({ error: 'upstream', status: res.status }, 502);

    const place = (await res.json()) as PlaceDetails;
    return json(
      {
        rating: place.rating ?? null,
        userRatingCount: place.userRatingCount ?? null,
        mapsUri: place.googleMapsUri ?? null,
        reviews: (place.reviews ?? [])
          .filter((r) => (r.text?.text || r.originalText?.text) && r.authorAttribution?.displayName)
          .map((r) => ({
            author: r.authorAttribution!.displayName!,
            authorUri: r.authorAttribution?.uri ?? null,
            photoUri: r.authorAttribution?.photoUri ?? null,
            rating: r.rating ?? 0,
            text: (r.text?.text || r.originalText?.text)!,
            relativeTime: r.relativePublishTimeDescription ?? null,
            publishTime: r.publishTime ?? null,
          })),
        fetchedAt: new Date().toISOString(),
      },
      200,
      cacheSeconds,
    );
  } catch {
    return json({ error: 'unavailable' }, 504);
  }
}
