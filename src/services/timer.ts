import { apiClient } from "@/utils/api";
import axios from "axios";
import type {
  StartTimerRequest,
  StartTimerResponse,
  GetActiveTimerResponse,
  GetStudyLogDetailResponse,
  UpdateTimerResponse,
  DeleteTimerResponse,
  UpdateTasksRequest,
  UpdateTasksResponse,
  StopTimerRequest,
  StopTimerResponse,
} from "@/types/types";

export const timerService = {
  start: async (data: StartTimerRequest): Promise<StartTimerResponse> => {
    const response = await apiClient.post<StartTimerResponse>(
      "/api/timers",
      data,
    );
    return response.data;
  },

  getActiveTimer: async (): Promise<GetActiveTimerResponse> => {
    try {
      const response =
        await apiClient.get<GetActiveTimerResponse>("/api/timers");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("Failed to get active timer");
      }
      throw error;
    }
  },

  getStudyLogDetail: async (
    studyLogId: string,
  ): Promise<GetStudyLogDetailResponse | null> => {
    try {
      const response = await apiClient.get<GetStudyLogDetailResponse>(
        `/api/study-logs/${studyLogId}`,
      );
      return response.data;
    } catch (error) {
      if (
        (error as { response?: { status: number } }).response?.status === 404
      ) {
        return null;
      }
      throw error;
    }
  },

  updateTimer: async (
    timerId: string,
    elapsedSeconds: number,
  ): Promise<UpdateTimerResponse> => {
    const response = await apiClient.put<UpdateTimerResponse>(
      `/api/timers/${timerId}`,
      {
        splitTimes: [
          {
            date: new Date().toISOString(),
            timeSpent: elapsedSeconds,
          },
        ],
      },
    );
    return response.data;
  },

  deleteTimer: async (timerId: string): Promise<DeleteTimerResponse> => {
    const response = await apiClient.delete<DeleteTimerResponse>(
      `/api/timers/${timerId}`,
    );
    return response.data;
  },

  updateTasks: async (
    studyLogId: string,
    data: UpdateTasksRequest,
  ): Promise<UpdateTasksResponse> => {
    const response = await apiClient.put<UpdateTasksResponse>(
      `/api/${studyLogId}/tasks`,
      data,
    );
    return response.data;
  },

  stopTimer: async (
    timerId: string,
    data: StopTimerRequest,
  ): Promise<StopTimerResponse> => {
    const response = await apiClient.post<StopTimerResponse>(
      `/api/timers/${timerId}/stop`,
      data,
    );
    return response.data;
  },
};
