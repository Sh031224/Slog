const GetCookie = async (ctx: any): Promise<string> => {
  const promise = (value: string) => {
    return new Promise((resolve, reject) => {
      const cookieValue = value.split("=");

      if (cookieValue[1] && cookieValue[0] === "access_token") {
        resolve(cookieValue[1]);
      }
    });
  };
  const promises = ctx.req.headers.cookie.split(/; /).map((value: string) => {
    return promise(value);
  });

  return await Promise.race(promises);
};

export default GetCookie;
