import { updateLikesTable, channel } from "../config/mq.js";

export const likesUpdater = async () => {
    await updateLikesTable(channel);
}