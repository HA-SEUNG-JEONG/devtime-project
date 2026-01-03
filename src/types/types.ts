// ============================================
// Common Types
// ============================================

export interface ApiResponse<T = void> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    message: string;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ============================================
// Auth API Types
// ============================================

// POST /api/signup
export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
}

// GET /api/signup/check-email
export interface CheckEmailRequest {
  email: string;
}

export interface CheckEmailResponse {
  success: boolean;
  available: boolean;
  message: string;
}

// GET /api/signup/check-nickname
export interface CheckNicknameRequest {
  nickname: string;
}

export interface CheckNicknameResponse {
  success: boolean;
  available: boolean;
  message: string;
}

// POST /api/auth/login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  isFirstLogin: boolean;
  isDuplicateLogin: boolean;
}

// POST /api/auth/logout
export interface LogoutResponse {
  success: boolean;
  message: string;
}

// POST /api/auth/refresh
export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  accessToken: string;
}

// ============================================
// Profile API Types
// ============================================

export type CareerLevel =
  | "경력 없음"
  | "0 - 3년"
  | "4 - 7년"
  | "8 - 10년"
  | "11년 이상";

export type PurposeType =
  | "취업 준비"
  | "이직 준비"
  | "단순 개발 역량 향상"
  | "회사 내 프로젝트 원활하게 수행";

export interface CustomPurpose {
  type: "기타";
  detail: string;
}

export type Purpose = PurposeType | CustomPurpose;

// POST /api/profile
export interface CreateProfileRequest {
  career: CareerLevel;
  purpose: Purpose;
  goal?: string;
  techStacks: string[];
  profileImage?: string;
}

export interface CreateProfileResponse {
  success: boolean;
  message: string;
}

// GET /api/profile
export interface ProfileData {
  career: CareerLevel;
  purpose: Purpose;
  goal: string;
  techStacks: string[];
  profileImage: string;
}

export interface GetProfileResponse {
  email: string;
  nickname: string;
  profile: ProfileData;
}

// PUT /api/profile
export interface UpdateProfileRequest {
  nickname?: string;
  career?: CareerLevel;
  purpose?: Purpose;
  goal?: string;
  techStacks?: string[];
  profileImage?: string;
  password?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
}

// ============================================
// Timer API Types
// ============================================

export interface SplitTime {
  date: string; // ISO 8601 DateTime
  timeSpent: number; // seconds
}

// GET /api/timers
export interface GetActiveTimerResponse {
  timerId: string;
  studyLogId: string;
  splitTimes: SplitTime[];
  startTime: string; // ISO 8601 DateTime
  lastUpdateTime: string | null; // ISO 8601 DateTime
}

// POST /api/timers
export interface StartTimerRequest {
  todayGoal: string; // 1-30 characters
  tasks?: string[]; // each 1-30 characters
}

export interface StartTimerResponse {
  message: string;
  studyLogId: string;
  timerId: string;
  startTime: string; // ISO 8601 DateTime
}

export interface TimerConflictResponse {
  error: {
    message: string;
  };
  data: {
    timerId: string;
  };
}

// PUT /api/timers/{timerId}
export interface UpdateTimerRequest {
  splitTimes: SplitTime[];
}

export interface UpdateTimerResponse {
  message: string;
  startTime: string; // ISO 8601 DateTime
  splitTimes: SplitTime[];
  lastUpdateTime: string; // ISO 8601 DateTime
}

// DELETE /api/timers/{timerId}
export interface DeleteTimerResponse {
  message: string;
}

// POST /api/timers/{timerId}/stop
export interface TaskInput {
  content: string; // 1-30 characters
  isCompleted: boolean;
}

export interface StopTimerRequest {
  splitTimes: SplitTime[];
  review: string; // minimum 15 characters
  tasks: TaskInput[];
}

export interface StopTimerResponse {
  message: string;
  totalTime: number; // seconds
  endTime: string; // ISO 8601 DateTime
}

// ============================================
// Tasks API Types
// ============================================

// PUT /api/{studyLogId}/tasks
export interface UpdateTasksRequest {
  tasks: TaskInput[];
}

