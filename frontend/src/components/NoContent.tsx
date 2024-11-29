import { Alert } from "react-bootstrap";

interface NoContentProps {
    title: string;
    message: string;
    className?: string; 
}

export function NoContent({ title, message, className }: NoContentProps) {
    return (
        <div className={`text-center py-5 ${className}`}>
            <h5>{title}</h5>
            <p className="text-muted">{message}</p>
        </div>
    );
}
