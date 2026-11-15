import { useEffect } from 'react';
import {
  HashRouter,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ScrollReveal from './components/ScrollReveal';
import { GameProvider } from './contexts/GameContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AboutScreen from './screens/AboutScreen';
import CareGuideScreen from './screens/CareGuideScreen';
import GrowthScreen from './screens/GrowthScreen';
import HarvestScreen from './screens/HarvestScreen';
import HomeScreen from './screens/HomeScreen';
import LessonScreen from './screens/LessonScreen';
import LibraryScreen from './screens/LibraryScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import PlantDetailsScreen from './screens/PlantDetailsScreen';
import PlantingGuideScreen from './screens/PlantingGuideScreen';
import QuizScreen from './screens/QuizScreen';
import SmallSpaceScreen from './screens/SmallSpaceScreen';
import WelcomeScreen from './screens/WelcomeScreen';

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(location.hash.slice(1));
        if (target) {
          target.scrollIntoView({ block: 'start' });
          return;
        }
        window.scrollTo(0, 0);
      });
      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [location.pathname, location.hash]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollManager />
      <ScrollReveal />
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/library" element={<LibraryScreen />} />
          <Route path="/plant/:plantId" element={<PlantDetailsScreen />} />
          <Route path="/plant/:plantId/planting" element={<PlantingGuideScreen />} />
          <Route path="/plant/:plantId/care" element={<CareGuideScreen />} />
          <Route path="/small-space" element={<SmallSpaceScreen />} />
          <Route path="/growth" element={<GrowthScreen />} />
          <Route path="/harvest" element={<HarvestScreen />} />
          <Route path="/quiz" element={<QuizScreen />} />
          <Route path="/lesson/:lessonId" element={<LessonScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </GameProvider>
    </ThemeProvider>
  );
}
