import fetch from 'node-fetch';

export interface TrackItem {
  position: number;
  streams: number;
  playedMs: number;
  indicator: unknown;
  track: {
    albums: Array<Record<string, unknown>>;
    artists: Array<Record<string, unknown>>;
    durationMs: number;
    explicit: boolean;
    externalIds: Record<'spotify' | 'appleMusic', string[]>;
    id: number;
    name: string;
    spotifyPopularity: number;
    spotifyPreview: string;
    appleMusicPreview: string;
  };
}

export default async function getTracks(): Promise<TrackItem[]> {
  const response = await fetch(
    `https://beta-api.stats.fm/api/v1/users/${process.env.USER_ID}/top/tracks?range=weeks`,
  );

  const json = (await response.json()) as { items: TrackItem[] };

  const items = json.items.sort((a, b) => b.playedMs - a.playedMs).slice(0, 5);

  return items;
}
