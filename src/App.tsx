import { useLocation } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import Router from './router';
import ModalComponent from './components/modal/ModalComponent';
import { cn } from './utils/cn';
import { useDeviceMediaQuery } from './hook/mediaQuery';
import { Separator } from './components/ui';

function App() {
  const currentPath = useLocation();
  const isMobile = useDeviceMediaQuery().isMobile;

  return (
    <div className="App">
      <article
        className={cn([
          'w-full min-h-[80vh] mx-auto bg-white flex-1',
          isMobile ? 'w-[360px]' : 'w-[768px]',
        ])}
      >
        <header>
          <Header pathName={currentPath.pathname} />
        </header>
        <section>
          <Router />
        </section>
        <section>
          <ModalComponent />
        </section>
      </article>
      <footer className="mt-auto p-4 pb-5 text-gray-500">
        <Separator className="my-8" />
        Github | @yjink12
      </footer>
    </div>
  );
}

export default App;
