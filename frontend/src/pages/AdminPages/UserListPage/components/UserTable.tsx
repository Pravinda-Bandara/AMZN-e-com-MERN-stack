import React from "react";
import { Button } from "react-bootstrap";
import { User } from "../../../../types/User.ts";

interface UserTableProps {
    users: User[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
    return (
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
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                        <td>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => onEdit(user._id)}
                            >
                                Edit
                            </Button>
                            &nbsp;
                            <Button
                                type="button"
                                variant="danger"
                                onClick={() => onDelete(user._id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
