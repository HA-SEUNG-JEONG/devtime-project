import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta = {
  title: "Design System/Typography",
  component: Typography,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HeadingStyles: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <h1 className="text-heading-b">Heading B - 사용 예시 입니다.</h1>
      <h2 className="text-heading-s">Heading S - 사용 예시 입니다.</h2>
      <h3 className="text-heading-m">Heading M - 사용 예시 입니다.</h3>
      <h4 className="text-heading-r">Heading R - 사용 예시 입니다.</h4>
    </div>
  )
};

export const TitleStyles: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <p className="text-title-b">Title B - 사용 예시 입니다.</p>
      <p className="text-title-s">Title S - 사용 예시 입니다.</p>
      <p className="text-title-m">Title M - 사용 예시 입니다.</p>
      <p className="text-title-r">Title R - 사용 예시 입니다.</p>
    </div>
  )
};

export const SubtitleStyles: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <p className="text-subtitle-b">Sub-title B - 사용 예시 입니다.</p>
      <p className="text-subtitle-s">Sub-title S - 사용 예시 입니다.</p>
      <p className="text-subtitle-m">Sub-title M - 사용 예시 입니다.</p>
      <p className="text-subtitle-r">Sub-title R - 사용 예시 입니다.</p>
    </div>
  )
};

export const BodyStyles: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <p className="text-body-b">Body B - 사용 예시 입니다.</p>
      <p className="text-body-s">Body S - 사용 예시 입니다.</p>
      <p className="text-body-m">Body M - 사용 예시 입니다.</p>
      <p className="text-body-r">Body R - 사용 예시 입니다.</p>
    </div>
  )
};

export const BodySmallStyles: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <p className="text-body-small-b">Body Small B - 사용 예시 입니다.</p>
      <p className="text-body-small-s">Body Small S - 사용 예시 입니다.</p>
      <p className="text-body-small-m">Body Small M - 사용 예시 입니다.</p>
      <p className="text-body-small-r">Body Small R - 사용 예시 입니다.</p>
    </div>
  )
};

export const CaptionStyles: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <p className="text-caption-b">Caption B - 사용 예시 입니다.</p>
      <p className="text-caption-s">Caption S - 사용 예시 입니다.</p>
      <p className="text-caption-m">Caption M - 사용 예시 입니다.</p>
      <p className="text-caption-r">Caption R - 사용 예시 입니다.</p>
    </div>
  )
};

export const LabelStyles: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <p className="text-label-b">Label B - 사용 예시 입니다.</p>
      <p className="text-label-s">Label S - 사용 예시 입니다.</p>
      <p className="text-label-m">Label M - 사용 예시 입니다.</p>
      <p className="text-label-r">Label R - 사용 예시 입니다.</p>
    </div>
  )
};
