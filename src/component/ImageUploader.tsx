import PlusIcon from "@/component/Icon/PlusIcon";

const ImageUploader = () => {
  return (
    <div className="inline-flex flex-col items-start justify-center gap-2">
      <label htmlFor="image-uploader">Label</label>
      <div className="flex">
        <div className="border-primary-0 mr-3 rounded-md border-2 border-dashed p-4">
          <input type="file" className="hidden h-full w-full" />
          <button className="rounded-md p-2">
            <PlusIcon size={36} className="text-primary-0" />
          </button>
        </div>
        <p className="typography-body-small-m self-end">
          5MB 미만의 .png, .jpeg, .gif 파일
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
