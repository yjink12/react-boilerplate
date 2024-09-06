import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TooltipComponent from "../components/test/TooltipComponent";

interface HeaderProps {
  pathName: string;
}

const pageTitleList = [
  {
    path: "/test",
    title: "테스트 페이지",
  },
  {
    path: "/test/checkup",
    title: "문진 페이지",
  },
];

const Header = ({ pathName }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-cols-2 text-left px-6 py-5">
      <div className="col-span-1 pr-4">
        <TooltipComponent variant="round" theme="black">
          <LeftOutlined
            className="text-2xl mt-0.5"
            onClick={() => navigate(-1)}
          />
        </TooltipComponent>
      </div>
      <h4 className="col-span-1 text-xl font-bold">
        {pageTitleList.find((page) => page.path === pathName)?.title}
      </h4>
    </div>
  );
};
export default Header;
