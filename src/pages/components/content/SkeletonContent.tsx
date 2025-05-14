import { Skeleton } from '../../../components/ui';

const SkeletonContent = () => {
  return (
    <div>
      <div className="pb-8">
        <div className="font-semibold mb-5 text-left">[Round Skeleton] </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
      <div className="pb-8">
        <div className="font-semibold mb-5 text-left">[Text Skeleton] </div>
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[240px]" />
            <Skeleton className="h-4 w-[220px]" />
          </div>
        </div>
      </div>
      <div className="pb-8">
        <div className="font-semibold mb-5 text-left">[Card Skeleton] </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        </div>
      </div>
    </div>
  );
};
export default SkeletonContent;
