import "dotenv/config";
import type { Bucket } from "@google-cloud/storage";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";

import config from "@/constants/firebase";

export default class GoogleCloud {
  private storage: Storage;
  private bucket: Bucket;

  constructor() {
    this.storage = new Storage({
      credentials: config
    });

    this.bucket = this.storage.bucket("slog-image");
  }

  upload = (file: Express.Multer.File) => {
    return new Promise<string>((resolve, reject) => {
      const filename = `${file.fieldname}-${uuidv4()}-${file.originalname}`;

      const blob = this.bucket.file(filename);
      const stream = blob.createWriteStream();

      stream.on("finish", async () => {
        await this.bucket.file(filename).makePublic();

        resolve(filename);
      });
      stream.on("error", (err) => {
        reject(err);
      });

      stream.end(file.buffer);
    });
  };
}
