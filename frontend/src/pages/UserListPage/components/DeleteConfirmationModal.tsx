import React from "react";
import { Button, Modal } from "react-bootstrap";

interface DeleteConfirmationModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeleteConfirmationModal({
    show,
    onClose,
    onConfirm,
}: DeleteConfirmationModalProps) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
