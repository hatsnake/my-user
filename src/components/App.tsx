import { useEffect, useState } from "react";
import { UserForm } from "./user/UserForm";
import { UserList } from "./user/UserList";
import { User } from "../types/types";
import { userApi } from "./api";
import { Modal } from "./Modal";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userApi.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error(`Failed to load users : ${error}`);
    }
  };

  const handleSubmit = async (userData: Omit<User, "id">) => {
    try {
      if (selectedUser) {
        await userApi.updateUser(selectedUser.id, userData);
      } else {
        await userApi.createUser(userData);
      }
      setSelectedUser(null);
      loadUsers();
    } catch (error) {
      console.error(`Failed to save user : ${error}`);
    }
    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    try {
      if (window.confirm("삭제하시겠습니까?")) {
        await userApi.deleteUser(id);
        loadUsers();
      }
    } catch (error) {
      console.log(`Failed to delete user : ${error}`);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <UserList
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedUser ? "사용자 수정" : "새 사용자 추가"}
        >
          <UserForm
            onSubmit={handleSubmit}
            initialData={selectedUser || undefined}
          />
        </Modal>
      </div>
    </div>
  );
};

export default App;
