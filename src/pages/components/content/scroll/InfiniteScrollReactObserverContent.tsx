import { useEffect, useRef, useState } from 'react';
import { Card, Skeleton } from '../../../../components/ui';
import { getUsers } from '../../../../api/user';
import { useInView } from 'react-intersection-observer';
import CardComponent from '../../../../components/basic/CardComponent';

const InfiniteScrollReactObserverContent = (): React.ReactElement => {
  const [items, setItems] = useState<{ name: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const env = process.env.NODE_ENV;

  const { ref, inView, entry } = useInView({ threshold: 0.5 });

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
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (inView) {
      console.log('inView state 확인!', inView);

      getItems();
    }
  }, [inView]);

  return (
    <div className="pb-24 text-left">
      <div className="px-3 pb-7">
        <div className="font-semibold mb-3">react-intersection-observer</div>
        <ul className="list-disc list-inside">
          <li>Intersection Observer API 의 React 구현 라이브러리</li>
          <li>
            관찰 객체 하나를 ref로 설정하고 해당 객체가 화면에 보이면 특정 코드
            실행
          </li>
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
        <div ref={ref} className="h-4"></div>
      </div>
    </div>
  );
};
export default InfiniteScrollReactObserverContent;
