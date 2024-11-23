import { useState, useEffect } from "react";
import { GraphVisualization } from "./GraphVisualization";
import { Node, Link } from "@/app/types/graph";
import ArticleModal from "./ArticleModal";
import ExperimentModal from "./ExperimentModal";
import Button from "@/app/components/ui/Button";
import Papa from "papaparse";
//import withAuth from "@/app/hocs/withAuth";

const GraphPage = () => {
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isExperimentModalOpen, setIsExperimentModalOpen] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

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
    <div className="flex flex-row h-screen">
      <div className="flex flex-col w-2/12 p-4 bg-gray-100 dark:bg-gray-800">
        <h1 className="text-xl font-bold mb-4">Global Graph</h1>
        <p className="mb-2">At the moment we have:</p>
        <p className="mb-2">Nodes: {nodes.length}</p>
        <p className="mb-4">Links: {links.length}</p>
        <div className="flex flex-col justify-center items-center">
          <p className="mb-1">
            Upload your article to add more nodes into the app
          </p>
          <Button
            onClick={() => setIsArticleModalOpen(!isArticleModalOpen)}
            label="Upload article"
            className="mb-8"
          />
          <p className="mb-1">Add an experiment to create a new node</p>
          <Button
            onClick={() => setIsExperimentModalOpen(!isExperimentModalOpen)}
            label="Add experiment"
          />
        </div>
      </div>
      {nodes.length === 0 ? (
        <div className="flex flex-col w-10/12 p-4 bg-gray-100 dark:bg-gray-800">
          <h1 className="text-xl font-bold mb-4">Loading...</h1>
        </div>
      ) : (
        <div className="flex flex-col w-10/12 p-0">
          <GraphVisualization nodes={nodes} links={links} />
        </div>
      )}

      {isArticleModalOpen ? (
        <ArticleModal
          isOpen={isArticleModalOpen}
          setIsOpen={setIsArticleModalOpen}
        />
      ) : null}
      {isExperimentModalOpen ? (
        <ExperimentModal
          isOpen={isExperimentModalOpen}
          setIsOpen={setIsExperimentModalOpen}
        />
      ) : null}
    </div>
  );
};

export default GraphPage;
