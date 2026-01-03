export function Color() {
  return (
    <section className="mb-20 p-8">
      <h2 className="text-heading-b mb-4">Color</h2>

      {/* Primary */}
      <div className="mb-12">
        <h3 className="mb-6 text-xl font-semibold">Primary</h3>
        <div className="mb-8 grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="bg-primary-0 h-24 rounded-lg border border-gray-300"></div>
            <div className="text-sm font-medium">Primary Color</div>
            <div className="text-xs text-gray-500">#4C79FF</div>
          </div>
          <div className="space-y-2">
            <div className="bg-primary-10 h-24 rounded-lg"></div>
            <div className="text-sm font-medium">10%</div>
            <div className="text-xs text-gray-500">#E6ECFF</div>
          </div>
          <div className="space-y-2">
            <div className="bg-primary-30 h-24 rounded-lg"></div>
            <div className="text-sm font-medium">30%</div>
            <div className="text-xs text-gray-500">#B3C9FF</div>
          </div>
          <div className="space-y-2">
            <div className="from-primary-0 to-secondary-indigo h-24 rounded-lg bg-linear-to-r"></div>
            <div className="text-sm font-medium">Gradient</div>
            <div className="text-xs text-gray-500">#4C79FF/#023E99</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="bg-primary-alt h-24 rounded-lg"></div>
            <div className="text-sm font-medium">Primary Color</div>
            <div className="text-xs text-gray-500">#78B0FF</div>
          </div>
          <div className="space-y-2">
            <div className="bg-primary-alt-10 h-24 rounded-lg"></div>
            <div className="text-sm font-medium">10%</div>
            <div className="text-xs text-gray-500">#E6F0FF</div>
          </div>
          <div className="space-y-2">
            <div className="bg-primary-alt-30 h-24 rounded-lg"></div>
            <div className="text-sm font-medium">30%</div>
            <div className="text-xs text-gray-500">#C2DDFF</div>
          </div>
        </div>
      </div>

      {/* Secondary */}
      <div className="mb-12">
        <h3 className="mb-6 text-xl font-semibold">Secondary</h3>
        <div className="mb-4 grid grid-cols-6 gap-4">
          <div className="space-y-2">
            <div className="bg-secondary-indigo h-20 rounded-lg"></div>
            <div className="text-xs font-medium">Indigo</div>
            <div className="text-xs text-gray-500">#023E99</div>
          </div>
          <div className="space-y-2">
            <div className="bg-secondary-informative h-20 rounded-lg"></div>
            <div className="text-xs font-medium">Informative</div>
            <div className="text-xs text-gray-500">#2683E8</div>
          </div>
          <div className="space-y-2">
            <div className="bg-secondary-negative h-20 rounded-lg"></div>
            <div className="text-xs font-medium">Negative</div>
            <div className="text-xs text-gray-500">#DC2626</div>
          </div>
          <div className="space-y-2">
            <div className="bg-secondary-notice h-20 rounded-lg"></div>
            <div className="text-xs font-medium">Notice</div>
            <div className="text-xs text-gray-500">#FBBF24</div>
          </div>
          <div className="space-y-2">
            <div className="bg-secondary-positive h-20 rounded-lg"></div>
            <div className="text-xs font-medium">Positive</div>
            <div className="text-xs text-gray-500">#22C55E</div>
          </div>
          <div className="space-y-2">
            <div className="bg-secondary-fuchsia h-20 rounded-lg"></div>
            <div className="text-xs font-medium">Fuchsia</div>
            <div className="text-xs text-gray-500">#FD28EC</div>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <div className="space-y-2">
            <div className="bg-secondary-indigo-light h-20 rounded-lg"></div>
            <div className="text-xs font-medium">Indigo</div>
            <div className="text-xs text-gray-500">#A3C3FF</div>
          </div>
          <div className="space-y-2">
            <div className="bg-secondary-informative-light h-20 rounded-lg"></div>
            <div className="text-xs font-medium">Informative</div>
            <div className="text-xs text-gray-500">#53B2FF</div>
          </div>
          <div className="space-y-2">
            <div className="bg-secondary-negative-light h-20 rounded-lg"></div>
            <div className="text-xs font-medium">Negative</div>
            <div className="text-xs text-gray-500">#FF6363</div>
          </div>
          <div className="space-y-2">
            <div className="bg-secondary-notice-light h-20 rounded-lg"></div>
            <div className="text-xs font-medium">Notice</div>
            <div className="text-xs text-gray-500">#FFDB7F</div>
          </div>
          <div className="space-y-2">
            <div className="bg-secondary-positive-light h-20 rounded-lg"></div>
            <div className="text-xs font-medium">Positive</div>
            <div className="text-xs text-gray-500">#62EC95</div>
          </div>
          <div className="space-y-2">
            <div className="bg-secondary-fuchsia-light h-20 rounded-lg"></div>
            <div className="text-xs font-medium">Fuchsia</div>
            <div className="text-xs text-gray-500">#FF87F5</div>
          </div>
        </div>
      </div>

      {/* Gray */}
      <div className="mb-12">
        <h3 className="mb-6 text-xl font-semibold">Gray</h3>
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
        <h3 className="mb-6 text-xl font-semibold">State</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="space-y-2">
            <div className="h-20 rounded-lg bg-gray-400 disabled:bg-gray-400"></div>
            <div className="text-xs font-medium">Disabled(400)</div>
            <div className="text-xs text-gray-500">#969DA8</div>
          </div>
          <div className="space-y-2">
            <div className="bg-primary-0 h-20 rounded-lg border border-gray-200 hover:bg-[#0000001A]"></div>
            <div className="text-xs font-medium">Hover (B10%)</div>
            <div className="text-xs text-gray-500">#4C79FF</div>
          </div>
          <div className="space-y-2">
            <div className="bg-primary-0 active:bg-active h-20 rounded-lg border border-gray-200"></div>
            <div className="text-xs font-medium">Active B10%</div>
            <div className="text-xs text-gray-500">#4C79FF</div>
          </div>
          <div className="space-y-2">
            <div className="ring-focus bg-primary-0 focus:bg-focus h-20 rounded-lg ring-2"></div>
            <div className="text-xs font-medium">Focus</div>
            <div className="text-xs text-gray-500">#4C79FF</div>
          </div>
          <div className="space-y-2">
            <div className="bg-dim-50 h-20 rounded-lg"></div>
            <div className="text-xs font-medium text-white">Dim1 B50%</div>
            <div className="text-xs text-gray-500">#000000</div>
          </div>
        </div>
      </div>
    </section>
  );
}
