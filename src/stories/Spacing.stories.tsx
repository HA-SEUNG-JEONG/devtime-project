import type { Meta, StoryObj } from "@storybook/react";
import { Spacing } from "./Spacing";

const meta = {
  title: "Design System/Spacing",
  component: Spacing,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Spacing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComponentSpacing: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">컴포넌트 간 스페이싱</h2>
      <p className="text-gray-600 mb-8">
        2 - 4 - 8 - 12 - 16 - 20 - 24 - 32 - 36
      </p>
      <div className="space-y-4">
        {[2, 4, 8, 12, 16, 20, 24, 32, 36].map((size) => (
          <div key={size} className="flex items-center gap-4">
            <div className="w-16 text-sm font-medium text-gray-700">
              {size}px
            </div>
            <div
              className="h-12 rounded bg-blue-500"
              style={{ width: `${size * 4}px` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
};

export const VerticalSpacing: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">
        영역 간 스페이싱 (컴포넌트 스페이싱 포함)
      </h2>
      <p className="text-gray-600 mb-8">40 - 48 - 56 - 64 - 72</p>
      <div className="space-y-4">
        {[40, 48, 56, 64, 72].map((size) => (
          <div key={size} className="flex items-center gap-4">
            <div className="w-16 text-sm font-medium text-gray-700">
              {size}px
            </div>
            <div
              className="h-16 rounded bg-blue-400"
              style={{ width: `${size * 4}px` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
};

export const GridSystem: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">8-point Grid System</h2>
      <p className="text-gray-600 mb-8">모든 간격은 8의 배수로 설정됩니다</p>
      <div className="inline-grid grid-cols-[repeat(9,8px)] gap-0 border border-gray-300">
        {Array.from({ length: 81 }).map((_, i) => (
          <div key={i} className="w-2 h-2 border border-gray-200 bg-blue-100" />
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-500">8px × 8px grid cells</p>
    </div>
  )
};

export const SpacingExamples: Story = {
  render: () => (
    <div className="p-8 space-y-12">
      <div>
        <h3 className="text-lg font-semibold mb-4">Card with 16px padding</h3>
        <div className="border border-gray-300 rounded-lg p-4 max-w-md">
          <h4 className="font-bold mb-2">Card Title</h4>
          <p className="text-sm text-gray-600">
            This card uses 16px padding on all sides.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Buttons with 8px gap</h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Button 1
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Button 2
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Button 3
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Stack with 24px gap</h3>
        <div className="space-y-6 max-w-md">
          <div className="p-4 bg-gray-100 rounded">Item 1</div>
          <div className="p-4 bg-gray-100 rounded">Item 2</div>
          <div className="p-4 bg-gray-100 rounded">Item 3</div>
        </div>
      </div>
    </div>
  )
};
