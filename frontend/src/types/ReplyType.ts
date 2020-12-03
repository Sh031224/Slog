export default interface ReplyType {
  idx: number;
  content: string;
  is_private: boolean;
  fk_user_idx?: number;
  fk_user_name?: string;
  fk_user_is_admin?: boolean;
  fk_comment_idx: number;
  created_at: Date;
  updated_at: Date;
}
