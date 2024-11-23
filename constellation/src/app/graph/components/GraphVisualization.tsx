import { Cosmograph, CosmographProvider } from "@cosmograph/react";
import { Node, Link } from "@/app/types/graph";

export function GraphVisualization({
  nodes,
  links,
}: {
  nodes: Node[];
  links: Link[];
}) {
  return (
    <CosmographProvider nodes={nodes} links={links}>
      <Cosmograph
        nodeSize={10}
        linkWidth={2}
        style={{ width: "100%", height: "100vh" }}
      />
    </CosmographProvider>
  );
}
