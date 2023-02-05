import type { Nullable } from "@slog/types";
import * as admin from "firebase-admin";

import { domain } from "@/constants/domain";

type ConstructorParams = {
  body: string;
  userName: string;
  postIdx: number;
  icon: Nullable<string>;
};

export default class PushNotification {
  private body: string;
  private userName: string;
  private postIdx: number;
  private icon: Nullable<string>;

  constructor({ postIdx, userName, body, icon }: ConstructorParams) {
    this.postIdx = postIdx;
    this.userName = userName;
    this.body = body;
    this.icon = icon;
  }

  private generateMessage = (token: string) => ({
    webpush: {
      notification: {
        icon: this.icon || undefined,
        title: `${this.userName}님께서 답글을 남겼습니다.`,
        body: this.body,
        click_action: `${domain}/post/${this.postIdx}`
      }
    },
    data: {
      score: "850",
      time: "2:45"
    },
    token
  });

  send = (token: string) => {
    admin.messaging().send(this.generateMessage(token));
  };
}
