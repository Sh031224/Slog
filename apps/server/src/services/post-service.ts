import type { Request } from "express";
import type { PostDTO, GetPostsParams } from "shared-types";
import { type FindManyOptions, Like } from "typeorm";

import PostViewService from "./post-view-service";
import PostRepository from "../repositories/post-repository";
import NotFoundError from "../models/error/not-found-error";
import Post from "../models/entity/post";
import CategoryRepository from "../repositories/category-repositoy";
import BadRequestError from "../models/error/bad-request-error";
import ForbiddenError from "../models/error/forbidden-error";

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
        category: undefined,
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

      Object.assign(queryConditions.where!, { category: category });

      if (!category) throw new BadRequestError(`${params.category} category is not exist`);
    }

    return this.postRepository.findAndCount(queryConditions);
  };

  create = async (postDTO: PostDTO) => {
    const category = await this.categoryRepository.findByIdx(postDTO.categoryIdx);

    if (!category) throw new BadRequestError(`${postDTO.categoryIdx} category is not exist`);

    const post = new Post();

    post.type = postDTO.type;
    post.title = postDTO.title;
    post.description = postDTO.description;
    post.category = category;
    post.thumbnail = postDTO.thumbnail ?? "";
    post.content = postDTO.content ?? "";
    post.externalUrl = postDTO.externalUrl;
    post.isTemp = postDTO.isTemp ?? false;

    return this.postRepository.save(post);
  };

  update = async (idx: number, postDTO: PostDTO) => {
    const category = await this.categoryRepository.findByIdx(postDTO.categoryIdx);

    if (!category) throw new BadRequestError(`${postDTO.categoryIdx} category is not exist`);

    const post = await this.postRepository.findByIdx(idx);

    if (!post) throw new NotFoundError(`${idx} post is not found`);

    // temp post to default post
    if (post.isTemp && !postDTO.isTemp) post.createdAt = new Date();

    post.updatedAt = new Date();
    post.type = postDTO.type;
    post.title = postDTO.title;
    post.description = postDTO.description;
    post.category = category;
    post.thumbnail = postDTO.thumbnail;
    post.content = postDTO.content;
    post.externalUrl = postDTO.externalUrl;
    post.isTemp = postDTO.isTemp ?? false;

    return this.postRepository.save(post);
  };

  delete = async (idx: number) => {
    const post = await this.postRepository.findByIdx(idx);

    if (!post) throw new NotFoundError(`${idx} post is not found`);

    return this.postRepository.delete(post);
  };
}
