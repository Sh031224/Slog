import getAxiosMock from "@slog/testing-utils";

import BadRequestError from "@/models/error/bad-request-error";
import UnauthorizedError from "@/models/error/unauthorized-error";

import FacebookLogin from "../facebook-login";

describe("facebook-login.ts", () => {
  const facebookLogin = new FacebookLogin();
  const token = "accessToken";
  const api = `https://graph.facebook.com/v7.0/me?access_token=${token}&fields=id,name&format=json&method=get&transport=cors`;

  const mockAxios = getAxiosMock();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("facebook login success", async () => {
    const id = "123";
    const name = "tester";

    mockAxios.onGet(api).reply(200, { id, name });

    const result = await facebookLogin.getInfo(token);

    expect(result.id).toBe(id);
    expect(result.name).toBe(name);
  });

  it("facebook login failure by facebook", async () => {
    const error = "message";

    mockAxios.onGet(api).reply(200, { error: error });

    await expect(facebookLogin.getInfo(token)).rejects.toThrowError(new UnauthorizedError(error));
  });

  it("facebook login failure by invalid token", async () => {
    const error = "Request failed with status code 400";

    mockAxios.onGet(api).reply(400);

    await expect(facebookLogin.getInfo(token)).rejects.toThrowError(new BadRequestError(error));
  });
});
