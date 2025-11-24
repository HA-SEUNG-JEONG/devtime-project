import type { Meta, StoryObj } from '@storybook/react-vite';
import RankingItem from '../../components/common/RankingItem';
// colors.css와 font.css는 index.css에서 import됨

const meta = {
  title: 'Components/RankingItem',
  component: RankingItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rank: {
      control: 'number',
      description: '랭크 번호',
    },
    nickname: {
      control: 'text',
      description: '닉네임',
    },
    goal: {
      control: 'text',
      description: '목표 텍스트',
    },
    profileImageUrl: {
      control: 'text',
      description: '프로필 이미지 URL',
    },
    totalHours: {
      control: 'number',
      description: '누적 시간 (시간 단위)',
    },
    dailyAverage: {
      control: 'number',
      description: '일 평균 시간 (시간 단위)',
    },
    experience: {
      control: 'text',
      description: '경력 범위',
    },
    stacks: {
      control: 'object',
      description: '스택 태그 배열',
    },
  },
} satisfies Meta<typeof RankingItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Rank 1~3: 파란색 배경, 흰색 텍스트
export const RankTop3: Story = {
  args: {
    rank: 1,
    nickname: '개발자123',
    goal: '프론트엔드 마스터하기',
    totalHours: 420,
    dailyAverage: 4.5,
    experience: '4 - 7년',
    stacks: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Storybook'],
  },
};

// Rank 4~10: 연한 파란색 배경, 파란색 텍스트
export const RankTop10: Story = {
  args: {
    rank: 4,
    nickname: '코딩러버',
    goal: '풀스택 개발자 되기',
    totalHours: 380,
    dailyAverage: 4.2,
    experience: '1 - 3년',
    stacks: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
  },
};

// Rank 11~: 회색 배경, 회색 텍스트
export const RankBelow11: Story = {
  args: {
    rank: 11,
    nickname: '학습중',
    goal: '웹 개발 기초 다지기',
    totalHours: 250,
    dailyAverage: 3.0,
    experience: '11년 이상',
    stacks: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue'],
  },
};

// Rank 2
export const Rank2: Story = {
  args: {
    rank: 2,
    nickname: '개발마스터',
    goal: '시니어 개발자 되기',
    totalHours: 450,
    dailyAverage: 5.0,
    experience: '7 - 10년',
    stacks: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'AWS'],
  },
};

// Rank 3
export const Rank3: Story = {
  args: {
    rank: 3,
    nickname: '코드위저드',
    goal: '아키텍처 설계 전문가',
    totalHours: 430,
    dailyAverage: 4.8,
    experience: '4 - 7년',
    stacks: ['React', 'TypeScript', 'Docker', 'Kubernetes', 'Microservices'],
  },
};

// Rank 10
export const Rank10: Story = {
  args: {
    rank: 10,
    nickname: '프론트엔드러버',
    goal: 'UI/UX 전문가 되기',
    totalHours: 350,
    dailyAverage: 4.0,
    experience: '1 - 3년',
    stacks: ['React', 'Figma', 'CSS', 'Animation', 'Design System'],
  },
};

// Rank 9999 (큰 숫자)
export const Rank9999: Story = {
  args: {
    rank: 9999,
    nickname: '신입개발자',
    goal: '첫 프로젝트 완성하기',
    totalHours: 100,
    dailyAverage: 2.0,
    experience: '1년 미만',
    stacks: ['HTML', 'CSS', 'JavaScript'],
  },
};

// All Ranks Overview
export const AllRanks: Story = {
  args: {
    rank: 1,
    nickname: '개발자123',
    goal: '프론트엔드 마스터하기',
    totalHours: 420,
    dailyAverage: 4.5,
    experience: '4 - 7년',
    stacks: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Storybook'],
  },
  render: () => (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        backgroundColor: '#F9FAFB',
      }}
    >
      <section>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1F2937',
          }}
        >
          Rank 1~3 (파란색 배경, 흰색 텍스트)
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <RankingItem
            rank={1}
            nickname="개발자123"
            goal="프론트엔드 마스터하기"
            totalHours={420}
            dailyAverage={4.5}
            experience="4 - 7년"
            stacks={['React', 'TypeScript', 'Vite', 'Tailwind', 'Storybook']}
          />
          <RankingItem
            rank={2}
            nickname="개발마스터"
            goal="시니어 개발자 되기"
            totalHours={450}
            dailyAverage={5.0}
            experience="7 - 10년"
            stacks={['React', 'Next.js', 'TypeScript', 'GraphQL', 'AWS']}
          />
          <RankingItem
            rank={3}
            nickname="코드위저드"
            goal="아키텍처 설계 전문가"
            totalHours={430}
            dailyAverage={4.8}
            experience="4 - 7년"
            stacks={[
              'React',
              'TypeScript',
              'Docker',
              'Kubernetes',
              'Microservices',
            ]}
          />
        </div>
      </section>

      <section>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1F2937',
          }}
        >
          Rank 4~10 (연한 파란색 배경, 파란색 텍스트)
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <RankingItem
            rank={4}
            nickname="코딩러버"
            goal="풀스택 개발자 되기"
            totalHours={380}
            dailyAverage={4.2}
            experience="1 - 3년"
            stacks={['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript']}
          />
          <RankingItem
            rank={10}
            nickname="프론트엔드러버"
            goal="UI/UX 전문가 되기"
            totalHours={350}
            dailyAverage={4.0}
            experience="1 - 3년"
            stacks={['React', 'Figma', 'CSS', 'Animation', 'Design System']}
          />
        </div>
      </section>

      <section>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1F2937',
          }}
        >
          Rank 11~ (회색 배경, 회색 텍스트)
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <RankingItem
            rank={11}
            nickname="학습중"
            goal="웹 개발 기초 다지기"
            totalHours={250}
            dailyAverage={3.0}
            experience="11년 이상"
            stacks={['HTML', 'CSS', 'JavaScript', 'React', 'Vue']}
          />
          <RankingItem
            rank={9999}
            nickname="신입개발자"
            goal="첫 프로젝트 완성하기"
            totalHours={100}
            dailyAverage={2.0}
            experience="1년 미만"
            stacks={['HTML', 'CSS', 'JavaScript']}
          />
        </div>
      </section>
    </div>
  ),
};
