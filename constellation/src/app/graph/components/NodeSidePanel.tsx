import SidePanel from "@/app/components/ui/SidePanel";
import { Node } from "@/app/types/graph";

interface NodeModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  node: Node;
}

const NodeModal = ({ isOpen, setIsOpen, node }: NodeModalProps) => {
  return (
    <SidePanel isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="text-black">
        <h1 className="text-2xl font-bold mb-4">Experiment Details</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Title</h2>
          <p className="text-gray-700">{node.metadata?.title}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="text-gray-700">{node.metadata?.description}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Results</h2>
          <p className="text-gray-700">{node.metadata?.results}</p>
        </div>
      </div>
    </SidePanel>
  );
};

export default NodeModal;
