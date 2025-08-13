import { useNavigate, useRouterState } from "@tanstack/react-router";
import type { FC, PropsWithChildren } from "react";

export const Header: FC<PropsWithChildren> = () => {
  const navigate = useNavigate();
  const { location } = useRouterState();

  const pages = ["/", "/a", "/Cmm", "/elektriksel_test"];

  const currentPath = location.pathname;
  const currentIndex = pages.indexOf(currentPath);

  const goPrev = () => {
    if (currentIndex > 0) {
      navigate({ to: pages[currentIndex - 1] });
    }
  };
  const goNext = () => {
    if (currentPath == "/") return;
    if (currentIndex < pages.length - 1) {
      navigate({ to: pages[currentIndex + 1] });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2   min-h-11 ">
      {/* Left Arrow */}
      <button
        onClick={goPrev}
        disabled={currentIndex <= 0}
        className="bg-gray-200 transform-translate z-10 bg-white hover:shadow-lg transition-shadow border border-gray-200 flex items-center justify-center"
      >
        &lt;
      </button>
      {/* Right Arrow */}
      <button
        onClick={goNext}
        disabled={currentIndex >= pages.length - 1}
        className="bg-gray-200 transform-translate z-10 bg-white hover:shadow-lg transition-shadow border border-gray-200"
      >
        &gt;
      </button>
    </div>
  );
};
