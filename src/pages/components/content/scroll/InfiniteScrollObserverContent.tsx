import { useEffect, useRef, useState } from 'react';
import { Card, Skeleton } from '../../../../components/ui';
import { getUsers } from '../../../../api/user';
import CardComponent from '../../../../components/basic/CardComponent';

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
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/?limit=${size}&format=json&page=${page}&order=DESC`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '17d94b92-754f-46eb-99a0-65be65b5d18f',
        },
      }
    );
    data = await response.json();
    // console.log('data', data);

    const getData = data.map((catImg: { id: string; url: string }) => ({
      label: catImg.id,
      value: catImg.url,
    }));

    setItems((items) => [...items, ...getData]);
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
    <div className="pb-24 text-left">
      <div className="px-3 pb-7">
        <div className="font-semibold mb-3">Intersection Observer API</div>
        <ul className="list-disc list-inside">
          <li>
            특정 요소가 뷰포트에 나타나는 시점을 감지하고, 해당 시점에 새로운
            데이터 로드하는 방식
          </li>
          <li>사용자의 스크롤 동작을 감지</li>
        </ul>
      </div>
      <div className="flex flex-row flex-wrap justify-between">
        {items.map((item, index) => (
          <div
            className="md:w-[30%] w-[48%] md:h-[200px] h-[150px]"
            key={`item-${index}`}
          >
            <CardComponent type={'image'} data={[item]} />
          </div>
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
