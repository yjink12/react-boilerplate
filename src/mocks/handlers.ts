import { http, HttpResponse, RequestHandler } from 'msw';

const mockHiUsers = Array.from({ length: 50 }, (_, i) => ({
  name: `User ${i + 1}`,
  content: `안녕하세요 ${i + 1}`,
}));

export const handlers: RequestHandler[] = [
  http.get('/api/hi-users', ({ request }) => {
    const url = new URL(request.url);

    const size = Number(url.searchParams.get('size')); //5
    const page = Number(url.searchParams.get('page')); //1
    const totalCount = mockHiUsers.length; //12
    const totalPages = Math.round(totalCount / size); //2

    const start = size * (page - 1);
    const end = start + size;

    const userList = mockHiUsers.slice(start, end);

    return HttpResponse.json({
      size: size,
      page: page,
      total: totalCount,
      data: userList,
    });
  }),
];
