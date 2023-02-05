import type { PostDto, GetPostsParams } from "@slog/types";
import type { Request } from "express";
import { type FindManyOptions, Like } from "typeorm";

import Post from "@/models/entity/post";
import BadRequestError from "@/models/error/bad-request-error";
import ForbiddenError from "@/models/error/forbidden-error";
import NotFoundError from "@/models/error/not-found-error";
import CategoryRepository from "@/repositories/category-repository";
import PostRepository from "@/repositories/post-repository";

import PostViewService from "./post-view-service";

export default class PostService {
  private postViewService: PostViewService;
  private postRepository: PostRepository;
  private categoryRepository: CategoryRepository;

  constructor() {
    this.postViewService = new PostViewService();
    this.postRepository = new PostRepository();
    this.categoryRepository = new CategoryRepository();
  }

  getPost = async (req: Request, idx: number) => {
    const post = await this.postRepository.findByIdx(idx);

    if (!post) throw new NotFoundError(`${idx} is not found`);

    if (!req.user?.isAdmin && post.isTemp)
      throw new ForbiddenError("Only admin can access temp post");

    if (!post.isTemp) {
      const view = await this.postViewService.update(req, post);

      post.view = view;

      await this.postRepository.save(post);
    }

    return post;
  };

  getPosts = async (params: GetPostsParams) => {
    const queryConditions: FindManyOptions<Post> = {
      where: {
        isTemp: typeof params.isTemp === "undefined" ? false : params.isTemp,
        categoryIdx: undefined,
        title: params.title ? Like(`%${params.title}%`) : undefined
      },
      order: {
        createdAt: "DESC",
        view: params.order === "hit" ? "DESC" : undefined
      },
      skip: (params.page - 1) * params.limit,
      take: params.limit
    };

    if (params.category) {
      const category = await this.categoryRepository.findByIdx(params.category);

      if (!category) throw new BadRequestError(`${params.category} category is not exist`);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Object.assign(queryConditions.where!, { categoryIdx: category.idx });
    }

    return this.postRepository.findAndCount(queryConditions);
  };

  create = async (postDto: PostDto) => {
    const category = await this.categoryRepository.findByIdx(postDto.categoryIdx);

    if (!category) throw new BadRequestError(`${postDto.categoryIdx} category is not exist`);

    const post = new Post();

    post.type = postDto.type;
    post.title = postDto.title;
    post.description = postDto.description;
    post.categoryIdx = category.idx;
    post.thumbnail = postDto.thumbnail ?? "";
    post.content = postDto.content ?? "";
    post.externalUrl = postDto.externalUrl;
    post.isTemp = postDto.isTemp ?? false;

    return this.postRepository.save(post);
  };

  update = async (idx: number, postDto: PostDto) => {
    const category = await this.categoryRepository.findByIdx(postDto.categoryIdx);

    if (!category) throw new BadRequestError(`${postDto.categoryIdx} category is not exist`);

    const post = await this.postRepository.findByIdx(idx);

    if (!post) throw new NotFoundError(`${idx} post is not found`);

    // temp post to default post
    if (post.isTemp && !postDto.isTemp) post.createdAt = new Date();

    post.updatedAt = new Date();
    post.type = postDto.type;
    post.title = postDto.title;
    post.description = postDto.description;
    post.categoryIdx = category.idx;
    post.thumbnail = postDto.thumbnail;
    post.content = postDto.content;
    post.externalUrl = postDto.externalUrl;
    post.isTemp = postDto.isTemp ?? false;

    return this.postRepository.save(post);
  };

  delete = async (idx: number) => {
    const post = await this.postRepository.findByIdx(idx);

    if (!post) throw new NotFoundError(`${idx} post is not found`);

    return this.postRepository.delete(post);
  };
}
