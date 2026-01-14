import { Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { StudyLogSummary, PaginationInfo } from "@/types/types";
import { formatDate, formatStudyTimeString } from "../utils";
import Pagination from "./Pagination";

interface StudyLogTableProps {
  studyLogs: StudyLogSummary[];
  pagination: PaginationInfo | null;
  onPageChange: (page: number) => void;
  onViewDetail: (studyLogId: string) => void;
  onDelete: (studyLogId: string) => void;
  isLoading: boolean;
}

const GRID_COLS =
  "grid-cols-[minmax(80px,1fr)_minmax(120px,2fr)_minmax(80px,1fr)_minmax(70px,1fr)_minmax(80px,1fr)_minmax(60px,1fr)_48px]";

const StudyLogTable = ({
  studyLogs,
  pagination,
  onPageChange,
  onViewDetail,
  onDelete,
  isLoading,
}: StudyLogTableProps) => {
  return (
    <Card className="gap-4 px-6 py-5">
      <h2 className="typography-body-m font-semibold text-gray-800">
        학습 기록
      </h2>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded bg-gray-200" />
          ))}
        </div>
      ) : studyLogs.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          <p className="typography-body-m">아직 학습 기록이 없습니다.</p>
          <p className="typography-body-small-r mt-2">
            타이머를 시작하여 첫 번째 기록을 만들어보세요!
          </p>
        </div>
      ) : (
        <section aria-label="학습 기록 목록">
          <div className="overflow-x-auto">
            <header
              className={`bg-primary-10 grid ${GRID_COLS} items-center rounded-t`}
              role="row"
            >
              <span className="typography-body-small-s text-secondary-indigo px-4 py-3">
                날짜
              </span>
              <span className="typography-body-small-s text-secondary-indigo px-4 py-3">
                목표
              </span>
              <span className="typography-body-small-s text-secondary-indigo px-4 py-3">
                공부 시간
              </span>
              <span className="typography-body-small-s text-secondary-indigo px-4 py-3">
                할 일 갯수
              </span>
              <span className="typography-body-small-s text-secondary-indigo px-4 py-3">
                미완료 할 일
              </span>
              <span className="typography-body-small-s text-secondary-indigo px-4 py-3">
                달성률
              </span>
              <span className="px-4 py-3" />
            </header>

            <ul className="divide-y divide-gray-100">
              {studyLogs.map((log) => (
                <li
                  key={log.id}
                  className={`grid ${GRID_COLS} items-center hover:bg-gray-50`}
                >
                  <span className="typography-body-small-m px-4 py-4 text-gray-700">
                    {formatDate(log.date)}
                  </span>
                  <span className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => onViewDetail(log.id)}
                      className="typography-body-small-s text-secondary-indigo cursor-pointer text-left"
                    >
                      {log.todayGoal}
                    </button>
                  </span>
                  <span className="typography-body-small-m px-4 py-4 text-gray-700">
                    {formatStudyTimeString(log.studyTime)}
                  </span>
                  <span className="typography-body-small-m px-4 py-4 text-gray-700">
                    {log.totalTasks}
                  </span>
                  <span className="typography-body-small-m px-4 py-4 text-gray-700">
                    {log.incompleteTasks}
                  </span>
                  <span className="typography-body-small-m px-4 py-4 text-gray-700">
                    {Math.round(log.completionRate)}%
                  </span>
                  <span className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => onDelete(log.id)}
                      className="hover:text-secondary-negative text-gray-400 transition-colors"
                      aria-label={`${formatDate(log.date)} 학습 기록 삭제`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {pagination && pagination.totalPages > 1 && (
            <nav
              className="mt-4 flex justify-center"
              aria-label="페이지 네비게이션"
            >
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                hasNext={pagination.hasNext}
                hasPrev={pagination.hasPrev}
                onPageChange={onPageChange}
              />
            </nav>
          )}
        </section>
      )}
    </Card>
  );
};

export default StudyLogTable;
