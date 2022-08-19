import { Request } from "express";
import GoogleCloud from "../lib/google-cloud";
import BadRequestError from "../models/error/bad-request-error";

export default class ImageService {
  private googleCloud: GoogleCloud;

  constructor() {
    this.googleCloud = new GoogleCloud();
  }

  upload = async (req: Request) => {
    if (!req.file) throw new BadRequestError("image is required");

    const filename = await this.googleCloud.upload(req.file);

    return filename;
  };
}
