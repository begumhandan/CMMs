import { useNavigate } from "@tanstack/react-router";
import { useNavigatePages } from "./UseNavigatePages";
import { useLogOut } from "./useLogOut/UseLogOut";

export const useGoPrev = () => {
  const navigate = useNavigate();
  const { pages, currentIndex } = useNavigatePages();
  const logout = useLogOut();
  const goPrev = () => {
    switch (currentIndex) {
      case 3:
        navigate({ to: "/a" });
        break;
      case 2:
        navigate({ to: "/a" });
        break;
      case 1:
        //Eğer /a sayfasındaysam ve geri gidiceksem kullanıcı giriş sayfasına çıkış yapmak isteyip istemeyeceğinin mesajını göderiyorum okeylerse çıkış  yapıyor.
        if (currentIndex == 1) {
          const isConfirmed = confirm("çıkış mı yapmak istiyorsunuz?");
          //çıkış işlemi
          if (isConfirmed) {
            const success = logout();
            alert(success ? "çıkış başarılı" : "çıkış başarısız");
          }
          // eğer hayır ise hiçbir şey yapma

          break;
        }
    }

    if (currentIndex > 0) {
      navigate({ to: pages[currentIndex - 1] });
    }
  };

  return goPrev;
};
