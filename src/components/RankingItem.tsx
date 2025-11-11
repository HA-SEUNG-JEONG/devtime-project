import React from 'react';
import type { RankingItemProps } from '../types/rankingItem';

const RankingItem: React.FC<RankingItemProps> = ({
  rank,
  nickname,
  goal,
  profileImageUrl,
  totalHours,
  dailyAverage,
  experience,
  stacks,
  className = '',
  ...props
}) => {
  // 랭크 텍스트 포맷팅
  const formatRank = (rank: number): string => {
    if (rank >= 11) {
      return `${rank.toLocaleString()}위`;
    }
    return `${rank}위`;
  };

  const rankText = formatRank(rank);

  // 랭크에 따른 스타일 분기
  const getRankStyle = () => {
    if (rank >= 1 && rank <= 3) {
      return {
        badgeBg: 'bg-primary',
        badgeTextColor: 'text-white',
        badgeWidthClass: 'w-auto min-w-[43px]',
        containerWidth: 'w-[80px]',
      };
    } else if (rank >= 4 && rank <= 10) {
      return {
        badgeBg: 'bg-primary-10',
        badgeTextColor: 'text-primary',
        badgeWidthClass: 'w-auto min-w-[47px]',
        containerWidth: 'w-[80px]',
      };
    } else {
      return {
        badgeBg: 'bg-gray-100',
        badgeTextColor: 'text-gray-500',
        badgeWidthClass: 'w-auto min-w-[50px] max-w-[100px]',
        containerWidth: 'w-[80px]',
      };
    }
  };

  const rankStyle = getRankStyle();

  // 시간 포맷팅
  const formatHours = (hours: number): string => {
    return `${hours}시간`;
  };

  // 일 평균 포맷팅
  const formatDailyAverage = (hours: number): string => {
    return `${hours}시간`;
  };

  return (
    <div
      className={`flex flex-row items-start py-3 px-6 gap-9 w-[1200px] h-[150px] bg-white rounded-xl ${className}`}
      {...props}
    >
      {/* 랭크 배지와 프로필 이미지 영역 */}
      <div
        className={`flex flex-col items-start gap-4 ${rankStyle.containerWidth} h-[126px] flex-none`}
      >
        {/* 랭크 배지 */}
        <div
          className={`flex flex-col justify-center items-center px-2 py-0 gap-[10px] h-[30px] ${rankStyle.badgeWidthClass} ${rankStyle.badgeBg} rounded-lg flex-none`}
        >
          <span
            className={`text-20b flex items-center justify-center whitespace-nowrap ${rankStyle.badgeTextColor}`}
          >
            {rankText}
          </span>
        </div>

        {/* 프로필 이미지 */}
        <div className="w-20 h-20 flex-none">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={nickname}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-16r text-gray-500">이미지</span>
            </div>
          )}
        </div>
      </div>

      {/* 프로필 정보 영역 */}
      <div className="flex flex-col items-start gap-4 w-[998px] h-[126px] flex-none">
        {/* 닉네임과 목표 */}
        <div className="flex flex-col items-start gap-0.5 w-[998px] h-[46px] flex-none self-stretch">
          {/* 닉네임 */}
          <div className="w-[998px] h-6 flex-none self-stretch">
            <span className="text-20b text-primary">{nickname}</span>
          </div>
          {/* 목표 */}
          <div className="w-[998px] h-5 flex-none self-stretch">
            <span className="text-16m text-primary">{goal}</span>
          </div>
        </div>

        {/* 스펙 정보 */}
        <div className="flex flex-row items-center gap-6 w-auto h-5 flex-none">
          {/* 누적 시간 */}
          <div className="flex flex-row items-center gap-2 w-auto h-5 flex-none">
            <span className="text-16r text-gray-500">누적</span>
            <span className="text-16sb text-gray-700">
              {formatHours(totalHours)}
            </span>
          </div>

          {/* 일 평균 */}
          <div className="flex flex-row items-center gap-2 w-auto h-5 flex-none">
            <span className="text-16r text-gray-500">일 평균</span>
            <span className="text-16sb text-gray-700">
              {formatDailyAverage(dailyAverage)}
            </span>
          </div>

          {/* 경력 */}
          <div className="flex flex-row items-center gap-2 w-auto h-5 flex-none">
            <span className="text-16r text-gray-500">경력</span>
            <span className="text-16sb text-gray-700">{experience}</span>
          </div>
        </div>

        {/* 스택 태그 */}
        <div className="flex flex-row items-center gap-2 w-auto h-7 flex-none">
          {stacks.map((stack, index) => (
            <div
              key={index}
              className="flex flex-row justify-center items-center px-2 py-1 gap-2 w-auto h-7 bg-gray-100 rounded-[5px] flex-none"
            >
              <span className="text-16m text-gray-500">{stack}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingItem;
