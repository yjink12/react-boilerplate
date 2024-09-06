import { useEffect, useState } from "react";
import { useTestStore } from "../../store/useTestStore";
import { MockLocationList } from "../../utils/mockData";
import { Button } from "../ui";
import uuid from "react-uuid";

const ButtonComponent = () => {
  const { filterData, setFilterData } = useTestStore((state) => state);
  const [locationId, setLocationId] = useState<number>();

  const onClickButton = (data: { id: number; label: string }) => {
    console.log("data 확인", data);

    const newFilterData = filterData.map((filter) => {
      console.log("filterData 확인", filter);
      return filter.key === "location"
        ? { ...filter, value: [data.id], label: data.label }
        : filter;
    });
    console.log("newFilterDtat", newFilterData);
    setFilterData(newFilterData);
    setLocationId(data.id);
  };

  useEffect(() => {
    filterData.map((filter) => {
      if (filter.key === "location") {
        setLocationId(filter.value[0]);
      }
    });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 pb-16">
      {MockLocationList.map((location, index) => (
        <Button
          className="rounded-lg shadow-md"
          variant={locationId === location.id ? "default" : "outline"}
          size={"lg"}
          key={uuid()}
          onClick={() => onClickButton(location)}
        >
          {location.label}
        </Button>
      ))}
    </div>
  );
};
export default ButtonComponent;
