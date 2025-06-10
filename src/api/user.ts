const mockHiUsers = Array.from({ length: 50 }, (_, i) => ({
  name: `User ${i + 1}`,
  content: `안녕하세요 ${i + 1}`,
}));

export const getUsers = (size: number, page: number) => {
  const start = size * (page - 1);
  const end = start + size;
  const totalCount = mockHiUsers.length;

  const userList = mockHiUsers.slice(start, end);

  return {
    size: size,
    page: page,
    total: totalCount,
    data: userList,
  };
};
