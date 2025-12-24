export function Color() {
  return (
    <section className="mb-20 p-8">
      <h2 className="mb-4 text-heading-b">Color</h2>

      {/* Primary */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-6">Primary</h3>
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="space-y-2">
            <div className="h-24 rounded-lg border border-gray-300 bg-primary-0"></div>
            <div className="text-sm font-medium">Primary Color</div>
            <div className="text-xs text-gray-500">#4C79FF</div>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-primary-10"></div>
            <div className="text-sm font-medium">10%</div>
            <div className="text-xs text-gray-500">#E6ECFF</div>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-primary-30"></div>
            <div className="text-sm font-medium">30%</div>
            <div className="text-xs text-gray-500">#B3C9FF</div>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-linear-to-r from-primary-0 to-secondary-indigo"></div>
            <div className="text-sm font-medium">Gradient</div>
            <div className="text-xs text-gray-500">#4C79FF/#023E99</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-primary-alt"></div>
            <div className="text-sm font-medium">Primary Color</div>
            <div className="text-xs text-gray-500">#78B0FF</div>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-primary-alt-10"></div>
            <div className="text-sm font-medium">10%</div>
            <div className="text-xs text-gray-500">#E6F0FF</div>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-primary-alt-30"></div>
            <div className="text-sm font-medium">30%</div>
            <div className="text-xs text-gray-500">#C2DDFF</div>
          </div>
        </div>
      </div>

      {/* Secondary */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-6">Secondary</h3>
        <div className="grid grid-cols-6 gap-4 mb-4">
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-secondary-indigo"></div>
            <div className="text-xs font-medium">Indigo</div>
            <div className="text-xs text-gray-500">#023E99</div>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-secondary-informative"></div>
            <div className="text-xs font-medium">Informative</div>
            <div className="text-xs text-gray-500">#2683E8</div>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-secondary-negative"></div>
            <div className="text-xs font-medium">Negative</div>
            <div className="text-xs text-gray-500">#DC2626</div>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-secondary-notice"></div>
            <div className="text-xs font-medium">Notice</div>
            <div className="text-xs text-gray-500">#FBBF24</div>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-secondary-positive"></div>
            <div className="text-xs font-medium">Positive</div>
            <div className="text-xs text-gray-500">#22C55E</div>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-secondary-fuchsia"></div>
            <div className="text-xs font-medium">Fuchsia</div>
            <div className="text-xs text-gray-500">#FD28EC</div>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-secondary-indigo-light"></div>
            <div className="text-xs font-medium">Indigo</div>
            <div className="text-xs text-gray-500">#A3C3FF</div>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-secondary-informative-light"></div>
            <div className="text-xs font-medium">Informative</div>
            <div className="text-xs text-gray-500">#53B2FF</div>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-secondary-negative-light"></div>
            <div className="text-xs font-medium">Negative</div>
            <div className="text-xs text-gray-500">#FF6363</div>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-secondary-notice-light"></div>
            <div className="text-xs font-medium">Notice</div>
            <div className="text-xs text-gray-500">#FFDB7F</div>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-secondary-positive-light"></div>
            <div className="text-xs font-medium">Positive</div>
            <div className="text-xs text-gray-500">#62EC95</div>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-secondary-fuchsia-light"></div>
            <div className="text-xs font-medium">Fuchsia</div>
            <div className="text-xs text-gray-500">#FF87F5</div>
          </div>
        </div>
      </div>

      {/* Gray */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-6">Gray</h3>
        <div className="grid grid-cols-9 gap-3">
          <div className="space-y-2">
            <div className="h-16 rounded-lg border border-gray-300 bg-white"></div>
            <div className="text-xs font-medium">White</div>
            <div className="text-xs text-gray-500">#FFFFFF</div>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-gray-50"></div>
            <div className="text-xs font-medium">50</div>
            <div className="text-xs text-gray-500">#F9FAFB</div>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-gray-100"></div>
            <div className="text-xs font-medium">100</div>
            <div className="text-xs text-gray-500">#F0F2F5</div>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-gray-200"></div>
            <div className="text-xs font-medium">200</div>
            <div className="text-xs text-gray-500">#E5E7EB</div>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-gray-300"></div>
            <div className="text-xs font-medium">300</div>
            <div className="text-xs text-gray-500">#CCD0D6</div>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-gray-400"></div>
            <div className="text-xs font-medium">400</div>
            <div className="text-xs text-gray-500">#969DA8</div>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-gray-500"></div>
            <div className="text-xs font-medium">500</div>
            <div className="text-xs text-gray-500">#717887</div>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-gray-600"></div>
            <div className="text-xs font-medium">600</div>
            <div className="text-xs text-gray-500">#4B5563</div>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-gray-700"></div>
            <div className="text-xs font-medium">700</div>
            <div className="text-xs text-gray-500">#394252</div>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-gray-800"></div>
            <div className="text-xs font-medium">800</div>
            <div className="text-xs text-gray-500">#1f2937</div>
          </div>
        </div>
      </div>

      {/* State */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-6">State</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-disabled disabled:bg-disabled"></div>
            <div className="text-xs font-medium">Disabled(400)</div>
            <div className="text-xs text-gray-500">#9CA3AF</div>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg border border-gray-200 bg-primary-0 hover:bg-[#0000001A]"></div>
            <div className="text-xs font-medium">Hover (B10%)</div>
            <div className="text-xs text-gray-500">#4C79FF</div>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg border border-gray-200 bg-primary-0 active:bg-active"></div>
            <div className="text-xs font-medium">Active B10%</div>
            <div className="text-xs text-gray-500">#4C79FF</div>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg ring-2 ring-focus bg-primary-0 focus:bg-focus"></div>
            <div className="text-xs font-medium">Focus</div>
            <div className="text-xs text-gray-500">#4C79FF</div>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-dim-50"></div>
            <div className="text-xs font-medium text-white">Dim1 B50%</div>
            <div className="text-xs text-gray-500">#000000</div>
          </div>
        </div>
      </div>
    </section>
  );
}