export interface UpdateTasksResponse {
  success: boolean;
  message: string;
}

// ============================================
// Stats API Types
// ============================================

export interface WeekdayStudyTime {
  Monday: number;
  Tuesday: number;
  Wednesday: number;
  Thursday: number;
  Friday: number;
  Saturday: number;
  Sunday: number;
}

// GET /api/stats
export interface GetStatsResponse {
  consecutiveDays: number;
  totalStudyTime: number; // seconds
  averageDailyStudyTime: number; // seconds
  taskCompletionRate: number; // percentage
  weekdayStudyTime: WeekdayStudyTime;
}

// ============================================
// Heatmap API Types
// ============================================

export interface HeatmapEntry {
  date: string; // "YYYY-MM-DD"
  studyTimeHours: number;
  colorLevel: number; // 0-5
}

// GET /api/heatmap
export interface GetHeatmapResponse {
  heatmap: HeatmapEntry[];
}

// ============================================
// Ranking API Types
// ============================================

export type RankingSortBy = "total" | "avg";

// GET /api/rankings
export interface GetRankingsRequest extends PaginationParams {
  sortBy?: RankingSortBy;
}

export interface TechStack {
  id: number;
  name: string;
}

export interface RankingProfile {
  career: CareerLevel;
  purpose: Purpose;
  profileImage: string | null;
  techStacks: TechStack[]; // max 5
}

export interface RankingEntry {
  rank: number;
  userId: string;
  nickname: string;
  totalStudyTime: number; // seconds
  averageStudyTime: number; // seconds
  profile: RankingProfile;
}

export interface GetRankingsResponse {
  success: boolean;
  data: {
    rankings: RankingEntry[];
    pagination: PaginationInfo;
  };
}

// ============================================
// Study Logs API Types
// ============================================

// GET /api/study-logs
export interface GetStudyLogsRequest extends PaginationParams {
  date?: string; // "YYYY-MM-DD"
}

export interface StudyLogSummary {
  id: string;
  date: string; // "YYYY-MM-DD"
  todayGoal: string;
  studyTime: number; // seconds
  totalTasks: number;
  incompleteTasks: number;
  completionRate: number; // percentage
}

export interface GetStudyLogsResponse {
  success: boolean;
  data: {
    studyLogs: StudyLogSummary[];
    pagination: PaginationInfo;
  };
}

// GET /api/study-logs/{studyLogId}
export interface TaskDetail {
  id: string;
  content: string; // max 30 characters
  isCompleted: boolean;
}

export interface StudyLogDetail {
  id: string;
  date: string; // "YYYY-MM-DD"
  todayGoal: string;
  studyTime: number; // seconds
  tasks: TaskDetail[];
  review: string;
  completionRate: number; // percentage
}

export interface GetStudyLogDetailResponse {
  success: boolean;
  data: StudyLogDetail;
}

// DELETE /api/study-logs/{studyLogId}
export interface DeleteStudyLogResponse {
  success: boolean;
  message: string;
}

export interface PolingTimerResponse {
  message?: string;
  startTime: string;
  splitTimes: SplitTime[];
  lastUpdateTime: string;
}

// ============================================
// Tech Stacks API Types
// ============================================

export interface TechStackItem {
  id: number;
  name: string;
  createdAt: string; // ISO 8601 DateTime
  updatedAt: string; // ISO 8601 DateTime
}

// GET /api/tech-stacks
export interface GetTechStacksRequest {
  keyword?: string;
}

export interface GetTechStacksResponse {
  results: TechStackItem[];
}

// POST /api/tech-stacks
export interface CreateTechStackRequest {
  name: string; // minimum 1 character
}

export interface CreateTechStackResponse {
  message: string;
  techStack: TechStackItem;
}

// ============================================
// File API Types
// ============================================

// POST /api/file/presigned-url
export interface GetPresignedUrlRequest {
  fileName: string; // e.g., "profile.jpg"
  contentType: string; // e.g., "image/jpeg"
}

export interface GetPresignedUrlResponse {
  presignedUrl: string;
  key: string;
}
