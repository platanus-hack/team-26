"use client";
import {
  CosmographProvider,
  Cosmograph,
  CosmographSearch,
} from "@cosmograph/react";
import { Node, Link } from "@/app/types/graph";
import { useState } from "react";
import NodeSidePanel from "./NodeSidePanel";

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
      <CosmographSearch
        accessors={[
          {
            label: "title",
            accessor: (node: Node) => node.metadata?.title || "",
          },
          {
            label: "description",
            accessor: (node: Node) => node.metadata?.description || "",
          },
        ]}
        maxVisibleItems={5}
      />
      <Cosmograph
        nodeSize={1}
        linkWidth={1}
        hoveredNodeRingColor={"red"}
        focusedNodeRingColor={"yellow"}
        style={{ width: "100%", height: "100vh" }}
        simulationFriction={0.05}
        simulationLinkSpring={0.5}
        simulationRepulsion={0.5}
        simulationLinkDistance={2.0}
        showDynamicLabels={false}
        renderLinks={true}
        onClick={handleNodeClick}
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
