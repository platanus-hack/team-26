import Modal from "@/app/components/ui/Modal";
import { Node } from "@/app/types/graph";

interface ExperimentModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  node: Node;
}

const NodeModal = ({ isOpen, setIsOpen, node }: ExperimentModalProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1 className="text-xl font-bold mb-4">Node</h1>
      <p>Node ID: {node.id}</p>
    </Modal>
  );
};

export default NodeModal;
