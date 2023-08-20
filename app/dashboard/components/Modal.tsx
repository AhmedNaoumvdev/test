import "./Modal.css";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
}

const ClassModal = ({ children, open }: ModalProps) => {
  if (!open) return;
  return (
    <div className="modalBack">
      <div className="modalBody">{children}</div>
    </div>
  );
};

export default ClassModal;
