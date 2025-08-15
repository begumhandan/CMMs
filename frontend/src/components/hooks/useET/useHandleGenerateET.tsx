import { generatePrefixFromRole, generateRandomString } from "@/lib/utils";

export const useHandleGenerate = () => {
  // Elektriksel test için kod üret
  const handleGenerate = (currentUser: any, setCurrentCode: (code: string) => void) => {
    if (!currentUser) {
      alert("Lütfen giriş yapın!");
      return;
    }

    //Frontend'de rastgele kod üret
    const rolePrefix = generatePrefixFromRole(currentUser.role);
    const randomPart = generateRandomString(4);
    const newCode = `ET-${rolePrefix}${randomPart}`;

    setCurrentCode(newCode);
    console.log("Generated code (UI only):", newCode); //sadece frontendde
  };
  return { handleGenerate };
};
