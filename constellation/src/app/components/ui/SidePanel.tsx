"use client";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

type SidePanelProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: ReactNode;
};

const SidePanel = ({ isOpen, setIsOpen, children }: SidePanelProps) => {
  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-0 top-0 bottom-0 bg-white shadow-lg z-40 w-[300px] max-w-full flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="relative p-6 h-full overflow-y-auto">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-black"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <CancelRoundedIcon />
              </button>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidePanel;
