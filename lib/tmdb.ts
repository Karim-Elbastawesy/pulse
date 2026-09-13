const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env.TMDB_BEARER_TOKEN!;

export async function fetchTMDB<T>(
  path: string,
  params?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${TMDB_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`TMDB fetch failed: ${path} → ${res.status}`);
  return res.json();
}

export function posterUrl(
  path: string | null,
  size: "w200" | "w342" | "w500" | "w780" | "original" = "w500",
) {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function backdropUrl(
  path: string | null,
  size: "w780" | "w1280" | "original" = "w1280",
) {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
