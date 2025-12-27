export function Typography() {
  return (
    <section className="mb-20">
      <h2 className="mb-4 text-3xl font-bold">Typography</h2>
      <p className="mb-12 text-gray-600">
        메인 폰트는 Pretendard입니다. 4가지 굵기 (Bold, Semi Bold, Medium,
        Regular)를 제공합니다. Letter Spacing은 별도로 지정하지 않고 0%를
        유지합니다.
      </p>

      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Pretendard</h3>
        <div className="mb-8 flex gap-4">
          <div className="rounded bg-gray-100 px-6 py-3">
            <div className="text-label-b mb-1 text-sm text-gray-600">Bold</div>
            <div className="text-label-r text-xs text-gray-500">700</div>
          </div>
          <div className="rounded bg-gray-100 px-6 py-3">
            <div className="text-label-s mb-1 text-sm text-gray-600">
              Semi Bold
            </div>
            <div className="text-label-r text-xs text-gray-500">600</div>
          </div>
          <div className="rounded bg-gray-100 px-6 py-3">
            <div className="text-label-m mb-1 text-sm text-gray-600">
              Medium
            </div>
            <div className="text-label-r text-xs text-gray-500">500</div>
          </div>
          <div className="rounded bg-gray-100 px-6 py-3">
            <div className="text-label-r mb-1 text-sm text-gray-600">
              Regular
            </div>
            <div className="text-label-r text-xs text-gray-500">400</div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Style
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Weight
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Size/Line-height
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                REM 16px
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Example
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Heading */}
            <tr className="hover:bg-gray-50">
              <td className="text-label-b px-6 py-4">Heading B</td>
              <td className="text-label-r px-6 py-4 text-sm text-gray-600">
                Bold 700
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">24/30</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.5</td>
              <td className="typography-heading-b px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-semibold">Heading S</td>
              <td className="px-6 py-4 text-sm text-gray-600">Semi Bold 600</td>
              <td className="px-6 py-4 text-sm text-gray-600">24/30</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.5</td>
              <td className="typography-heading-s px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">Heading M</td>
              <td className="px-6 py-4 text-sm text-gray-600">Medium 500</td>
              <td className="px-6 py-4 text-sm text-gray-600">24/30</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.5</td>
              <td className="typography-heading-m px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-normal">Heading R</td>
              <td className="px-6 py-4 text-sm text-gray-600">Regular 400</td>
              <td className="px-6 py-4 text-sm text-gray-600">24/30</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.5</td>
              <td className="typography-heading-r px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>

            {/* Title */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-bold">Title B</td>
              <td className="px-6 py-4 text-sm text-gray-600">Bold 700</td>
              <td className="px-6 py-4 text-sm text-gray-600">20/24</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.25</td>
              <td className="typography-title-b px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-semibold">Title S</td>
              <td className="px-6 py-4 text-sm text-gray-600">Semi Bold 600</td>
              <td className="px-6 py-4 text-sm text-gray-600">20/24</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.25</td>
              <td className="typography-title-s px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">Title M</td>
              <td className="px-6 py-4 text-sm text-gray-600">Medium 500</td>
              <td className="px-6 py-4 text-sm text-gray-600">20/24</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.25</td>
              <td className="typography-title-m px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-r px-6 py-4">Title R</td>
              <td className="px-6 py-4 text-sm text-gray-600">Regular 400</td>
              <td className="px-6 py-4 text-sm text-gray-600">20/24</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.25</td>
              <td className="typography-title-r px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>

            {/* Sub-title */}
            <tr className="hover:bg-gray-50">
              <td className="text-label-b px-6 py-4">Sub-title B</td>
              <td className="px-6 py-4 text-sm text-gray-600">Bold 700</td>
              <td className="px-6 py-4 text-sm text-gray-600">18/22</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.125</td>
              <td className="typography-subtitle-b px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-s px-6 py-4">Sub-title S</td>
              <td className="px-6 py-4 text-sm text-gray-600">Semi Bold 600</td>
              <td className="px-6 py-4 text-sm text-gray-600">18/22</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.125</td>
              <td className="typography-subtitle-s px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-m px-6 py-4">Sub-title M</td>
              <td className="px-6 py-4 text-sm text-gray-600">Medium 500</td>
              <td className="px-6 py-4 text-sm text-gray-600">18/22</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.125</td>
              <td className="typography-subtitle-m px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-r px-6 py-4">Sub-title R</td>
              <td className="px-6 py-4 text-sm text-gray-600">Regular 400</td>
              <td className="px-6 py-4 text-sm text-gray-600">18/22</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.125</td>
              <td className="typography-subtitle-r px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>

            {/* Body */}
            <tr className="hover:bg-gray-50">
              <td className="text-label-b px-6 py-4">Body B</td>
              <td className="px-6 py-4 text-sm text-gray-600">Bold 700</td>
              <td className="px-6 py-4 text-sm text-gray-600">16/20</td>
              <td className="px-6 py-4 text-sm text-gray-600">1</td>
              <td className="typography-body-b px-6 py-4">사용 예시 입니다.</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-s px-6 py-4">Body S</td>
              <td className="px-6 py-4 text-sm text-gray-600">Semi Bold 600</td>
              <td className="px-6 py-4 text-sm text-gray-600">16/20</td>
              <td className="px-6 py-4 text-sm text-gray-600">1</td>
              <td className="typography-body-s px-6 py-4">사용 예시 입니다.</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-m px-6 py-4">Body M</td>
              <td className="px-6 py-4 text-sm text-gray-600">Medium 500</td>
              <td className="px-6 py-4 text-sm text-gray-600">16/20</td>
              <td className="px-6 py-4 text-sm text-gray-600">1</td>
              <td className="typography-body-m px-6 py-4">사용 예시 입니다.</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-r px-6 py-4">Body R</td>
              <td className="px-6 py-4 text-sm text-gray-600">Regular 400</td>
              <td className="px-6 py-4 text-sm text-gray-600">16/20</td>
              <td className="px-6 py-4 text-sm text-gray-600">1</td>
              <td className="typography-body-r px-6 py-4">사용 예시 입니다.</td>
            </tr>

            {/* Body Small */}
            <tr className="hover:bg-gray-50">
              <td className="text-label-b px-6 py-4">Body Small B</td>
              <td className="px-6 py-4 text-sm text-gray-600">Bold 700</td>
              <td className="px-6 py-4 text-sm text-gray-600">14/18</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.875</td>
              <td className="typography-body-small-b px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-s px-6 py-4">Body Small S</td>
              <td className="px-6 py-4 text-sm text-gray-600">Semi Bold 600</td>
              <td className="px-6 py-4 text-sm text-gray-600">14/18</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.875</td>
              <td className="typography-body-small-s px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-m px-6 py-4">Body Small M</td>
              <td className="px-6 py-4 text-sm text-gray-600">Medium 500</td>
              <td className="px-6 py-4 text-sm text-gray-600">14/18</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.875</td>
              <td className="typography-body-small-m px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-r px-6 py-4">Body Small R</td>
              <td className="px-6 py-4 text-sm text-gray-600">Regular 400</td>
              <td className="px-6 py-4 text-sm text-gray-600">14/18</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.875</td>
              <td className="typography-body-small-r px-6 py-4">
                사용 예시 입니다.
              </td>
            </tr>

            {/* Caption */}
            <tr className="hover:bg-gray-50">
              <td className="text-label-b px-6 py-4">Caption B</td>
              <td className="px-6 py-4 text-sm text-gray-600">Bold 700</td>
              <td className="px-6 py-4 text-sm text-gray-600">12/16</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.75</td>
              <td className="typography-caption-b px-6 py-4">
                사용 예시 합니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-s px-6 py-4">Caption S</td>
              <td className="px-6 py-4 text-sm text-gray-600">Semi Bold 600</td>
              <td className="px-6 py-4 text-sm text-gray-600">12/16</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.75</td>
              <td className="typography-caption-s px-6 py-4">
                사용 예시 합니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-m px-6 py-4">Caption M</td>
              <td className="px-6 py-4 text-sm text-gray-600">Medium 500</td>
              <td className="px-6 py-4 text-sm text-gray-600">12/16</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.75</td>
              <td className="typography-caption-m px-6 py-4">
                사용 예시 합니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-r px-6 py-4">Caption R</td>
              <td className="px-6 py-4 text-sm text-gray-600">Regular 400</td>
              <td className="px-6 py-4 text-sm text-gray-600">12/16</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.75</td>
              <td className="typography-caption-r px-6 py-4">
                사용 예시 합니다.
              </td>
            </tr>

            {/* Label */}
            <tr className="hover:bg-gray-50">
              <td className="text-label-b px-6 py-4">Label B</td>
              <td className="px-6 py-4 text-sm text-gray-600">Bold 700</td>
              <td className="px-6 py-4 text-sm text-gray-600">10/12</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.625</td>
              <td className="typography-label-b px-6 py-4">
                사용 예시 합니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-s px-6 py-4">Label S</td>
              <td className="px-6 py-4 text-sm text-gray-600">Semi Bold 600</td>
              <td className="px-6 py-4 text-sm text-gray-600">10/12</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.625</td>
              <td className="typography-label-s px-6 py-4">
                사용 예시 합니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-m px-6 py-4">Label M</td>
              <td className="px-6 py-4 text-sm text-gray-600">Medium 500</td>
              <td className="px-6 py-4 text-sm text-gray-600">10/12</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.625</td>
              <td className="typography-label-m px-6 py-4">
                사용 예시 합니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="text-label-r px-6 py-4">Label R</td>
              <td className="px-6 py-4 text-sm text-gray-600">Regular 400</td>
              <td className="px-6 py-4 text-sm text-gray-600">10/12</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.625</td>
              <td className="typography-label-r px-6 py-4">
                사용 예시 합니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
