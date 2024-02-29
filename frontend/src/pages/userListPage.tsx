import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation, useGetUsersQuery } from "../hooks/userHooks.ts";
import { toast } from "react-toastify";
import { getError } from "../util.ts";
import { ApiError } from "../types/ApiError.ts";
import LoadingBox from "../components/LoadingBox.tsx";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox.tsx";
import { User } from "../types/User.ts";
import { Button, Modal } from "react-bootstrap"; // Include Button and Modal from react-bootstrap

export default function UserListPage() {
    const navigate = useNavigate();

    const { data: users, isLoading, error, refetch } = useGetUsersQuery();

    const { mutateAsync: deleteUser, isPending: loadingDelete } = useDeleteUserMutation();

    const deleteHandler = async (id: string) => {
        if (window.confirm("Are you sure to delete?")) {
            try {
                await deleteUser(id);
                refetch();
                toast.success("User deleted successfully");
            } catch (err) {
                toast.error(getError(err as ApiError));
            }
        }
    };

    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const [userIdToDelete, setUserIdToDelete] = React.useState(null);

    const handleDeleteConfirmation = async (userId: any) => {
        setUserIdToDelete(userId);
        setShowConfirmation(true);
    };

    const handleDeleteUser = async (userId: any) => {
        try {
            await deleteUser(userId);
            refetch();
            setShowConfirmation(false);
            toast.success("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error(getError(error as ApiError));
        }
    };

    return (
        <div>
            <Helmet>
                <title>Users</title>
            </Helmet>
            <h1>Users</h1>

            {loadingDelete && <LoadingBox></LoadingBox>}
            {isLoading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
            ) : (
                <>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>IS ADMIN</th>
                            <th>ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users!.map((user: User) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? "YES" : "NO"}</td>
                                <td>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => navigate(`/admin/user/${user._id}`)}
                                    >
                                        Edit
                                    </Button>
                                    &nbsp;
                                    <Button
                                        type="button"
                                        variant="danger"
                                        onClick={() => handleDeleteConfirmation(user._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    handleDeleteUser(userIdToDelete);
                                }}
                            >
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </div>
    );
}
