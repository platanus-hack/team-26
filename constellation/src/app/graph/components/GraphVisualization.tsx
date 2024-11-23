"use client";
import {
  CosmographProvider,
  Cosmograph,
  CosmographSearch,
} from "@cosmograph/react";
import { Node, Link } from "@/app/types/graph";
import { useState } from "react";
import NodeModal from "./NodeModal";

export function GraphVisualization({
  nodes,
  links,
}: {
  nodes: Node[];
  links: Link[];
}) {
  const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleNodeClick = (clickedNode: Node | undefined) => {
    if (clickedNode) {
      setIsNodeModalOpen(true);
      setSelectedNode(clickedNode);
    }
  };

  return (
    <CosmographProvider nodes={nodes} links={links}>
      <CosmographSearch className="" />
      <Cosmograph
        nodeSize={0.8}
        linkWidth={1}
        hoveredNodeRingColor={"red"}
        focusedNodeRingColor={"yellow"}
        style={{ width: "100%", height: "100vh" }}
        simulationFriction={0.1}
        simulationLinkSpring={0.2}
        simulationRepulsion={1.0}
        simulationLinkDistance={5.0}
        renderLinks={false}
        onClick={handleNodeClick}
      />
      {selectedNode && (
        <NodeModal
          isOpen={isNodeModalOpen}
          setIsOpen={setIsNodeModalOpen}
          node={selectedNode}
        />
      )}
    </CosmographProvider>
  );
}
