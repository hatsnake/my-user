import { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../../types/types";

interface UserFormProps {
  onSubmit: (user: Omit<User, "id">) => void;
  initialData?: User;
}

export const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    username: initialData?.username || "",
    age: initialData?.age || "",
    description: initialData?.description || "",
    profileImage: initialData?.profileImage || "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.profileImage || null
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          사용자 이름
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="block w-full border-0 rounded-md pl-2 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          required
        />
      </div>

      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          나이
        </label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          className="block w-full border-0 rounded-md pl-2 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          required
        />
      </div>

      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          설명
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="block w-full border-0 rounded-md pl-2 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 form-input min-h-[100px]"
          rows={4}
        />
      </div>

      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
            className="mt-2 w-32 h-32 object-cover rounded-full"
          />
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button type="submit" className="bnt-primary">
          {initialData ? "수정하기" : "추가하기"}
        </button>
      </div>
    </form>
  );
};
