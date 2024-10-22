import { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../../types/types";

interface UserFormProps {
  onSubmit: (formData: FormData) => void;
  initialData?: User;
  onLoadImageUrl: (imageUrl: string) => string;
}

export const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialData,
  onLoadImageUrl,
}) => {
  const [formData, setFormData] = useState({
    username: initialData?.username || "",
    age: initialData?.age || "",
    description: initialData?.description || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    onLoadImageUrl(initialData?.profileImageName || "default.jpeg")
  );

  const handleInput = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    if (name === "age") {
      const numberOnly = value.replace(/\D/g, "");

      setFormData((prev) => ({
        ...prev,
        [name]: numberOnly,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();
    const userData = {
      username: formData.username,
      age: formData.age,
      description: formData.description,
    };

    submitData.append(
      "user",
      new Blob([JSON.stringify(userData)], {
        type: "application/json",
      })
    );

    if (imageFile) {
      submitData.append("image", imageFile);
    }

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          사용자 이름
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onInput={handleInput}
          className="block w-full border-0 rounded-md pl-2 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          required
        />
      </div>

      <div className="mt-3">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          나이
        </label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onInput={handleInput}
          className="block w-full border-0 rounded-md pl-2 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          maxLength={3}
          required
        />
      </div>

      <div className="mt-3">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          설명
        </label>
        <textarea
          name="description"
          value={formData.description}
          onInput={handleInput}
          className="block w-full border-0 rounded-md pl-2 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 form-input min-h-[100px]"
          rows={4}
        />
      </div>

      <div className="mt-3">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          프로필 이미지
        </label>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="form-input"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="object-cover w-32 h-32 mt-2 rounded-full"
          />
        )}
      </div>

      <div className="flex justify-end pt-4 space-x-2">
        <button type="submit" className="bnt-primary">
          {initialData ? "수정하기" : "추가하기"}
        </button>
      </div>
    </form>
  );
};
