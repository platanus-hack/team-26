import Button from "@/app/components/ui/Button";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const SearchBar = ({
  search,
  setSearch,
  handleSendSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
  handleSendSearch: () => void;
}) => {
  return (
    <div className="flex items-center w-[40vw]">
      <input
        className="w-full p-2 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search an specific experiment..."
      />
      <Button
        onClick={handleSendSearch}
        className="flex justify-center items-center ml-2 text-sm h-12 w-12"
        icon={<SendRoundedIcon />}
      />
    </div>
  );
};

export default SearchBar;
