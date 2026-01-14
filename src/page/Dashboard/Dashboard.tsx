import { useEffect, useState, useCallback } from "react";
import NavBar from "@/components/NavBar";
import { dashboardService } from "@/services/dashboard";
import { useErrorModal } from "@/contexts/ErrorModalContext";
import type {
  GetStatsResponse,
  HeatmapEntry,
  StudyLogSummary,
  PaginationInfo,
  WeekdayStudyTime,
} from "@/types/types";

import StatsCards from "./components/StatsCards";
import WeekdayChart from "./components/WeekdayChart";
import StudyHeatmap from "./components/StudyHeatmap";
import StudyLogTable from "./components/StudyLogTable";
import StudyLogDetailDialog from "./components/StudyLogDetailDialog";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";

const DEFAULT_WEEKDAY_STUDY_TIME: WeekdayStudyTime = {
  Monday: 0,
  Tuesday: 0,
  Wednesday: 0,
  Thursday: 0,
  Friday: 0,
  Saturday: 0,
  Sunday: 0,
};

const Dashboard = () => {
  const { showError } = useErrorModal();

  const [stats, setStats] = useState<GetStatsResponse | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [heatmap, setHeatmap] = useState<HeatmapEntry[]>([]);
  const [heatmapLoading, setHeatmapLoading] = useState(true);

  const [studyLogs, setStudyLogs] = useState<StudyLogSummary[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsLoading, setLogsLoading] = useState(true);

  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedStudyLogId, setSelectedStudyLogId] = useState<string | null>(
    null,
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const data = await dashboardService.getStats();
      setStats(data);
    } catch {
      showError({
        title: "통계 로딩 실패",
        description: "통계 데이터를 불러오는데 실패했습니다.",
      });
    } finally {
      setStatsLoading(false);
    }
  }, [showError]);

  const fetchHeatmap = useCallback(async () => {
    setHeatmapLoading(true);
    try {
      const data = await dashboardService.getHeatmap();
      setHeatmap(data.heatmap);
    } catch {
      showError({
        title: "히트맵 로딩 실패",
        description: "히트맵 데이터를 불러오는데 실패했습니다.",
      });
    } finally {
      setHeatmapLoading(false);
    }
  }, [showError]);

  const fetchStudyLogs = useCallback(
    async (page: number) => {
      setLogsLoading(true);
      try {
        const data = await dashboardService.getStudyLogs({
          page,
          limit: 10,
        });

        setStudyLogs(data.data.studyLogs);
        setPagination(data.data.pagination);
      } catch {
        showError({
          title: "학습 기록 로딩 실패",
          description: "학습 기록을 불러오는데 실패했습니다.",
        });
      } finally {
        setLogsLoading(false);
      }
    },
    [showError],
  );

  useEffect(() => {
    fetchStats();
    fetchHeatmap();
    fetchStudyLogs(1);
  }, [fetchStats, fetchHeatmap, fetchStudyLogs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchStudyLogs(page);
  };

  const handleViewDetail = (studyLogId: string) => {
    setSelectedStudyLogId(studyLogId);
    setDetailDialogOpen(true);
  };

  const handleDeleteClick = (studyLogId: string) => {
    setDeleteTargetId(studyLogId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;

    setIsDeleting(true);
    try {
      await dashboardService.deleteStudyLog(deleteTargetId);
      setDeleteDialogOpen(false);
      setDeleteTargetId(null);

      const isLastItemPage = studyLogs.length === 1 && currentPage > 1;
      const targetPage = isLastItemPage ? currentPage - 1 : currentPage;
      if (isLastItemPage) {
        setCurrentPage(targetPage);
      }
      fetchStudyLogs(targetPage);
      fetchStats();
      fetchHeatmap();
    } catch {
      showError({
        title: "삭제 실패",
        description: "학습 기록을 삭제하는데 실패했습니다.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-background-timer flex min-h-screen flex-col px-4 py-4 sm:px-6 md:px-8 lg:px-12">
      <NavBar />

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <StatsCards
            totalStudyTime={stats?.totalStudyTime ?? 0}
            consecutiveDays={stats?.consecutiveDays ?? 0}
            averageDailyStudyTime={stats?.averageDailyStudyTime ?? 0}
            taskCompletionRate={stats?.taskCompletionRate ?? 0}
            isLoading={statsLoading}
          />
          <WeekdayChart
            weekdayStudyTime={
              stats?.weekdayStudyTime ?? DEFAULT_WEEKDAY_STUDY_TIME
            }
            isLoading={statsLoading}
          />
        </div>

        <StudyHeatmap heatmap={heatmap} isLoading={heatmapLoading} />

        <StudyLogTable
          studyLogs={studyLogs}
          pagination={pagination}
          onPageChange={handlePageChange}
          onViewDetail={handleViewDetail}
          onDelete={handleDeleteClick}
          isLoading={logsLoading}
        />
      </main>

      <StudyLogDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        studyLogId={selectedStudyLogId}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Dashboard;
