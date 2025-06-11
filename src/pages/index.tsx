import { useState } from 'react';
import { Menubar, MenubarMenu, MenubarTrigger } from '../components/ui';
import { MenuContainer, MenuName } from './components/MenuContainer';
import { menuBarList } from '../utils/data';

const MainPage = (): React.ReactElement => {
  const [selectedMenu, setSelectedMenu] = useState<MenuName>('card');

  // 메뉴 클릭시
  const handleMenuSelected = (menu: string) => {
    console.log(menu);
    setSelectedMenu(menu as MenuName);
  };

  const SelectedContent = MenuContainer[selectedMenu];

  return (
    <div>
      <Menubar>
        {menuBarList.map((menu) => {
          return (
            <MenubarMenu key={menu.key}>
              <MenubarTrigger onClick={() => handleMenuSelected(menu.key)}>
                {menu.title}
              </MenubarTrigger>
            </MenubarMenu>
          );
        })}
      </Menubar>
      <div className="mt-4 pt-6 pl-7 pr-7">
        <SelectedContent />
      </div>
    </div>
  );
};
export default MainPage;
