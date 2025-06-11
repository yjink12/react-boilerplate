import { useEffect, useRef, useState } from 'react';
import { Card, Skeleton } from '../../../components/ui';
import { getUsers } from '../../../api/user';

const InfiniteScrollObserverContent = (): React.ReactElement => {
  const [items, setItems] = useState<{ name: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const env = process.env.NODE_ENV;
  // console.log('env', env);

  const getItems = async () => {
    setLoading(true);

    let data: any = null;
    if (env === 'development') {
      const response = await fetch(`/api/hi-users?size=${size}&page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      data = await response.json();
      console.log('data', data);
    } else {
      data = getUsers(size, page);
    }

    setItems((items) => [...items, ...data.data]);
    setLoading(false);
  };

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    getItems();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0, // 0일 때는 교차점이 한 번만 발생해도 실행
    });
    const observerTarget = document.getElementById('observer');

    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  return (
    <div className="pb-24">
      <div>
        {items.map((item, index) => (
          <Card key={`item-${index}`} className="p-4">
            <div className="flex flex-row gap-6">
              <div className="text-left text-gray-500">{item.name} : </div>
              <div>{item.content}</div>
            </div>
          </Card>
        ))}
        {loading && (
          <div>
            <Skeleton className="h-[58px] w-full rounded-xl" />
          </div>
        )}
        <div id="observer" className="h-4"></div>
      </div>
    </div>
  );
};
export default InfiniteScrollObserverContent;
