type MockResponse = {
  status?: jest.Mock<any>;
  json?: jest.Mock<any>;
  end?: jest.Mock<any>;
  cookie?: jest.Mock<any>;
};

export const getMockResponse = () => {
  const res: MockResponse = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res;
};
