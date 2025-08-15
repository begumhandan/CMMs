import { useRouterState } from "@tanstack/react-router";

export const useNavigatePages = () => {
  const { location } = useRouterState();

  const pages = ["/", "/a", "/Cmm", "/elektriksel_test"];
  const currentPath = location.pathname;
  const currentIndex = pages.indexOf(currentPath);

  return {
    pages,
    currentPath,
    currentIndex,
  };
};
