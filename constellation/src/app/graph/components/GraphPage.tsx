import { useState, useEffect } from "react";
import { GraphVisualization } from "./GraphVisualization";
import { Node, Link } from "@/app/types/graph";
import Papa from "papaparse";
import withAuth from "@/app/hocs/withAuth";
import useAuth from "@/app/hooks/useAuth";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const GraphPage = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchCSVData = async () => {
      const response = await fetch("/data/cosmograph_data.csv");
      const csvText = await response.text();
      const parsedData = Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
      });

      const parsedNodes: Node[] = [];
      const parsedLinks: Link[] = [];
      const uniqueIds = new Set<string>();

      (parsedData.data as { source: string; target: string }[]).forEach(
        (row) => {
          if (row.source && row.target) {
            parsedLinks.push({ source: row.source, target: row.target });

            if (!uniqueIds.has(row.source)) {
              parsedNodes.push({ id: row.source });
              uniqueIds.add(row.source);
            }
            if (!uniqueIds.has(row.target)) {
              parsedNodes.push({ id: row.target });
              uniqueIds.add(row.target);
            }
          }
        }
      );

      setNodes(parsedNodes);
      setLinks(parsedLinks);
    };

    const fetchJSONData = async () => {
      const response = await fetch("/data/metadata.json");
      const jsonData: Node[] = await response.json();

      setNodes((prevNodes) => {
        const updatedNodes = [...prevNodes];

        jsonData.forEach((newNode) => {
          const existingNode = updatedNodes.find(
            (node) => node.id === newNode.id
          );
          if (existingNode) {
            existingNode.metadata = newNode.metadata; // Merge metadata
          } else {
            updatedNodes.push(newNode); // Add new node if it doesn't exist
          }
        });

        return updatedNodes;
      });
    };

    const fetchData = async () => {
      await fetchCSVData();
      await fetchJSONData();
    };

    fetchData();
  }, []);

  return (
    <div>
      {nodes.length === 0 ? (
        <div className="flex flex-col w-full p-4 bg-gray-100 dark:bg-[#191919]">
          <div className="flex flex-grow items-center justify-center">
            <h1 className="text-xl font-bold mb-4">Loading...</h1>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full p-0">
          <GraphVisualization nodes={nodes} links={links} />
        </div>
      )}
      <button
        onClick={logout}
        className="fixed top-4 right-4 p-2 bg-red-500 text-white rounded-md z-40 hover:bg-red-600"
      >
        <LogoutRoundedIcon />
      </button>
    </div>
  );
};

export default withAuth(GraphPage);
