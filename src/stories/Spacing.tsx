export function Spacing() {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-4">Spacing</h2>
      <p className="text-gray-600 mb-12">
        체계적인 배열을 위한 요소 간의 간격에 대한 값, 페이지, 컴포넌트의
        사이즈와 간격 및 수치를 해당 단위로 맞춰 사용하는 것 권장합니다.
      </p>

      <div className="mb-12">
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
          <li>8-point Grid를 기본으로 합니다.</li>
          <li>8이 포함하고 있는 2와 4의 배수도 사용 가능합니다.</li>
        </ul>
      </div>

      {/* Component Spacing */}
      <div className="mb-16">
        <h3 className="text-lg font-semibold mb-6">컴포넌트 간 스페이싱</h3>
        <p className="text-sm text-gray-600 mb-6">
          2 - 4 - 8 - 12 - 16 - 20 - 24 - 32 - 36
        </p>
        <div className="flex items-end gap-2">
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-[#4C79FF] rounded"
              style={{ width: "0.125rem", height: "0.125rem" }}
            ></div>
            <span className="text-xs text-gray-600">2</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-[#4C79FF] rounded"
              style={{ width: "0.25rem", height: "0.25rem" }}
            ></div>
            <span className="text-xs text-gray-600">4</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-[#4C79FF] rounded"
              style={{ width: "0.5rem", height: "0.5rem" }}
            ></div>
            <span className="text-xs text-gray-600">8</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-[#4C79FF] rounded"
              style={{ width: "0.75rem", height: "0.75rem" }}
            ></div>
            <span className="text-xs text-gray-600">12</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-[#4C79FF] rounded"
              style={{ width: "1rem", height: "1rem" }}
            ></div>
            <span className="text-xs text-gray-600">16</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-[#4C79FF] rounded"
              style={{ width: "1.25rem", height: "1.25rem" }}
            ></div>
            <span className="text-xs text-gray-600">20</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-[#4C79FF] rounded"
              style={{ width: "1.5rem", height: "1.5rem" }}
            ></div>
            <span className="text-xs text-gray-600">24</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-[#4C79FF] rounded"
              style={{ width: "2rem", height: "2rem" }}
            ></div>
            <span className="text-xs text-gray-600">32</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-[#4C79FF] rounded"
              style={{ width: "2.25rem", height: "2.25rem" }}
            ></div>
            <span className="text-xs text-gray-600">36</span>
          </div>
        </div>
      </div>

      {/* Vertical Spacing */}
      <div className="mb-16">
        <h3 className="text-lg font-semibold mb-6">
          영역 간 스페이싱 (컴포넌트 스페이싱 포함)
        </h3>
        <p className="text-sm text-gray-600 mb-6">40 - 48 - 56 - 64 - 72</p>
        <div className="flex items-end gap-2">
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-[#4C79FF] bg-opacity-20 rounded"
              style={{ width: "2.5rem", height: "2.5rem" }}
            ></div>
            <span className="text-xs text-gray-600">40</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-[#4C79FF] bg-opacity-30 rounded"
              style={{ width: "3rem", height: "3rem" }}
            ></div>
            <span className="text-xs text-gray-600">48</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-[#4C79FF] bg-opacity-40 rounded"
              style={{ width: "3.5rem", height: "3.5rem" }}
            ></div>
            <span className="text-xs text-gray-600">56</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-[#4C79FF] bg-opacity-60 rounded"
              style={{ width: "4rem", height: "4rem" }}
            ></div>
            <span className="text-xs text-gray-600">64</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-[#4C79FF] rounded"
              style={{ width: "4.5rem", height: "4.5rem" }}
            ></div>
            <span className="text-xs text-gray-600">72</span>
          </div>
        </div>
      </div>
    </section>
  );
}
