import 'dotenv/config';

import todec from '2dec';

import getArtists from './lib/getArtists';
import getTracks from './lib/getTracks';
import updateGist from './lib/updateGist';
import table from './utils/table';

const artists = await getArtists();
const artistsData = [];

for (const artist of artists)
  artistsData.push([
    artist.artist.name,
    `${todec(artist.playedMs / 3600000, 1)}h`,
  ]);

const artistsResult = await updateGist(
  process.env.GIST_ID_ARTISTS as string,
  'artists',
  table(artistsData),
);
if (!artistsResult) throw new Error('Failed to update artist gist');

const tracks = await getTracks();
const tracksData = [];

for (const track of tracks)
  tracksData.push([track.track.name, `${todec(track.playedMs / 3600000, 1)}h`]);

const tracksResult = await updateGist(
  process.env.GIST_ID_TRACKS as string,
  'tracks',
  table(tracksData),
);
if (!tracksResult) throw new Error('Failed to update track gist');
