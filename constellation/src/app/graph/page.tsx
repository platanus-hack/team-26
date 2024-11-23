"use client";
import { useState, useEffect } from "react";
import { GraphVisualization } from "./components/GraphVisualization";
import { Node, Link } from "@/app/types/graph";
import ArticleModal from "./components/ArticleModal";
import ExperimentModal from "./components/ExperimentModal";
import Button from "../components/ui/Button";
import Papa from "papaparse";

const GraphPage = () => {
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isExperimentModalOpen, setIsExperimentModalOpen] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/cosmograph_data_v2.csv");
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

            // Ensure source and target are added to the node set if not already present
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
      console.log(parsedNodes);
      console.log(parsedLinks);
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
            Upload your article to add more nodes in to the app
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
