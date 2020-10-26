import { DocumentContext } from "next/document";

const GetCookie = async (ctx: DocumentContext): Promise<string[]> => {
  const promise = (value: string) => {
    return new Promise((resolve: (value: string) => void, reject) => {
      const cookieValue = value.split("=");

      if (cookieValue[1] && cookieValue[0] === "access_token") {
        resolve(cookieValue[1]);
      } else {
        resolve("");
      }
    });
  };
  const promises: Array<Promise<string>> = ctx.req.headers.cookie
    .split(/; /)
    .map((value: string) => {
      return promise(value);
    });

  return await Promise.all(promises);
};

export default GetCookie;
