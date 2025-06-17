import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
