import { RiotApi, LolApi } from "twisted";

export const rAPI = new RiotApi({ key: Bun.env.RIOT_API, rateLimitRetry: false });
export const lAPI = new LolApi({ key: Bun.env.RIOT_API, rateLimitRetry: false });
