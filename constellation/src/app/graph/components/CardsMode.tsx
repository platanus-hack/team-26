"use client";
import { Node } from "@/app/types/graph";
import { useState } from "react";
import NodeSidePanel from "./NodeSidePanel";

interface CardsModeProps {
  nodes: Node[];
}

const CardsMode = ({ nodes }: CardsModeProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
    setSidebarOpen(true);
  };

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 p-4 mt-12">
      {nodes.map((node) => (
        <div
          key={node.id}
          className="mb-4 break-inside-avoid shadow-md hover:shadow-lg transition-shadow p-6 rounded-lg bg-[#f9f9f9]"
          onClick={() => handleNodeClick(node)}
        >
          <h2 className="text-lg font-bold text-gray-800 truncate">
            {node.metadata?.title}
          </h2>
          <p className="text-gray-600 mt-2">{node.metadata?.description}</p>
          <div className="mt-4">
            <span className="block text-sm font-semibold text-gray-700">
              Results:
            </span>
            <span className="text-sm text-gray-500">
              {node.metadata?.results}
            </span>
          </div>
          <div className="mt-2 flex items-center">
            <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
              Cluster {node.metadata?.cluster}
            </span>
          </div>
        </div>
      ))}
      {sidebarOpen && selectedNode && (
        <NodeSidePanel
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          node={selectedNode}
        />
      )}
    </div>
  );
};

export default CardsMode;
