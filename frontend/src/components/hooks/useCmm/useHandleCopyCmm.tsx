export const useHandleCopy = () => {
  // Kodu kopyala
  const handleCopy = (currentCode: string, setCopyMessage: (message: string) => void) => {
    if (!currentCode) {
      setCopyMessage("Kopyalanacak kod yok!");
      setTimeout(() => setCopyMessage(""), 2000);
      return;
    }
    try {
      navigator.clipboard.writeText(currentCode);
      setCopyMessage("Kopyalandı!");
    } catch (error) {
      console.error("Failed to copy:", error);
      setCopyMessage("Kopyalama başarısız!");
    } finally {
      alert("Kopyalandı!");
      setTimeout(() => setCopyMessage(""), 2000);
    }
  };

  return { handleCopy };
};
