import { Cmm } from "../components/Cmm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cmm")({
  component: () => {
    return (
      <div className="w-full p-6">
        <Cmm />
      </div>
    );
  },
});
