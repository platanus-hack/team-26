"use client";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: ReactNode;
};

const Modal = ({ isOpen, setIsOpen, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // onClick={() => {
            //   setIsOpen(false);
            // }}
          ></motion.div>

          {/* Modal Content */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 m-auto overflow-y-auto max-w-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div
              className="bg-white rounded-lg shadow-lg w-full p-6 relative"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                className="absolute top-1 right-1 text-black"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <CancelRoundedIcon />
              </button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
