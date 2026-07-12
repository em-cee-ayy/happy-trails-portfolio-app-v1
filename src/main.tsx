import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { OnboardingOne } from './screens/OnboardingOne';
import { OnboardingTwo } from './screens/OnboardingTwo';
import { HomeScreen } from './screens/HomeScreen';
import { CheckInScreen } from './screens/CheckInScreen';
import { ProcessingScreen } from './screens/ProcessingScreen';
import { TrailDetailScreen } from './screens/TrailDetailScreen';
import { ActiveHikeScreen } from './screens/ActiveHikeScreen';
import { PostHikeScreen } from './screens/PostHikeScreen';
import { InsightsScreen } from './screens/InsightsScreen';
import { NoMatchScreen } from './screens/NoMatchScreen';
import { ComponentsScreen } from './screens/ComponentsScreen';
import { MapScreen } from './screens/MapScreen';
import { FeedScreen } from './screens/FeedScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import './index.css';

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <OnboardingOne /> },
      { path: '/onboarding-2', element: <OnboardingTwo /> },
      { path: '/home', element: <HomeScreen /> },
      { path: '/check-in', element: <CheckInScreen /> },
      { path: '/processing', element: <ProcessingScreen /> },
      { path: '/trail/:id', element: <TrailDetailScreen /> },
      { path: '/hike/:id', element: <ActiveHikeScreen /> },
      { path: '/post-hike', element: <PostHikeScreen /> },
      { path: '/map', element: <MapScreen /> },
      { path: '/feed', element: <FeedScreen /> },
      { path: '/profile', element: <ProfileScreen /> },
      { path: '/insights', element: <InsightsScreen /> },
      { path: '/no-match', element: <NoMatchScreen /> },
      { path: '/components', element: <ComponentsScreen /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
