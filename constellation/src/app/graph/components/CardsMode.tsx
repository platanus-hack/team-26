"use client";
import { Node } from "@/app/types/graph";
import { useState } from "react";

interface CardsModeProps {
  nodes: Node[];
}

const CardsMode = ({ nodes }: CardsModeProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6 mt-12">
      {nodes.map((node) => (
        <div
          key={node.id}
          className="flex flex-col shadow-md hover:shadow-lg transition-shadow p-6 rounded-lg bg-[#f9f9f9]"
          onClick={() => setSidebarOpen(true)}
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
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
      )}
    </div>
  );
};

export default CardsMode;
