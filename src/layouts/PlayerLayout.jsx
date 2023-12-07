import PlayerNavigation from '../components/PlayerNavigation';
import { Outlet } from 'react-router-dom';

function PlayerLayout() {
  return (
    <>
      <PlayerNavigation />
      <Outlet />
    </>
  );
}

export default PlayerLayout;
