import PlusIcon from "@/component/Icon/PlusIcon";
import { useRef, useState } from "react";

const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="inline-flex flex-col items-start justify-center gap-2">
      <label htmlFor="image-uploader">Label</label>
      <div className="flex">
        <div
          className="border-primary-0 relative mr-3 flex h-32 w-32 items-center justify-center rounded-md border-2 border-dashed"
          onClick={handleClick}
        >
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            ref={inputRef}
            id="image-uploader"
            className="hidden"
            onChange={handleImageChange}
          />
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="image"
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            <button className="rounded-md p-2">
              <PlusIcon size={36} className="text-primary-0" />
            </button>
          )}
        </div>
        <p className="typography-body-small-m self-end text-gray-500">
          5MB 미만의 .png, .jpeg, .gif 파일
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
