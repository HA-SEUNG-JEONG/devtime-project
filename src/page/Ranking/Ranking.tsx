import { useEffect, useState, useRef, useCallback } from "react";
import NavBar from "@/components/NavBar";
import RankingList from "@/components/RankingList/RankingList";
import { rankingService } from "@/services/ranking";
import { useErrorModal } from "@/contexts/ErrorModalContext";
import type {
  RankingEntry,
  RankingSortBy,
  PaginationInfo,
  Purpose,
  CareerLevel,
} from "@/types/types";

const formatStudyTime = (seconds: number): string => {
  const hours = seconds / 3600;
  if (hours >= 1) {
    return `${Math.floor(hours)}시간 ${Math.round((hours % 1) * 60)}분`;
  }
  return `${Math.round(seconds / 60)}분`;
};

const formatDailyAverage = (seconds: number): string => {
  const hours = seconds / 3600;
  return `${hours.toFixed(1)}시간`;
};

const formatCareer = (career: CareerLevel): string => {
  if (career === "경력 없음") return "경력 없음";
  return career;
};

const formatPurpose = (purpose: Purpose): string => {
  if (typeof purpose === "string") {
    return `"${purpose}"`;
  }
  return `"${purpose.detail}"`;
};

const LIMIT = 10;

const Ranking = () => {
  const { showError } = useErrorModal();

  const [sortBy, setSortBy] = useState<RankingSortBy>("total");
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchRankings = useCallback(
    async (page: number, reset: boolean = false) => {
      if (isLoading) return;

      setIsLoading(true);
      try {
        const response = await rankingService.getRankings({
          sortBy,
          page,
          limit: LIMIT,
        });

        if (reset) {
          setRankings(response.data.rankings);
        } else {
          setRankings((prev) => [...prev, ...response.data.rankings]);
        }
        setPagination(response.data.pagination);
      } catch {
        showError({
          title: "랭킹 로딩 실패",
          description: "랭킹 데이터를 불러오는데 실패했습니다.",
        });
      } finally {
        setIsLoading(false);
        setIsInitialLoading(false);
      }
    },
    [sortBy, isLoading, showError],
  );

  useEffect(() => {
    setIsInitialLoading(true);
    setRankings([]);
    setPagination(null);
    fetchRankings(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          pagination?.hasNext &&
          !isLoading &&
          !isInitialLoading
        ) {
          fetchRankings(pagination.currentPage + 1);
        }
      },
      { threshold: 0.1 },
    );

    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [pagination, isLoading, isInitialLoading, fetchRankings]);

  const handleSortChange = (newSortBy: RankingSortBy) => {
    if (sortBy !== newSortBy) {
      setSortBy(newSortBy);
    }
  };

  return (
    <div className="bg-background-timer flex min-h-screen flex-col px-4 py-4 sm:px-6 md:px-8 lg:px-12">
      <NavBar />

      <main className="mx-auto w-full max-w-4xl flex-1 py-8">
        <div className="mb-6 flex gap-4">
          <button
            type="button"
            onClick={() => handleSortChange("total")}
            className={`typography-body-b cursor-pointer rounded-lg px-4 py-2 transition-colors ${
              sortBy === "total"
                ? "bg-primary-0 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            총 학습 시간
          </button>
          <button
            type="button"
            onClick={() => handleSortChange("avg")}
            className={`typography-body-b cursor-pointer rounded-lg px-4 py-2 transition-colors ${
              sortBy === "avg"
                ? "bg-primary-0 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            일 평균 학습 시간
          </button>
        </div>

        <div className="space-y-4">
          {isInitialLoading ? (
            <div className="flex justify-center py-12">
              <div className="border-primary-0 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
            </div>
          ) : rankings.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              랭킹 데이터가 없습니다.
            </div>
          ) : (
            rankings.map((entry) => (
              <RankingList
                key={`${entry.userId}-${entry.rank}`}
                rank={entry.rank}
                username={entry.nickname}
                subtitle={formatPurpose(entry.profile.purpose)}
                avatarUrl={entry.profile.profileImage ?? undefined}
                stats={{
                  totalHours: formatStudyTime(entry.totalStudyTime),
                  dailyAverage: formatDailyAverage(entry.averageStudyTime),
                  experience: formatCareer(entry.profile.career),
                }}
                items={entry.profile.techStacks.map((stack) => stack.name)}
              />
            ))
          )}

          <div ref={observerTarget} className="h-4" />

          {isLoading && !isInitialLoading && (
            <div className="flex justify-center py-4">
              <div className="border-primary-0 h-6 w-6 animate-spin rounded-full border-4 border-t-transparent" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Ranking;
