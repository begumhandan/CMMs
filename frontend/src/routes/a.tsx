import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/a")({
  component: () => {
    return (
      <div className="h-screen w-full flex items-center justify-center p-1 overflow-hidden">
        <div className="grid grid-cols-3 grid-rows-3 gap-36 w-full max-w-5xl">
          <div className="h-24 w-full bg-blue-500 rounded border flex items-center justify-center text-white font-bold hover:bg-blue-600 cursor-pointer transition-colors px-4">
            <a href="/Cmm" className="w-full h-full flex items-center justify-center text-white text-center">
              CMM
            </a>
          </div>

          <div className="h-24 w-full bg-blue-500 rounded border flex items-center justify-center text-white font-bold hover:bg-blue-600 cursor-pointer transition-colors px-4">
            <a
              href="/elektriksel_test"
              className="w-full h-full flex items-center justify-center text-white text-center"
            >
              Elektriksel Test
            </a>
          </div>

          <div className="h-24 w-full bg-blue-500 rounded border flex items-center justify-center text-white font-bold hover:bg-blue-600 cursor-pointer transition-colors px-4">
            <a href="/sayfa1" className="w-full h-full flex items-center justify-center text-white text-center">
              Test 3
            </a>
          </div>

          <div className="h-24 w-full bg-blue-500 rounded border flex items-center justify-center text-white font-bold hover:bg-blue-600 cursor-pointer transition-colors px-4">
            <a href="/sayfa1" className="w-full h-full flex items-center justify-center text-white text-center">
              Test 4
            </a>
          </div>

          <div className="h-24 w-full bg-blue-500 rounded border flex items-center justify-center text-white font-bold hover:bg-blue-600 cursor-pointer transition-colors px-4">
            <a href="/sayfa1" className="w-full h-full flex items-center justify-center text-white text-center">
              Test 5
            </a>
          </div>

          <div className="h-24 w-full bg-blue-500 rounded border flex items-center justify-center text-white font-bold hover:bg-blue-600 cursor-pointer transition-colors px-4">
            <a href="/sayfa1" className="w-full h-full flex items-center justify-center text-white text-center">
              Test 6
            </a>
          </div>

          <div className="h-24 w-full bg-blue-500 rounded border flex items-center justify-center text-white font-bold hover:bg-blue-600 cursor-pointer transition-colors px-4">
            <a href="/sayfa1" className="w-full h-full flex items-center justify-center text-white text-center">
              Test 7
            </a>
          </div>

          <div className="h-24 w-full bg-blue-500 rounded border flex items-center justify-center text-white font-bold hover:bg-blue-600 cursor-pointer transition-colors px-4">
            <a href="/sayfa1" className="w-full h-full flex items-center justify-center text-white text-center">
              Test 8
            </a>
          </div>

          <div className="h-24 w-full bg-blue-500 rounded border flex items-center justify-center text-white font-bold hover:bg-blue-600 cursor-pointer transition-colors px-4">
            <a href="/sayfa1" className="w-full h-full flex items-center justify-center text-white text-center">
              Test 9
            </a>
          </div>
        </div>
      </div>
    );
  },
});
