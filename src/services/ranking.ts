import { apiClient } from "@/utils/api";
import type { GetRankingsRequest, GetRankingsResponse } from "@/types/types";

export const rankingService = {
  getRankings: async (
    params: GetRankingsRequest,
  ): Promise<GetRankingsResponse> => {
    const response = await apiClient.get<GetRankingsResponse>("/api/rankings", {
      params,
    });
    return response.data;
  },
};
