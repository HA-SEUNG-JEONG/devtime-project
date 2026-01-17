import type { Meta, StoryObj } from "@storybook/react";
import RankingList from "./RankingList";
import ProfileImage from "@/assets/profileImage.png";

const meta = {
  title: "Components/RankingList",
  component: RankingList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RankingList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPlace: Story = {
  args: {
    rank: 1,
    username: "CoffeeScripted",
    subtitle: '"구글 없이 코딩하기... 아니 강 구글 이직 가즈아!"',
    avatarUrl: ProfileImage,
    stats: {
      totalHours: "420시간",
      dailyAverage: "4.5시간",
      experience: "4 - 7년",
    },
    items: ["Item", "Item", "Item", "Item", "Item"],
  },
};

export const FourthPlace: Story = {
  args: {
    rank: 4,
    username: "CoffeeScripted",
    subtitle: '"구글 없이 코딩하기... 아니 강 구글 이직 가즈아!"',
    avatarUrl: ProfileImage,
    stats: {
      totalHours: "420시간",
      dailyAverage: "4.5시간",
      experience: "1 - 3년",
    },
    items: ["Item", "Item", "Item", "Item", "Item"],
  },
};

export const OutOfTopRanks: Story = {
  args: {
    rank: 9999,
    username: "CoffeeScripted",
    subtitle: '"구글 없이 코딩하기... 아니 강 구글 이직 가즈아!"',
    avatarUrl: ProfileImage,
    stats: {
      totalHours: "420시간",
      dailyAverage: "4.5시간",
      experience: "11년 이상",
    },
    items: ["Item", "Item", "Item", "Item", "Item"],
  },
};

export const SecondPlace: Story = {
  args: {
    rank: 2,
    username: "CodeNinja",
    subtitle: '"버그는 기능이다"',
    avatarUrl: ProfileImage,
    stats: {
      totalHours: "380시간",
      dailyAverage: "4.2시간",
      experience: "5 - 8년",
    },
    items: ["React", "TypeScript", "Next.js", "Tailwind"],
  },
};

export const ThirdPlace: Story = {
  args: {
    rank: 3,
    username: "PixelPusher",
    subtitle: '"디자인은 나의 삶"',
    avatarUrl: ProfileImage,
    stats: {
      totalHours: "350시간",
      dailyAverage: "3.8시간",
      experience: "3 - 5년",
    },
    items: ["Figma", "CSS", "Animation", "UX"],
  },
};

export const LongUsername: Story = {
  args: {
    rank: 100,
    username: "VeryLongUsernameExample",
    subtitle: '"긴 이름도 잘 보여야 한다"',
    avatarUrl: ProfileImage,
    stats: {
      totalHours: "120시간",
      dailyAverage: "2.1시간",
      experience: "1년 미만",
    },
    items: ["HTML", "CSS", "JavaScript"],
  },
};

export const NoAvatar: Story = {
  args: {
    rank: 42,
    username: "Anonymous",
    subtitle: '"프로필 사진은 필요없어"',
    stats: {
      totalHours: "200시간",
      dailyAverage: "3.0시간",
      experience: "2 - 4년",
    },
    items: ["Python", "Django", "PostgreSQL"],
  },
};
