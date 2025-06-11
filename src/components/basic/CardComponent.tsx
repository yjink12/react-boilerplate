import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Skeleton,
} from '../ui';
import { phoneNumWithHyphen } from '../../utils/helper';
import clsx from 'clsx';
import { useState } from 'react';

interface CardProps {
  type: 'default' | 'info' | 'image' | undefined | null;
  title?: string;
  data: { [key: string]: string }[];
}

const CardComponent = ({ type, title, data }: CardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  return (
    <div>
      <Card className="w-full">
        <CardHeader variant={type}>
          <CardTitle variant={'info'} textSize={'md'} className="font-bold">
            {title}
          </CardTitle>
        </CardHeader>
        {type !== 'image' && (
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
                        [`text-right`]: type === 'default',
                      }
                    )}
                  >
                    {item.key === 'hpNo'
                      ? phoneNumWithHyphen(item.value)
                      : item.value}
                  </div>
                </div>
                {index !== data.length - 1 && type !== 'default' && (
                  <Separator />
                )}
              </div>
            ))}
          </CardContent>
        )}
        {type === 'image' && (
          <CardContent className="px-4 py-2 md:h-[180px] h-[130px]">
            <div className="col-span-1 font-semibold text-slate-800 text-center break-keep leading-relaxed">
              {data[0].label}
            </div>
            <div className="md:w-[179px] w-[100px] md:h-[119px] h-[80px] mx-auto overflow-hidden">
              {isLoading && !imageError && (
                <Skeleton className="h-full w-full rounded-xl" />
              )}
              <img
                src={data[0].value}
                alt={`cat image-${data[0].label}` || 'cat image'}
                className="w-full h-full object-cover"
                onLoad={(e) => {
                  setIsLoading(false);
                }}
                onError={() => {
                  setIsLoading(false);
                  setImageError(true);
                }}
              />
            </div>
          </CardContent>
        )}
        {/* <CardFooter className="flex justify-between"></CardFooter> */}
      </Card>
    </div>
  );
};
export default CardComponent;
