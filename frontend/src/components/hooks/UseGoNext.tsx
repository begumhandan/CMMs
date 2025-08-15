import { useNavigate } from "@tanstack/react-router";
import { useNavigatePages } from "./UseNavigatePages";

export const useGoNext = () => {
  const navigate = useNavigate();
  const { pages, currentIndex } = useNavigatePages();

  const goNext = () => {
    if (currentIndex == 0) return; //kullanıcı giriş yapmadan başka sayafaya ilerleyemez
    if (currentIndex < pages.length - 1) {
      navigate({ to: pages[currentIndex + 1] });
    }
  };

  return goNext;
};
