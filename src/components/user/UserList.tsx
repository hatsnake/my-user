import { User } from "../../types/types";
import { PencilIcon, TrashIcon, UserIcon } from "@heroicons/react/24/solid";

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
  onLoadImageUrl: (imageUrl: string) => string;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  onEdit,
  onDelete,
  onAdd,
  onLoadImageUrl,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">사용자 목록</h2>
        <button
          onClick={onAdd}
          className="flex space-x-2 btn-primary item-center"
        >
          <UserIcon className="w-5 h-5" />
          <span>사용자 추가</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 transition-shadow duration-200 bg-white rounded-lg shadow-sm hover:shadow-md"
          >
            <div className="flex items-center space-x-4">
              <img
                src={onLoadImageUrl(user.profileImageName || "default.jpeg")}
                alt={user.username}
                className="object-cover w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.username}
                </h3>
                <p className="text-sm text-gray-500">나이: {user.age}세</p>
              </div>
            </div>

            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {user.description}
            </p>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => onEdit(user)}
                className="p-2 text-yellow-600 rounded-full hover:bg-yellow-50"
                title="수정"
              >
                <PencilIcon className="w-5 h-5" />
              </button>

              <button
                onClick={() => onDelete(user.id)}
                className="p-2 text-red-600 rounded-full hover:bg-red-50"
                title="삭제"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
