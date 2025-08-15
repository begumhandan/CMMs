import { generatePrefixFromRole, generateRandomString } from "@/lib/utils";

export const useHandleGenerate = () => {
  // CMM kod üret
  const handleGenerate = (currentUser: any, setCurrentCode: (code: string) => void) => {
    if (!currentUser) {
      alert("Lütfen giriş yapın!");
      return;
    }

    // Frontend'de rastgele kod üret
    const rolePrefix = generatePrefixFromRole(currentUser.role);
    const randomPart = generateRandomString(4);
    const newCode = `CMM-${rolePrefix}${randomPart}`;

    setCurrentCode(newCode);
    console.log("Generated code (UI only):", newCode);
  };

  return { handleGenerate };
};
