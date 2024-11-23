"use client";
import { useState } from "react";
import { GraphVisualization } from "./components/GraphVisualization";
import { Node, Link } from "@/app/types/graph";
import ArticleModal from "./components/ArticleModal";
import ExperimentModal from "./components/ExperimentModal";
import Button from "../components/ui/Button";

const GraphPage = () => {
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isExperimentModalOpen, setIsExperimentModalOpen] = useState(false);

  const nodes: Node[] = [{ id: "1" }, { id: "2" }, { id: "3" }];
  const links: Link[] = [
    { source: "1", target: "2" },
    { source: "2", target: "3" },
  ];

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
      <div className="flex flex-col w-10/12 p-0">
        <GraphVisualization nodes={nodes} links={links} />
      </div>
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
