/* eslint-disable @next/next/no-img-element */
import { tw } from "@/utils/tw";
import { FC, HTMLProps, useState, DragEvent, ChangeEvent } from "react";
import { FiUploadCloud } from "react-icons/fi";

interface HaikuFileInputProps extends HTMLProps<HTMLInputElement> {}

export const HaikuFileInput: FC<HaikuFileInputProps> = (props) => {
  const { className, ...inputProps } = props;
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <label
      className={tw(
        "w-full border-b border-neutral-700 text-lg p-6 text-neutral-700 cursor-pointer hocus:border-green-200 hocus:text-neutral-500",
        className
      )}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={(event) => event.preventDefault()}
      onDragLeave={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      {imagePreviewUrl && (
        <div className="w-full h-48 bg-neutral-900 rounded-xl mb-4">
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <input
        type="file"
        name="photo"
        className="hidden"
        onChange={handleFileChange}
        {...inputProps}
      />
      <div
        className={tw("flex flex-col items-center", {
          "flex-row gap-2 items-center text-base": imagePreviewUrl,
        })}
      >
        <FiUploadCloud />
        Upload or Drop photo here
      </div>
    </label>
  );
};
