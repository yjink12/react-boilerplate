import uuid from "react-uuid";
import { cn } from "../utils/cn";
import { Separator } from "./ui";

interface StepsProps {
  stage: number;
  current: number;
}

const StepsComponent = ({ stage, current }: StepsProps) => {
  const stages = Array.from({ length: stage * 2 - 1 }, (_, i) => i + 1);

  return (
    <div>
      <div className={`flex flex-row justify-between`}>
        {stages.map((stage, index) => (
          <div className={`flex flex-row`} key={uuid()}>
            {index % 2 === 0 ? (
              <div
                className={cn([
                  "h-8 w-8 font-bold rounded-2xl text-lg",
                  current === stage - index / 2
                    ? "bg-blue-400 text-white"
                    : "bg-slate-300 text-white",
                ])}
              >
                {stage - index / 2}
              </div>
            ) : (
              <div>
                {index !== stages.length - 1 && (
                  <Separator className="w-24 mt-4" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default StepsComponent;
