import { Card, CardContent, CardHeader, CardTitle, Separator } from "./ui";
import { phoneNumWithHyphen } from "../utils/helper";
import clsx from "clsx";

interface CardProps {
  type: "default" | "info" | undefined | null;
  title?: string;
  data: { [key: string]: string }[];
}

const CardComponent = ({ type, title, data }: CardProps) => {
  return (
    <div>
      <Card className="w-full">
        <CardHeader variant={type}>
          <CardTitle variant={"info"} textSize={"md"} className="font-bold">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-2">
          {data.map((item, index) => (
            <div key={`data_${index}`}>
              <div className="grid grid-cols-3 p-3">
                <div className="col-span-1 font-semibold text-slate-800 text-left break-keep leading-relaxed">
                  {item.label}
                </div>
                <div
                  className={clsx(
                    `col-span-2 break-keep text-left leading-relaxed`,
                    {
                      [`text-blue-700`]: item.highlight,
                      [`text-right`]: type === "default",
                    }
                  )}
                >
                  {item.key === "hpNo"
                    ? phoneNumWithHyphen(item.value)
                    : item.value}
                </div>
              </div>
              {index !== data.length - 1 && type !== "default" && <Separator />}
            </div>
          ))}
        </CardContent>
        {/* <CardFooter className="flex justify-between"></CardFooter> */}
      </Card>
    </div>
  );
};
export default CardComponent;
