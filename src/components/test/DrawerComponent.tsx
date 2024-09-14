import { useEffect, useState } from "react";
import { useTestStore } from "../../store/useTestStore";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  ScrollArea,
} from "../ui";
import ButtonComponent from "./ButtonComponent";
import { MockCheckupList } from "../../utils/mockData";
import FilterCheckboxComponent from "./FilterCheckboxComponent";
import clsx from "clsx";
import CalendarComponent from "../calendar/CalendarComponent";

const DrawerComponent = () => {
  const { setIsOpenDrawer } = useTestStore((state) => state);
  const isOpenDrawer = useTestStore((state) => state.isOpenDrawer);
  const drawerType = useTestStore((state) => state.drawerType);

  const [drawerData, setDrawerData] = useState<{
    key: string;
    title: string;
    description?: string;
  }>();

  const drawerDataList = [
    {
      key: "checkbox",
      title: "희망검사",
      description: "여러개 선택 가능?",
    },
    {
      key: "button",
      title: "지역선택",
    },
  ];

  useEffect(() => {
    const selectedDrawerData = drawerDataList.filter(
      (data) => data.key === drawerType
    );
    setDrawerData(selectedDrawerData[0]);
  }, [drawerType]);

  return (
    <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
      <DrawerContent
        className={clsx("", {
          [`h-full rounded-none`]: drawerType.includes("calendar"),
        })}
      >
        <DrawerClose asChild>
          <div className="flex flex-row justify-end mr-7 mt-1 cursor-pointer">
            <img
              src="/images/common/close.png"
              alt="drawer"
              className="w-4 h-4"
              onClick={() => setIsOpenDrawer(false)}
            />
          </div>
        </DrawerClose>
        <div className="mx-auto w-full max-w-sm pb-3">
          <DrawerHeader className="flex flex-col items-start">
            <DrawerTitle>{drawerData?.title}</DrawerTitle>
            <DrawerDescription
              hidden={drawerData?.description !== undefined ? false : true}
            >
              {drawerData?.description}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-3">
            {drawerType.includes("calendar") && <CalendarComponent />}
            {drawerType === "button" && <ButtonComponent />}
          </div>
          {drawerType === "checkbox" && (
            <ScrollArea className="h-80 w-full rounded-md border-none px-5 pb-3">
              <FilterCheckboxComponent
                cols={2}
                type={"none"}
                data={MockCheckupList}
              />
            </ScrollArea>
          )}
          <DrawerFooter>
            <Button size={"lg"} onClick={() => setIsOpenDrawer(false)}>
              확인
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default DrawerComponent;
