import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";

interface TooltipProps {
  children: React.ReactNode;
  variant?: "default" | "round";
  theme?: "default" | "black";
}

const TooltipComponent = ({ children, variant, theme }: TooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent variant={variant} theme={theme}>
          저 뒤로 가용?
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default TooltipComponent;
