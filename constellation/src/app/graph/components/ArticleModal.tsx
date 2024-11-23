import Button from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";

interface ArticleModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ArticleModal = ({ isOpen, setIsOpen }: ArticleModalProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold mb-4">Upload your article</h1>
        <input type="file" accept=".pdf" className="mb-4" />
        <Button label="Upload" />
      </div>
    </Modal>
  );
};

export default ArticleModal;
