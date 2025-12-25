import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface RankingCardProps {
  rank: number;
  username: string;
  subtitle: string;
  stats: {
    totalHours: number;
    dailyAverage: number;
    experience: string;
  };
  avatarUrl?: string;
  items?: string[];
}

const RankingList = ({
  rank,
  username,
  subtitle,
  avatarUrl,
  stats,
  items = ["Item", "Item", "Item", "Item", "Item"]
}: RankingCardProps) => {
  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-[#4F6EF7] text-white";
    if (rank <= 10) return "bg-[#8FA3F9] text-white";
    return "bg-muted text-muted-foreground";
  };

  return (
    <Card className="p-6">
      <div className="flex gap-6">
        {/* Rank Badge */}
        <div className="shrink-0">
          <div
            className={`${getRankBadgeColor(
              rank
            )} rounded-xl px-4 py-2 text-lg font-bold mb-4 inline-block`}
          >
            {rank.toLocaleString("ko-KR")}위
          </div>
          <Avatar className="h-20 w-20 rounded-full">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback className="bg-[#D5DBEC]">
              <svg
                className="h-16 w-16 text-muted-foreground"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-1">
            {username}
          </h3>
          <p className="text-[#4F6EF7] text-base mb-4">{subtitle}</p>

          {/* Stats */}
          <div className="flex gap-6 text-sm text-muted-foreground mb-4">
            <span>
              누적{" "}
              <span className="font-bold text-foreground">
                {stats.totalHours}시간
              </span>
            </span>
            <span>
              일 평균{" "}
              <span className="font-bold text-foreground">
                {stats.dailyAverage}시간
              </span>
            </span>
            <span>
              경력{" "}
              <span className="font-bold text-foreground">
                {stats.experience}
              </span>
            </span>
          </div>

          {/* Items */}
          <div className="flex gap-2 flex-wrap">
            {items.map((item, index) => (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                className="bg-muted hover:bg-muted/80 text-muted-foreground rounded-md px-4 py-2"
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RankingList;
