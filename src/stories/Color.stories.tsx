import type { Meta, StoryObj } from "@storybook/react";
import { Color } from "./Color";

const meta = {
  title: "Design System/Color",
  component: Color,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Color>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const grayColorMap: Record<string, string> = {
  White: "#FFFFFF",
  "50": "#F9FAFB",
  "100": "#F3F4F6",
  "200": "#E5E7EB",
  "300": "#D1D5DB",
  "400": "#9CA3AF",
  "500": "#6B7280",
  "600": "#4B5563",
  "700": "#374151",
  "800": "#1f2937"
};

export const PrimaryColors: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Primary Colors</h2>
      <div className="grid grid-cols-5 gap-4">
        <div>
          <div className="w-24 h-24 rounded-lg bg-primary-0" />
          <p className="mt-2 text-sm font-medium">Primary Color</p>
          <p className="text-xs text-gray-500">#4C79FF</p>
        </div>
        <div>
          <div className="w-24 h-24 rounded-lg bg-primary-10" />
          <p className="mt-2 text-sm font-medium">10%</p>
          <p className="text-xs text-gray-500">#4C79FF</p>
        </div>
        <div>
          <div className="w-24 h-24 rounded-lg bg-primary-30" />
          <p className="mt-2 text-sm font-medium">30%</p>
          <p className="text-xs text-gray-500">#4C79FF</p>
        </div>
        <div>
          <div className="w-24 h-24 rounded-lg bg-linear-to-br from-primary-0 to-secondary-indigo" />
          <p className="mt-2 text-sm font-medium">Gradient</p>
          <p className="text-xs text-gray-500">#4C79FF→#023E99</p>
        </div>
      </div>
    </div>
  )
};

export const SecondaryColors: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Secondary Colors</h2>
      <div className="grid grid-cols-6 gap-4">
        <div>
          <div className="w-20 h-20 rounded-lg bg-secondary-indigo" />
          <p className="mt-2 text-xs font-medium">Indigo</p>
          <p className="text-xs text-gray-500">#023E99</p>
        </div>
        <div>
          <div className="w-20 h-20 rounded-lg bg-secondary-informative" />
          <p className="mt-2 text-xs font-medium">Informative</p>
          <p className="text-xs text-gray-500">#2683E8</p>
        </div>
        <div>
          <div className="w-20 h-20 rounded-lg bg-secondary-negative" />
          <p className="mt-2 text-xs font-medium">Negative</p>
          <p className="text-xs text-gray-500">#DC2626</p>
        </div>
        <div>
          <div className="w-20 h-20 rounded-lg bg-secondary-notice" />
          <p className="mt-2 text-xs font-medium">Notice</p>
          <p className="text-xs text-gray-500">#FBB724</p>
        </div>
        <div>
          <div className="w-20 h-20 rounded-lg bg-secondary-positive" />
          <p className="mt-2 text-xs font-medium">Positive</p>
          <p className="text-xs text-gray-500">#22C55E</p>
        </div>
        <div>
          <div className="w-20 h-20 rounded-lg bg-secondary-fuchsia" />
          <p className="mt-2 text-xs font-medium">Fuchsia</p>
          <p className="text-xs text-gray-500">#FD28EC</p>
        </div>
      </div>
    </div>
  )
};

export const GrayScale: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Gray Scale</h2>
      <div className="grid grid-cols-10 gap-2">
        {[
          { label: "White", value: "#FFFFFF" },
          { label: "50", value: "#F9FAFB" },
          { label: "100", value: "#F3F4F6" },
          { label: "200", value: "#E5E7EB" },
          { label: "300", value: "#D1D5DB" },
          { label: "400", value: "#9CA3AF" },
          { label: "500", value: "#6B7280" },
          { label: "600", value: "#4B5563" },
          { label: "700", value: "#374151" },
          { label: "800", value: "#1f2937" }
        ].map((color) => (
          <div key={color.label}>
            <div
              className={`w-16 h-16 rounded-lg border ${
                grayColorMap[color.label]
              }`}
            />
            <p className="mt-1 text-xs font-medium">{color.label}</p>
            <p className="text-xs text-gray-500">{color.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
};

export const StateColors: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">State Colors</h2>
      <div className="grid grid-cols-5 gap-4">
        <div>
          <div className="w-24 h-24 rounded-lg bg-disabled disabled:bg-disabled" />
          <p className="mt-2 text-sm font-medium">Disabled</p>
          <p className="text-xs text-gray-500">#968DA8</p>
        </div>
        <div>
          <div className="w-24 h-24 rounded-lg bg-primary-0 hover:bg-hover" />
          <p className="mt-2 text-sm font-medium">Hover (B10%)</p>
          <p className="text-xs text-gray-500">#4C79FF</p>
        </div>
        <div>
          <div className="w-24 h-24 rounded-lg bg-primary-0 active:bg-active" />
          <p className="mt-2 text-sm font-medium">Active B10%</p>
          <p className="text-xs text-gray-500">#4C79FF</p>
        </div>
        <div>
          <div className="w-24 h-24 rounded-lg bg-primary-0 focus:bg-focus" />
          <p className="mt-2 text-sm font-medium">Focus</p>
          <p className="text-xs text-gray-500">#4C79FF</p>
        </div>
      </div>
    </div>
  )
};
