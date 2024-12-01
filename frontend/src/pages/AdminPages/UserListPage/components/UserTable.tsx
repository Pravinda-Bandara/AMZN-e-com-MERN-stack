import React from "react";
import { Button, Table } from "react-bootstrap";
import { User } from "../../../../types/User.ts";

interface UserTableProps {
    users: User[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
    return (
        <div className="d-flex flex-column justify-between min-vh-100 w-full">
            <div className="flex-grow-1">
                {users.length === 0 ? (
                    <p>No Users Found</p>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead className="text-center">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Is Admin</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => onEdit(user._id)}
                                        >
                                            Edit
                                        </Button>
                                        &nbsp;
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => onDelete(user._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>

            {/* Create New User Button (if needed) */}
            <Button variant="primary" className="mt-3">
                Create New User
            </Button>
        </div>
    );
}
