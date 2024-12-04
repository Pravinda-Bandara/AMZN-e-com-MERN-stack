import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation, useGetUsersQuery } from "../../../hooks/userHooks.ts";
import { toast } from "react-toastify";
import { getError } from "../../../util.ts";
import { ApiError } from "../../../types/ApiError.ts";
import LoadingBox from "../../../components/LoadingBox.tsx";
import MessageBox from "../../../components/MessageBox.tsx";
import { Helmet } from "react-helmet-async";
import { UserTable } from "./components/UserTable";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";

export default function UserListPage() {
    const navigate = useNavigate();
    const { data: users, isLoading, error, refetch } = useGetUsersQuery();
    const { mutateAsync: deleteUser, isPending: loadingDelete } = useDeleteUserMutation();

    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const [userIdToDelete, setUserIdToDelete] = React.useState<string | null>(null);

    const handleEdit = (id: string) => {
        navigate(`/admin/user/${id}`);
    };

    const handleDelete = (id: string) => {
        setUserIdToDelete(id);
        setShowConfirmation(true);
    };

    const handleDeleteConfirm = async () => {
        if (!userIdToDelete) return;
        try {
            await deleteUser(userIdToDelete);
            refetch();
            toast.success("User deleted successfully");
        } catch (err) {
            toast.error(getError(err as ApiError));
        } finally {
            setShowConfirmation(false);
            setUserIdToDelete(null);
        }
    };

    return (
        <div>
            <Helmet>
                <title>Users</title>
            </Helmet>
            <h1 className="h3">Users</h1>
            {loadingDelete && <LoadingBox />}
            {isLoading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
            ) : (
                <>
                    <UserTable
                        users={users!}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    <DeleteConfirmationModal
                        show={showConfirmation}
                        onClose={() => setShowConfirmation(false)}
                        onConfirm={handleDeleteConfirm}
                    />
                </>
            )}
        </div>
    );
}
