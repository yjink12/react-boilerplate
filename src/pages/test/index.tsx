import { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import CheckboxComponent from "../../components/CheckboxComponent";
import {
  Button,
  Input,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  Separator,
  Skeleton,
} from "../../components/ui";
import { useTestStore } from "../../store/useTestStore";
import RadioComponent from "../../components/RadioComponent";
import FormComponent from "../../components/test/FormComponent";
import {
  MockCheckupList,
  MockDsseList,
  MockReserveUserInfo,
  MockReserveUserInfoLabel,
  MockTermsList,
  MockUserInfo,
  MockUserInfoLabel,
} from "../../utils/mockData";
import StepsComponent from "../../components/StepsComponent";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const navigate = useNavigate();
  const [selectMenu, setSelectMenu] = useState("");
  const { filterData, setIsOpenDrawer, setDrawerType, resetFilterData } =
    useTestStore((state) => state);

  // button filter
  const onClickResetFilter = () => {
    console.log("filter ?>??");
    // 초기화
    resetFilterData();
  };

  // button filter label 가공
  const handleButtonFilterLabel = (data: {
    key: string;
    label: string;
    value: number[];
    type: string;
  }) => {
    if (data.key === "checkup") {
      const count =
        data.value.length > 0 && !data.value.includes(0)
          ? data.value.length
          : "";
      return `${data.label} ${count}`;
    } else {
      return data.label;
    }
  };

  const onClickMenu = (menu: string) => {
    console.log(menu);
    console.log("???????");
    setSelectMenu(menu);
  };

  // steps
  const [stage, setStage] = useState(3);
  const [currentStage, setCurrentStage] = useState(1);

  // steps
  const next = () => {
    setCurrentStage(currentStage + 1);
  };
  const prev = () => {
    setCurrentStage(currentStage - 1);
  };
  const done = () => {
    alert("예약 완료");
  };

  // 예약자 정보 (Card)
  const reserveUserInfoTitle = "예약자 정보";
  const [reserveUserInfo, setReserveUserInfo] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<any[]>([]);

  /** 예약자 정보 데이터 가공 (Card) */
  const handleReserveUserInfo = () => {
    let newReserveUserInfo: {
      key: string;
      label: string;
      value: string;
      highlight: boolean;
    }[] = [];
    MockReserveUserInfoLabel.map((info) => {
      newReserveUserInfo.push({
        key: info.key,
        label: info.label,
        value: MockReserveUserInfo[info.key].value,
        highlight: MockReserveUserInfo[info.key].highlight,
      });
    });
    setReserveUserInfo(newReserveUserInfo);
  };

  /** 회원 정보 데이터 가공 (Card) */
  const handleUserInfo = () => {
    let newUserInfo: {
      key: string;
      label: string;
      value: string;
      highlight: boolean;
    }[] = [];
    MockUserInfoLabel.map((info) => {
      newUserInfo.push({
        key: info.key,
        label: info.label,
        value: MockUserInfo[info.key].value,
        highlight: MockUserInfo[info.key].highlight,
      });
    });
    setUserInfo(newUserInfo);
  };

  // 질환 mock data
  const [dsseList, setDsseList] = useState<
    { id: number; label: string; checked: boolean; disabled: boolean }[]
  >([]);

  useEffect(() => {
    // (Card)
    handleUserInfo();
    handleReserveUserInfo();
    setSelectMenu("card");
    let newDsseList = [];
    newDsseList.push(
      {
        id: 0,
        label: "해당 사항 없음",
        checked: false,
        disabled: false,
      },
      ...MockDsseList
    );
    console.log("newDsseList", newDsseList);
    setDsseList(newDsseList);
  }, []);

  // checkbox

  return (
    <div>
      <Menubar>
        <MenubarMenu key={"card"}>
          <MenubarTrigger onClick={() => onClickMenu("card")}>
            Card
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu key={"drawer"}>
          <MenubarTrigger onClick={() => onClickMenu("drawer")}>
            Drawer
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu key={"checkbox"}>
          <MenubarTrigger onClick={() => onClickMenu("checkbox")}>
            Checkbox
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu key={"radio"}>
          <MenubarTrigger onClick={() => onClickMenu("radio")}>
            Radio
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu key={"form"}>
          <MenubarTrigger onClick={() => onClickMenu("form")}>
            Form
          </MenubarTrigger>
        </MenubarMenu>
        {/* <MenubarMenu>
          <MenubarTrigger onClick={() => onClickMenu("select")}>
            Select
          </MenubarTrigger>
        </MenubarMenu> */}
        <MenubarMenu key={"steps"}>
          <MenubarTrigger onClick={() => onClickMenu("steps")}>
            Steps
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu key={"calendar"}>
          <MenubarTrigger onClick={() => onClickMenu("calendar")}>
            Calendar
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu key={"filter"}>
          <MenubarTrigger onClick={() => onClickMenu("filter")}>
            Filter
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu key={"skeleton"}>
          <MenubarTrigger onClick={() => onClickMenu("skeleton")}>
            Skeleton
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu key={"checkup"}>
          <MenubarTrigger onClick={() => onClickMenu("checkup")}>
            Checkup
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      <div className="mt-20 pt-6 pl-7 pr-7">
        {selectMenu === "card" && (
          <div className="flex flex-col">
            <div className="font-semibold mb-5">[기본 정보 Card]</div>
            <CardComponent type={"default"} data={userInfo} />
            <Separator className="my-8" />
            <div className="font-semibold mb-5">[예약자 정보 Card]</div>
            <CardComponent
              type={"info"}
              title={reserveUserInfoTitle}
              data={reserveUserInfo}
            />
            <Separator className="my-8" />
          </div>
        )}
        {selectMenu === "drawer" && (
          <Button
            onClick={() => {
              setIsOpenDrawer(true);
              setDrawerType("checkbox");
            }}
          >
            OPEN Drawer
          </Button>
        )}
        {selectMenu === "checkbox" && (
          <div className="flex flex-col">
            <div className="font-semibold mb-5">[전체 선택 Checkbox] </div>
            <CheckboxComponent type={"all"} cols={1} data={MockTermsList} />
            <Separator className="my-4" />
            <div className="font-semibold mb-5">
              [초기화 checkbox - list 미포함(희망검사)]{" "}
            </div>
            <CheckboxComponent type={"none"} cols={2} data={MockCheckupList} />
            <Separator className="my-4" />
            <div className="font-semibold mb-5">
              [초기화 checkbox - list 포함(문진)]{" "}
            </div>
            <CheckboxComponent type={"default"} cols={2} data={dsseList} />
            <Separator className="my-4" />
          </div>
        )}
        {selectMenu === "radio" && <RadioComponent data={MockCheckupList} />}
        {selectMenu === "form" && <FormComponent />}
        {/* {selectMenu === "select" && <>select</>} */}
        {selectMenu === "steps" && (
          <div>
            <StepsComponent stage={stage} current={currentStage} />
            <div className="flex flex-row justify-center">
              {currentStage > 1 && (
                <Button className="mt-6" onClick={() => prev()}>
                  이전
                </Button>
              )}
              {currentStage < stage && (
                <Button className="mt-6" onClick={() => next()}>
                  다음
                </Button>
              )}
              {currentStage === stage && (
                <Button className="mt-6" onClick={() => done()}>
                  예약하기
                </Button>
              )}
            </div>
          </div>
        )}
        {selectMenu === "calendar" && (
          <div className="flex flex-col gap-4">
            <div className="font-semibold text-left">[1차 예약일] </div>
            <div className="flex flex-row gap-2">
              <Input placeholder="날짜선택" />
              <Button
                onClick={() => {
                  setIsOpenDrawer(true);
                  setDrawerType("calendar_first");
                }}
              >
                Open Calendar
              </Button>
            </div>
            <div className="font-semibold text-left">[2차 예약일] </div>
            <div className="flex flex-row gap-2">
              <Input placeholder="날짜선택" />
              <Button
                onClick={() => {
                  setIsOpenDrawer(true);
                  setDrawerType("calendar_second");
                }}
              >
                Open Calendar
              </Button>
            </div>
          </div>
        )}
        {selectMenu === "filter" && (
          <>
            <div className="flex flex-row">
              {filterData.map((data, index) => (
                <Button
                  key={uuid()}
                  variant={"outline"}
                  className="rounded-3xl mr-2"
                  onClick={() => {
                    setIsOpenDrawer(true);
                    setDrawerType(data.type);
                  }}
                >
                  {handleButtonFilterLabel(data)}
                </Button>
              ))}
              <Button
                className="rounded-3xl mr-2"
                onClick={() => onClickResetFilter()}
              >
                필터초기화
              </Button>
            </div>
            <Separator className="my-8" />
            <div className="mt-5">
              {filterData.map((data, index) => (
                <div key={uuid()}>
                  {data.label}
                  {data.value.map((value, index) => {
                    return <div>{value}</div>;
                  })}
                </div>
              ))}
            </div>
          </>
        )}
        {selectMenu === "skeleton" && (
          <div>
            <div className="pb-8">
              <div className="font-semibold mb-5 text-left">
                [Round Skeleton]{" "}
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            </div>
            <div className="pb-8">
              <div className="font-semibold mb-5 text-left">
                [Text Skeleton]{" "}
              </div>
              <div className="flex items-center space-x-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[240px]" />
                  <Skeleton className="h-4 w-[220px]" />
                </div>
              </div>
            </div>
            <div className="pb-8">
              <div className="font-semibold mb-5 text-left">
                [Card Skeleton]{" "}
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              </div>
            </div>
          </div>
        )}
        {selectMenu === "checkup" && (
          <Button onClick={() => navigate("/test/checkup")}>
            문진표 작성 페이지로 이동
          </Button>
        )}
      </div>
    </div>
  );
};
export default TestPage;
