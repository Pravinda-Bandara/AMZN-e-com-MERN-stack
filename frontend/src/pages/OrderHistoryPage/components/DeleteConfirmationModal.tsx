import { Modal, Button } from "react-bootstrap";

interface DeleteConfirmationModalProps {
    show: boolean;
    onHide: () => void;
    onDelete: () => void;
}

export function DeleteConfirmationModal({
    show,
    onHide,
    onDelete,
}: DeleteConfirmationModalProps) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this order?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
