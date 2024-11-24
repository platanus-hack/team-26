"use client";
import Button from "@/app/components/ui/Button";
import { useEffect, useRef } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

interface InputBarProps {
  search: string;
  setSearch: (search: string) => void;
  handleSendInput: () => void;
}

const InputBar = ({ search, setSearch, handleSendInput }: InputBarProps) => {
  const maxChars = 1000;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [search]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center">
        <div className="flex flex-row w-[40vw]">
          <textarea
            ref={textareaRef}
            placeholder="Describe your experiment here..."
            value={search}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) {
                setSearch(e.target.value);
              }
            }}
            className="w-full p-2 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
            rows={1}
            maxLength={maxChars}
            style={{ resize: "none", overflow: "hidden" }}
          />
          <Button
            onClick={handleSendInput}
            className="flex justify-center items-center ml-2 text-sm h-12 w-12"
            icon={<SendRoundedIcon />}
          />
        </div>
        <small className="text-white dark:text-gray-400 mt-1">
          {search.length}/{maxChars} characters
        </small>
      </div>
    </div>
  );
};

export default InputBar;
