import { useEffect, useRef, useState } from 'react';
import { Card, Skeleton } from '../../../../components/ui';
import { getUsers } from '../../../../api/user';

const InfiniteScrollContent = (): React.ReactElement => {
  const [items, setItems] = useState<{ name: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(13);
  const [isLast, setIsLast] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const env = process.env.NODE_ENV;

  // 무한 스크롤 함수
  const handleScroll = (): void => {
    const scrollCurrent = scrollRef.current;
    if (!scrollCurrent || loading || isLast) return;
    const { clientHeight, scrollHeight, scrollTop } = scrollCurrent;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      setLoading(true);
      setPage(page + 1);
    }
  };

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

    if (data.data.length === 0) {
      setIsLast(true);
    } else {
      setItems((items) => [...items, ...data.data]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getItems();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="pb-24 text-left">
      <div className="px-3 pb-7">
        <div className="font-semibold mb-3">Scroll Event</div>
        <ul className="list-disc list-inside">
          <li>현재 스크롤 감지</li>
          <li>페이지 끝에 가까워지면 데이터 추가로 로드</li>
        </ul>
      </div>
      <div ref={scrollRef}>
        {items.map((item, index) => (
          <Card key={`item-${index}`} className="p-4">
            <div className="flex flex-row gap-6">
              <div className="text-gray-500">{item.name} : </div>
              <div>{item.content}</div>
            </div>
          </Card>
        ))}
        {loading && (
          <div>
            <Skeleton className="h-[58px] w-full rounded-xl" />
          </div>
        )}
      </div>
    </div>
  );
};
export default InfiniteScrollContent;
