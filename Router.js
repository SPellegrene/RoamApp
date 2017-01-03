import { createRouter } from '@exponent/ex-navigation';
import HomePage from './HomePage';
import MapPage from './MapPage';



 const Router = createRouter(() => ({
  home: () => HomePage,
  map: () => MapPage,
}));

export default Router;
