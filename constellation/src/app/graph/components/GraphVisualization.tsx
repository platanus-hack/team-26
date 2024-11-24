"use client";
import {
  CosmographProvider,
  Cosmograph,
  CosmographRef,
} from "@cosmograph/react";
import { Node, Link } from "@/app/types/graph";
import { useRef, useState } from "react";
import NodeSidePanel from "./NodeSidePanel";
import InputBar from "./InputBar";
import SearchBar from "./SearchBar";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulleted";
import Switch from "@/app/components/ui/Switch";
import CardsMode from "./CardsMode";

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
  const [search, setSearch] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [InputSent, setInputSent] = useState<boolean>(false);
  const [graphMode, setGraphMode] = useState(true);

  const cosmographRef = useRef<CosmographRef<{ id: string }> | null>(null);

  const handleNodeClick = async (clickedNode: Node | undefined) => {
    if (clickedNode) {
      setIsNodeModalOpen(true);
      setSelectedNode(clickedNode);
    }
  };

  const handleSendInput = () => {
    console.log("Input:", search);
    setInputSent(true);
  };

  const handleSendSearch = () => {
    console.log("Search:", search);
  };

  return (
    <CosmographProvider nodes={nodes} links={links}>
      <div className="absolute top-4 left-4 p-2 rounded shadow z-20">
        <Switch
          className="text-black"
          offIcon={<AccountTreeRoundedIcon className="p-1" />}
          onIcon={<FormatListBulletedRoundedIcon className="p-1" />}
          onChange={() => setGraphMode(!graphMode)}
        />
      </div>
      {!InputSent && <div className="absolute h-full w-full z-10"></div>}
      <div
        className={`absolute transition-all duration-500 ease-in-out ${
          InputSent
            ? "top-2 left-1/2 transform -translate-x-1/2"
            : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
        } z-10`}
      >
        {!InputSent ? (
          <>
            <InputBar
              search={input}
              setSearch={setInput}
              handleSendInput={handleSendInput}
            />
          </>
        ) : (
          <SearchBar
            search={search}
            setSearch={setSearch}
            handleSendSearch={handleSendSearch}
          />
        )}
      </div>
      {graphMode ? (
        <Cosmograph
          ref={cosmographRef}
          nodeSize={1}
          linkWidth={1}
          linkArrows={false}
          nodeColor={getNodeColor}
          nodeLabelClassName="flex text-white rounded-xl p-1"
          nodeLabelAccessor={(node: Node) => node.metadata?.title || "No Title"}
          hoveredNodeRingColor={"red"}
          showLabelsFor={nodes.filter(
            (node) => node.metadata?.isRepresentative
          )}
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
          linkVisibilityDistanceRange={[0, 1]}
        />
      ) : (
        <CardsMode nodes={nodes} />
      )}

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
