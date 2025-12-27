import PlusIcon from "@/components/Icon/PlusIcon";
import { useRef, useState } from "react";
import TrashIcon from "../Icon/TrashIcon";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) {
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("파일 크기는 5MB 미만이어야 합니다.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        setImageUrl(reader.result as string);
        setError(null);
      }
    };

    reader.onerror = () => {
      setError("파일을 읽는 중 오류가 발생했습니다.");
      setImageUrl(null);
    };

    reader.onabort = () => {
      setError("파일 읽기가 취소되었습니다.");
      setImageUrl(null);
    };

    try {
      reader.readAsDataURL(file);
    } catch {
      setError("파일을 읽을 수 없습니다. 권한을 확인해주세요.");
      setImageUrl(null);
    }

    event.target.value = "";
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setImageUrl(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="inline-flex flex-col items-start justify-center gap-2">
      <label htmlFor="image-uploader">Label</label>
      <div className="flex flex-col gap-2">
        <div className="relative mr-3 size-30">
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            ref={inputRef}
            id="image-uploader"
            className="hidden"
            onChange={handleImageChange}
          />
          {imageUrl ? (
            <div className="border-primary-0 relative flex h-full w-full items-center justify-center rounded-md border-2 border-dashed">
              <img
                src={imageUrl}
                alt="업로드된 이미지"
                className="h-full w-full rounded-md object-cover"
              />
              <button
                type="button"
                className="focus:ring-primary-0 absolute top-1 right-1 rounded-full bg-white p-1 focus:ring-2 focus:outline-none"
                onClick={handleDelete}
                aria-label="이미지 삭제"
              >
                <TrashIcon size={24} className="text-primary-0" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="border-primary-0 focus:ring-primary-0 flex h-full w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed p-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              aria-label="이미지 업로드"
              onClick={handleClick}
            >
              <PlusIcon size={36} className="text-primary-0" />
            </button>
          )}
        </div>
        <p className="typography-body-small-m self-end text-gray-500">
          5MB 미만의 .png, .jpeg, .gif 파일
        </p>
      </div>
      {error && (
        <p className="typography-body-small-m text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
