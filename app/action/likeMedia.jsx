"use server";
import { updateNumberOfLikes } from "../lib/prisma-db";

export async function likeMedia(mediaId, newNumberOfLikes) {
  return await updateNumberOfLikes(mediaId, newNumberOfLikes);
}
