export function Typography() {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-4">Typography</h2>
      <p className="text-gray-600 mb-12">
        메인 폰트는 Pretendard입니다. 4가지 굵기 (Bold, Semi Bold, Medium,
        Regular)를 제공합니다. Letter Spacing은 별도로 지정하지 않고 0%를
        유지합니다.
      </p>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Pretendard</h3>
        <div className="flex gap-4 mb-8">
          <div className="px-6 py-3 bg-gray-100 rounded">
            <div className="text-label-b text-sm text-gray-600 mb-1">Bold</div>
            <div className="text-label-r text-xs text-gray-500">700</div>
          </div>
          <div className="px-6 py-3 bg-gray-100 rounded">
            <div className="text-label-s text-sm text-gray-600 mb-1">
              Semi Bold
            </div>
            <div className="text-label-r text-xs text-gray-500">600</div>
          </div>
          <div className="px-6 py-3 bg-gray-100 rounded">
            <div className="text-label-m text-sm text-gray-600 mb-1">
              Medium
            </div>
            <div className="text-label-r text-xs text-gray-500">500</div>
          </div>
          <div className="px-6 py-3 bg-gray-100 rounded">
            <div className="text-label-r text-sm text-gray-600 mb-1">
              Regular
            </div>
            <div className="text-label-r text-xs text-gray-500">400</div>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
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
              <td className="px-6 py-4 text-label-b">Heading B</td>
              <td className="px-6 py-4 text-label-r text-sm text-gray-600">
                Bold 700
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">24/30</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.5</td>
              <td className="px-6 py-4 text-heading-b leading-7.5">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-semibold">Heading S</td>
              <td className="px-6 py-4 text-sm text-gray-600">Semi Bold 600</td>
              <td className="px-6 py-4 text-sm text-gray-600">24/30</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.5</td>
              <td className="px-6 py-4 text-heading-s leading-7.5">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">Heading M</td>
              <td className="px-6 py-4 text-sm text-gray-600">Medium 500</td>
              <td className="px-6 py-4 text-sm text-gray-600">24/30</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.5</td>
              <td className="px-6 py-4 text-heading-m leading-7.5">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-normal">Heading R</td>
              <td className="px-6 py-4 text-sm text-gray-600">Regular 400</td>
              <td className="px-6 py-4 text-sm text-gray-600">24/30</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.5</td>
              <td className="px-6 py-4 text-heading-r leading-7.5">
                사용 예시 입니다.
              </td>
            </tr>

            {/* Title */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-bold">Title B</td>
              <td className="px-6 py-4 text-sm text-gray-600">Bold 700</td>
              <td className="px-6 py-4 text-sm text-gray-600">20/24</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.25</td>
              <td className="px-6 py-4 text-title-b leading-6">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-semibold">Title S</td>
              <td className="px-6 py-4 text-sm text-gray-600">Semi Bold 600</td>
              <td className="px-6 py-4 text-sm text-gray-600">20/24</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.25</td>
              <td className="px-6 py-4 text-title-s leading-6">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">Title M</td>
              <td className="px-6 py-4 text-sm text-gray-600">Medium 500</td>
              <td className="px-6 py-4 text-sm text-gray-600">20/24</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.25</td>
              <td className="px-6 py-4 text-title-m leading-6">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-r">Title R</td>
              <td className="px-6 py-4 text-sm text-gray-600">Regular 400</td>
              <td className="px-6 py-4 text-sm text-gray-600">20/24</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.25</td>
              <td className="px-6 py-4 text-title-r leading-6">
                사용 예시 입니다.
              </td>
            </tr>

            {/* Sub-title */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-b">Sub-title B</td>
              <td className="px-6 py-4 text-sm text-gray-600">Bold 700</td>
              <td className="px-6 py-4 text-sm text-gray-600">18/22</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.125</td>
              <td className="px-6 py-4 text-subtitle-b leading-5.5">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-s">Sub-title S</td>
              <td className="px-6 py-4 text-sm text-gray-600">Semi Bold 600</td>
              <td className="px-6 py-4 text-sm text-gray-600">18/22</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.125</td>
              <td className="px-6 py-4 text-subtitle-s leading-5.5">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-m">Sub-title M</td>
              <td className="px-6 py-4 text-sm text-gray-600">Medium 500</td>
              <td className="px-6 py-4 text-sm text-gray-600">18/22</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.125</td>
              <td className="px-6 py-4 text-subtitle-m leading-5.5">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-r">Sub-title R</td>
              <td className="px-6 py-4 text-sm text-gray-600">Regular 400</td>
              <td className="px-6 py-4 text-sm text-gray-600">18/22</td>
              <td className="px-6 py-4 text-sm text-gray-600">1.125</td>
              <td className="px-6 py-4 text-subtitle-r leading-5.5">
                사용 예시 입니다.
              </td>
            </tr>

            {/* Body */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-b">Body B</td>
              <td className="px-6 py-4 text-sm text-gray-600">Bold 700</td>
              <td className="px-6 py-4 text-sm text-gray-600">16/20</td>
              <td className="px-6 py-4 text-sm text-gray-600">1</td>
              <td className="px-6 py-4 text-body-b leading-5">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-s">Body S</td>
              <td className="px-6 py-4 text-sm text-gray-600">Semi Bold 600</td>
              <td className="px-6 py-4 text-sm text-gray-600">16/20</td>
              <td className="px-6 py-4 text-sm text-gray-600">1</td>
              <td className="px-6 py-4 text-body-s leading-5">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-m">Body M</td>
              <td className="px-6 py-4 text-sm text-gray-600">Medium 500</td>
              <td className="px-6 py-4 text-sm text-gray-600">16/20</td>
              <td className="px-6 py-4 text-sm text-gray-600">1</td>
              <td className="px-6 py-4 text-body-m leading-5">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-r">Body R</td>
              <td className="px-6 py-4 text-sm text-gray-600">Regular 400</td>
              <td className="px-6 py-4 text-sm text-gray-600">16/20</td>
              <td className="px-6 py-4 text-sm text-gray-600">1</td>
              <td className="px-6 py-4 text-body-r leading-5">
                사용 예시 입니다.
              </td>
            </tr>

            {/* Body Small */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-b">Body Small B</td>
              <td className="px-6 py-4 text-sm text-gray-600">Bold 700</td>
              <td className="px-6 py-4 text-sm text-gray-600">14/18</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.875</td>
              <td className="px-6 py-4 text-body-small-b leading-4.5">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-s">Body Small S</td>
              <td className="px-6 py-4 text-sm text-gray-600">Semi Bold 600</td>
              <td className="px-6 py-4 text-sm text-gray-600">14/18</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.875</td>
              <td className="px-6 py-4 text-body-small-s leading-4.5">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-m">Body Small M</td>
              <td className="px-6 py-4 text-sm text-gray-600">Medium 500</td>
              <td className="px-6 py-4 text-sm text-gray-600">14/18</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.875</td>
              <td className="px-6 py-4 text-body-small-m leading-4.5">
                사용 예시 입니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-r">Body Small R</td>
              <td className="px-6 py-4 text-sm text-gray-600">Regular 400</td>
              <td className="px-6 py-4 text-sm text-gray-600">14/18</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.875</td>
              <td className="px-6 py-4 text-body-small-r leading-4.5">
                사용 예시 입니다.
              </td>
            </tr>

            {/* Caption */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-b">Caption B</td>
              <td className="px-6 py-4 text-sm text-gray-600">Bold 700</td>
              <td className="px-6 py-4 text-sm text-gray-600">12/16</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.75</td>
              <td className="px-6 py-4 text-caption-b leading-4">
                사용 예시 합니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-s">Caption S</td>
              <td className="px-6 py-4 text-sm text-gray-600">Semi Bold 600</td>
              <td className="px-6 py-4 text-sm text-gray-600">12/16</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.75</td>
              <td className="px-6 py-4 text-caption-s leading-4">
                사용 예시 합니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-m">Caption M</td>
              <td className="px-6 py-4 text-sm text-gray-600">Medium 500</td>
              <td className="px-6 py-4 text-sm text-gray-600">12/16</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.75</td>
              <td className="px-6 py-4 text-caption-m leading-4">
                사용 예시 합니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-r">Caption R</td>
              <td className="px-6 py-4 text-sm text-gray-600">Regular 400</td>
              <td className="px-6 py-4 text-sm text-gray-600">12/16</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.75</td>
              <td className="px-6 py-4 text-caption-r leading-4">
                사용 예시 합니다.
              </td>
            </tr>

            {/* Label */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-b">Label B</td>
              <td className="px-6 py-4 text-sm text-gray-600">Bold 700</td>
              <td className="px-6 py-4 text-sm text-gray-600">10/12</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.625</td>
              <td className="px-6 py-4 text-label-b leading-3">
                사용 예시 합니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-s">Label S</td>
              <td className="px-6 py-4 text-sm text-gray-600">Semi Bold 600</td>
              <td className="px-6 py-4 text-sm text-gray-600">10/12</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.625</td>
              <td className="px-6 py-4 text-label-s leading-3">
                사용 예시 합니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-m">Label M</td>
              <td className="px-6 py-4 text-sm text-gray-600">Medium 500</td>
              <td className="px-6 py-4 text-sm text-gray-600">10/12</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.625</td>
              <td className="px-6 py-4 text-label-m leading-3">
                사용 예시 합니다.
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-label-r">Label R</td>
              <td className="px-6 py-4 text-sm text-gray-600">Regular 400</td>
              <td className="px-6 py-4 text-sm text-gray-600">10/12</td>
              <td className="px-6 py-4 text-sm text-gray-600">0.625</td>
              <td className="px-6 py-4 text-label-r leading-3">
                사용 예시 합니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
