import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewDevicePage from '../pages/New';
import Home from '../pages/Home';
import UpdateDevicePage from '../pages/Update';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/new" element={<NewDevicePage />} />
          <Route path="/:deviceId" element={<UpdateDevicePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
