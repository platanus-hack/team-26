import { useState, useEffect } from "react";
import { GraphVisualization } from "./GraphVisualization";
import { Node, Link, GraphData } from "@/app/types/graph";
import useAuth from "@/app/hooks/useAuth";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import axiosInstance from "@/app/lib/axios";

const GraphPage = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/knowledge/knowledge-graph");
        const { cosmograph_data, metadata } = response.data;

        // Parse links
        const parsedLinks: Link[] = cosmograph_data.map(
          (link: { source: string; target: string }) => ({
            source: link.source,
            target: link.target,
          })
        );

        // Parse nodes from metadata and enrich with metadata properties

        const parsedNodes: Node[] = metadata.map((meta: GraphData) => ({
          id: meta.id,
          metadata: {
            title: meta.title,
            description: meta.description,
            results: meta.results,
            cluster: meta.cluster,
            isRepresentative: meta.is_representative,
            category: meta.category,
          },
        }));

        setNodes(parsedNodes);
        setLinks(parsedLinks);
      } catch (error) {
        console.error("Error fetching knowledge graph data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {nodes.length === 0 ? (
        <div className="flex flex-col w-full p-4 bg-gray-100 dark:bg-[#191919]">
          <div className="flex flex-grow items-center justify-center">
            <h1 className="text-xl font-bold mb-4">Loading...</h1>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full p-0">
          <GraphVisualization nodes={nodes} links={links} />
        </div>
      )}
      <button
        onClick={logout}
        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-md z-30 hover:bg-red-600"
      >
        <LogoutRoundedIcon />
      </button>
    </div>
  );
};

export default GraphPage;
