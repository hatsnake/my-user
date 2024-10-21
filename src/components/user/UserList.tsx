import { User } from "../../types/types";
import { PencilIcon, TrashIcon, UserIcon } from "@heroicons/react/24/solid";

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  onEdit,
  onDelete,
  onAdd,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">사용자 목록</h2>
        <button
          onClick={onAdd}
          className="btn-primary flex item-center space-x-2"
        >
          <UserIcon className="h-5 w-5" />
          <span>사용자 추가</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.profileImage || "/api/placeholder/150/150"}
                alt={user.username}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.username}
                </h3>
                <p className="text-sm text-gray-500">나이: {user.age}세</p>
              </div>
            </div>

            <p className="mt-2 text-gray-600 text-sm line-clamp-2">
              {user.description}
            </p>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => onEdit(user)}
                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full"
                title="수정"
              >
                <PencilIcon className="h-5 w-5" />
              </button>

              <button
                onClick={() => onDelete(user.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                title="삭제"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
