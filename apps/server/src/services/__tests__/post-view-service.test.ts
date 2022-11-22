import PostViewService from "@post-view-service";
import dayjs from "dayjs";

import Post from "@/models/entity/post";
import PostView from "@/models/entity/postView";

const countByPostIdx = jest.fn();
const findByIpAndPostIdx = jest.fn();
const create = jest.fn();

jest.mock("@/repositories/post-view-repository.ts", () => {
  return function () {
    return { countByPostIdx, findByIpAndPostIdx, create };
  };
});

describe("post-view-service.ts", () => {
  const postViewService = new PostViewService();

  const ip = "192.168.0.1";
  const post = new Post();
  post.view = 5;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("update", () => {
    describe("return and update view for post", () => {
      it("if postView is not found, create and update viewed", async () => {
        countByPostIdx.mockReturnValue(post.view);
        findByIpAndPostIdx.mockReturnValue(null);

        const result = await postViewService.update(
          { headers: { "x-forwarded-for": ip } } as any,
          post
        );

        expect(countByPostIdx).toBeCalledWith(post.idx);
        expect(findByIpAndPostIdx).toBeCalledWith(ip, post.idx);
        expect(create).toBeCalledWith(ip, post);
        expect(result).toBe(post.view + 1);
      });

      it("if postView.createdAt is over than now, create and update viewed", async () => {
        const postView = new PostView();
        postView.createdAt = dayjs().add(-91, "minutes").toDate();

        countByPostIdx.mockReturnValue(post.view);
        findByIpAndPostIdx.mockReturnValue(postView);

        const result = await postViewService.update(
          { headers: { "x-forwarded-for": ip } } as any,
          post
        );

        expect(countByPostIdx).toBeCalledWith(post.idx);
        expect(findByIpAndPostIdx).toBeCalledWith(ip, post.idx);
        expect(create).toBeCalledWith(ip, post);
        expect(result).toBe(post.view + 1);
      });

      it("if postView.createdAt is not over than now, do not create and update viewed", async () => {
        const postView = new PostView();
        postView.createdAt = dayjs().toDate();

        countByPostIdx.mockReturnValue(post.view);
        findByIpAndPostIdx.mockReturnValue(postView);

        const result = await postViewService.update(
          { headers: { "x-forwarded-for": ip } } as any,
          post
        );

        expect(countByPostIdx).toBeCalledWith(post.idx);
        expect(findByIpAndPostIdx).toBeCalledWith(ip, post.idx);
        expect(create).not.toBeCalled();
        expect(result).toBe(post.view);
      });
    });

    describe("error case for update function", () => {
      it("ip is undefined, do not update view", async () => {
        countByPostIdx.mockReturnValue(post.view);

        const result = await postViewService.update({ headers: {}, socket: {} } as any, post);

        expect(countByPostIdx).toBeCalledWith(post.idx);
        expect(result).toBe(post.view);
      });

      it("ip is array, use ip[0]", async () => {
        countByPostIdx.mockReturnValue(post.view);
        findByIpAndPostIdx.mockReturnValue(null);

        const result = await postViewService.update(
          { headers: {}, socket: { remoteAddress: [ip] } } as any,
          post
        );

        expect(countByPostIdx).toBeCalledWith(post.idx);
        expect(findByIpAndPostIdx).toBeCalledWith(ip, post.idx);
        expect(create).toBeCalledWith(ip, post);
        expect(result).toBe(post.view + 1);
      });
    });
  });
});
