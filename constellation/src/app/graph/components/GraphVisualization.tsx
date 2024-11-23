"use client";
import { CosmographProvider, Cosmograph } from "@cosmograph/react";
import { Node, Link } from "@/app/types/graph";
import { useState } from "react";
import NodeSidePanel from "./NodeSidePanel";
import SearchBar from "./SearchBar";

const goldenRatioConjugate = 0.618033988749895;

const generateColor = (index: number) => {
  const hue = (index * goldenRatioConjugate) % 1;
  return `hsl(${hue * 360}, 50%, 30%)`;
};

const getNodeColor = (node: Node) => {
  const cluster = node.metadata?.cluster;
  return cluster !== undefined ? generateColor(cluster) : "gray";
};

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
      <SearchBar />
      <Cosmograph
        nodeSize={1}
        linkWidth={1}
        nodeColor={getNodeColor}
        hoveredNodeRingColor={"red"}
        style={{ width: "100%", height: "100vh" }}
        simulationFriction={0.03}
        simulationLinkSpring={0.5}
        simulationRepulsion={0.5}
        simulationLinkDistance={2.0}
        simulationGravity={0.5}
        showDynamicLabels={false}
        renderLinks={true}
        onClick={handleNodeClick}
        backgroundColor="#191919"
      />
      {selectedNode && (
        <NodeSidePanel
          isOpen={isNodeModalOpen}
          setIsOpen={setIsNodeModalOpen}
          node={selectedNode}
        />
      )}
    </CosmographProvider>
  );
}
