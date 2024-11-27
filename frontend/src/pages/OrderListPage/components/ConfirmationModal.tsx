import { Modal, Button } from "react-bootstrap";

interface ConfirmationModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    actionType: "delete" | "deliver";
}

export function ConfirmationModal({ show, onHide, onConfirm, actionType }: ConfirmationModalProps) {
    const title = actionType === "delete" ? "Confirm Delete" : "Confirm Delivery";
    const body =
        actionType === "delete"
            ? "Are you sure you want to delete this order?"
            : "Are you sure you want to mark this order as delivered?";

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant={actionType === "delete" ? "danger" : "success"} onClick={onConfirm}>
                    {actionType === "delete" ? "Delete" : "Confirm Delivery"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
