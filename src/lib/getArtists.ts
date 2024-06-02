import fetch from 'node-fetch';

export interface ArtistItem {
  position: number;
  streams: number;
  playedMs: number;
  indicator: unknown;
  artist: {
    externalIds: Record<'spotify' | 'appleMusic', string[]>;
    followers: number;
    genres: string[];
    id: number;
    image: string;
    name: string;
    spotifyPopularity: number;
  };
}

export default async function getArtists(): Promise<ArtistItem[]> {
  const response = await fetch(
    `https://beta-api.stats.fm/api/v1/users/${process.env.USER_ID}/top/artists?range=weeks`,
  );

  const json = (await response.json()) as { items: ArtistItem[] };

  const items = json.items.sort((a, b) => b.playedMs - a.playedMs).slice(0, 5);

  return items;
}
