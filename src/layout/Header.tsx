import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import TooltipComponent from '../components/basic/TooltipComponent';
import { useEffect, useState } from 'react';

interface HeaderProps {
  pathName: string;
}
interface PageInfoType {
  path: string;
  title: string;
  backPath?: string;
}

const pageInfoList: PageInfoType[] = [
  {
    path: '/',
    title: 'Component',
  },
  {
    path: '/reserve',
    title: '건강검진 예약하기',
    backPath: '/',
  },
];

const Header = ({ pathName }: HeaderProps) => {
  const navigate = useNavigate();
  const [currentPageInfo, setCurrentPageInfo] = useState<PageInfoType>();

  useEffect(() => {
    const pathPageMapping = pageInfoList.find((page) => page.path === pathName);
    setCurrentPageInfo(pathPageMapping);
  }, [pathName]);

  return (
    <div className="flex flex-cols-2 text-left px-4 pb-6 pt-9">
      {currentPageInfo?.backPath && (
        <div className="col-span-1 pr-4">
          <TooltipComponent variant="round" theme="black">
            <LeftOutlined
              className="text-2xl mt-0.5"
              onClick={() => navigate(currentPageInfo.backPath || '/')}
            />
          </TooltipComponent>
        </div>
      )}
      <div className="col-span-1 text-2xl font-bold">
        {currentPageInfo?.title || ''}
      </div>
    </div>
  );
};
export default Header;
