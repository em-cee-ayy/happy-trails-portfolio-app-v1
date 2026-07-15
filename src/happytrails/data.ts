// Hard-coded trail data for the Happy Trails handoff sub-app.
// The featured (swipeable) trails carry ids so Trail Detail can resolve them from the URL.
import { P } from './tokens';

export interface HTTrail {
  id: string;
  name: string;
  park: string;
  dist: string;
  time: string;
  diff: string;
  rating: number;
  photo: string;
  elev: string;
}

export const HT_TRAILS: HTTrail[] = [
  { id: 't1', name: 'Emerald Lake Loop', park: 'Rocky Mountain NP', dist: '5.4 km', time: '1h 30m', diff: 'Easy', rating: 4.5, photo: P.meadow, elev: '+240m' },
  { id: 't2', name: 'Sky Pond Trail', park: 'Rocky Mountain NP', dist: '14.6 km', time: '6h 10m', diff: 'Hard', rating: 4.8, photo: P.alpineLake, elev: '+520m' },
  { id: 't3', name: 'Aspen Grove Path', park: 'Maroon Bells', dist: '3.2 km', time: '55m', diff: 'Easy', rating: 4.3, photo: P.aspens, elev: '+90m' },
];

export const getTrail = (id: string | undefined): HTTrail => HT_TRAILS.find((t) => t.id === id) ?? HT_TRAILS[0];
