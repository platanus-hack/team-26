import Modal from "@/app/components/ui/Modal";

interface ExperimentModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ExperimentModal = ({ isOpen, setIsOpen }: ExperimentModalProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1 className="text-xl font-bold mb-4">Add an experiment</h1>
      <input
        type="text"
        placeholder="Experiment Name"
        className="mb-4 p-2 w-full"
      />
      <button className="text-white font-thin py-2 px-2 rounded-xl w-40 bg-blue-500 dark:bg-white dark:text-black transition duration-200 ease-in-out active:scale-95 hover:opacity-80">
        Add
      </button>
    </Modal>
  );
};

export default ExperimentModal;
