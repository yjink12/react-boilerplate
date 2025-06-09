import { useLocation } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import Router from './router';
import ModalComponent from './components/modal/ModalComponent';
import { cn } from './utils/cn';
import { useDeviceMediaQuery } from './hook/mediaQuery';

function App() {
  const currentPath = useLocation();
  const isMobile = useDeviceMediaQuery().isMobile;

  return (
    <div className="App">
      <div
        className={cn([
          'w-full h-auto mx-auto bg-white',
          isMobile ? 'w-[360px]' : 'w-[768px]',
        ])}
      >
        <Header pathName={currentPath.pathname} />
        <Router />
        <ModalComponent />
      </div>
    </div>
  );
}

export default App;
