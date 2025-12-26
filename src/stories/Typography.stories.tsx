import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta = {
  title: "Design System/Typography",
  component: Typography,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HeadingStyles: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <h1 className="typography-heading-b">Heading B - 사용 예시 입니다.</h1>
      <h2 className="typography-heading-s">Heading S - 사용 예시 입니다.</h2>
      <h3 className="typography-heading-m">Heading M - 사용 예시 입니다.</h3>
      <h4 className="typography-heading-r">Heading R - 사용 예시 입니다.</h4>
    </div>
  ),
};

export const TitleStyles: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <p className="typography-title-b">Title B - 사용 예시 입니다.</p>
      <p className="typography-title-s">Title S - 사용 예시 입니다.</p>
      <p className="typography-title-m">Title M - 사용 예시 입니다.</p>
      <p className="typography-title-r">Title R - 사용 예시 입니다.</p>
    </div>
  ),
};

export const SubtitleStyles: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <p className="typography-subtitle-b">Sub-title B - 사용 예시 입니다.</p>
      <p className="typography-subtitle-s">Sub-title S - 사용 예시 입니다.</p>
      <p className="typography-subtitle-m">Sub-title M - 사용 예시 입니다.</p>
      <p className="typography-subtitle-r">Sub-title R - 사용 예시 입니다.</p>
    </div>
  ),
};

export const BodyStyles: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <p className="typography-body-b">Body B - 사용 예시 입니다.</p>
      <p className="typography-body-s">Body S - 사용 예시 입니다.</p>
      <p className="typography-body-m">Body M - 사용 예시 입니다.</p>
      <p className="typography-body-r">Body R - 사용 예시 입니다.</p>
    </div>
  ),
};

export const BodySmallStyles: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <p className="typography-body-small-b">
        Body Small B - 사용 예시 입니다.
      </p>
      <p className="typography-body-small-s">
        Body Small S - 사용 예시 입니다.
      </p>
      <p className="typography-body-small-m">
        Body Small M - 사용 예시 입니다.
      </p>
      <p className="typography-body-small-r">
        Body Small R - 사용 예시 입니다.
      </p>
    </div>
  ),
};

export const CaptionStyles: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <p className="typography-caption-b">Caption B - 사용 예시 입니다.</p>
      <p className="typography-caption-s">Caption S - 사용 예시 입니다.</p>
      <p className="typography-caption-m">Caption M - 사용 예시 입니다.</p>
      <p className="typography-caption-r">Caption R - 사용 예시 입니다.</p>
    </div>
  ),
};

export const LabelStyles: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <p className="typography-label-b">Label B - 사용 예시 입니다.</p>
      <p className="typography-label-s">Label S - 사용 예시 입니다.</p>
      <p className="typography-label-m">Label M - 사용 예시 입니다.</p>
      <p className="typography-label-r">Label R - 사용 예시 입니다.</p>
    </div>
  ),
};
