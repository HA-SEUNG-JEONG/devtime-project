import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import type { HeatmapEntry } from "@/types/types";
import {
  WEEKDAY_LABELS,
  generateYearDates,
  formatDateToKey,
  getMonthLabels,
} from "../utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StudyHeatmapProps {
  heatmap: HeatmapEntry[];
  isLoading: boolean;
}

interface HeatmapCell {
  date: Date;
  dateKey: string;
  colorLevel: number;
  studyTimeHours: number;
}

const StudyHeatmap = ({ heatmap, isLoading }: StudyHeatmapProps) => {
  const { grid, monthLabels } = useMemo(() => {
    const dates = generateYearDates();
    const dateMap = new Map(heatmap.map((h) => [h.date, h]));

    const cells: HeatmapCell[][] = Array.from({ length: 7 }, () => []);

    const startPadding = dates[0]?.getDay() ?? 0;
    for (let i = 0; i < startPadding; i++) {
      cells[i].push({
        date: new Date(0),
        dateKey: "",
        colorLevel: -1,
        studyTimeHours: 0,
      });
    }

    for (const date of dates) {
      const dayOfWeek = date.getDay();
      const dateKey = formatDateToKey(date);
      const entry = dateMap.get(dateKey);

      cells[dayOfWeek].push({
        date,
        dateKey,
        colorLevel: entry?.colorLevel ?? 0,
        studyTimeHours: entry?.studyTimeHours ?? 0,
      });
    }

    const labels = getMonthLabels(dates);

    return { grid: cells, monthLabels: labels };
  }, [heatmap]);

  const HEATMAP_COLOR_CLASSES: Record<number, string> = {
    0: "bg-heatmap-0",
    1: "bg-heatmap-1",
    2: "bg-heatmap-2",
    3: "bg-heatmap-3",
    4: "bg-heatmap-4",
    5: "bg-heatmap-5",
  };

  const getBackgroundColor = (colorLevel: number): string => {
    return HEATMAP_COLOR_CLASSES[colorLevel] ?? "bg-heatmap-0";
  };

  const formatTooltipContent = (cell: HeatmapCell) => {
    const date = cell.date;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (cell.studyTimeHours === 0) {
      return "기록 없음";
    }

    const hours = Math.floor(cell.studyTimeHours);
    const remainingMinutes = (cell.studyTimeHours - hours) * 60;
    const minutes = Math.floor(remainingMinutes);
    const seconds = Math.round((remainingMinutes - minutes) * 60);

    return `${year}년 ${month}월 ${day}일: ${hours}시간 ${minutes}분 ${seconds}초`;
  };

  const weekCount = grid[0]?.length ?? 0;

  return (
    <Card className="gap-4 px-6 py-5">
      <span className="typography-body-m font-semibold text-gray-800">
        공부 시간 바다
      </span>
      {isLoading ? (
        <div className="h-32 animate-pulse rounded bg-gray-200" />
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="mb-2 ml-8 flex">
              {monthLabels.map(({ month, weekIndex }, idx) => (
                <span
                  key={idx}
                  className="text-xs text-gray-500"
                  style={{
                    position: "relative",
                    left: `${weekIndex * 14}px`,
                    marginRight: idx < monthLabels.length - 1 ? "0" : "auto",
                  }}
                >
                  {month}월
                </span>
              ))}
            </div>

            <div className="flex gap-1">
              <div className="flex flex-col gap-1">
                {WEEKDAY_LABELS.map((label, idx) => (
                  <div
                    key={idx}
                    className="flex h-3 w-6 items-center justify-end pr-1 text-xs text-gray-500"
                  >
                    {idx % 2 === 0 ? label : ""}
                  </div>
                ))}
              </div>

              <div className="flex gap-[3px]">
                {Array.from({ length: weekCount }, (_, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[3px]">
                    {grid.map((row, dayIdx) => {
                      const cell = row[weekIdx];
                      if (!cell || cell.colorLevel === -1) {
                        return (
                          <div key={dayIdx} className="h-3 w-3 rounded-sm" />
                        );
                      }

                      return (
                        <Tooltip key={dayIdx} delayDuration={0}>
                          <TooltipTrigger asChild>
                            <div
                              className={`h-[18px] w-[18px] cursor-pointer rounded-[5px] transition-opacity hover:opacity-80 ${getBackgroundColor(cell.colorLevel)}`}
                            />
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-gray-800 text-white"
                          >
                            {formatTooltipContent(cell)}
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-start gap-2">
              <span className="text-xs text-gray-500">Shallow</span>
              <div className="flex">
                {[0, 1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-5 w-[30px] ${
                      level === 0
                        ? "rounded-l-[5px]"
                        : level === 5
                          ? "rounded-r-[5px]"
                          : ""
                    } ${getBackgroundColor(level)}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">Deep</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default StudyHeatmap;
