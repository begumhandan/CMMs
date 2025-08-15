import { useEffect, useId, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { Label } from "../components/ui//label";
import { useHandleSave } from "@/components/hooks/useCmm/useHandleSaveCmm";
import { useHandleGenerate } from "@/components/hooks/useCmm/useHandleGenerateCmm";
import { useHandleDeleteFromDB } from "@/components/hooks/useCmm/useHandleDeleteCmm";
import { useHandleClear } from "@/components/hooks/useCmm/useHandleClearCmm";
import { useHandleCopy } from "@/components/hooks/useCmm/useHandleCopyCmm";

const InputIconButtonDemo = () => {
  const id = useId();
  const [currentCode, setCurrentCode] = useState("");
  const [partCode, setPartCode] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  // Hook'u kullan
  const { handleCopy } = useHandleCopy();
  const { handleClear } = useHandleClear();
  const { handleDeleteFromDB } = useHandleDeleteFromDB();
  const { handleSave } = useHandleSave();
  const { handleGenerate } = useHandleGenerate();

  const getFullCode = () => {
    if (!currentCode || currentCode.trim() === "") {
      return "";
    }
    return `CMM-${currentCode}`;
  };
  const handleSaveClick = () => {
    const fullCode = getFullCode();
    if (!fullCode) {
      alert("Kaydedilecek kod yok!");
      return;
    }
    handleSave(fullCode, currentUser, setIsSaving);
  };
  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("Raw localStorage data:", userData);
    if (userData) {
      const parsedUser = JSON.parse(userData);
      console.log("Parsed user:", parsedUser);
      console.log("User ID:", parsedUser.id);
      setCurrentUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <Label className="text-left mb-2">CMM / {currentUser && `(${currentUser.role})`}</Label>
      <div className="justify-center flex flex-col items-center w-full">
        <div className="flex rounded-md shadow-xs">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            CMM-
          </span>
          <Input
            id={id}
            type="text"
            value={currentCode}
            onChange={(e) => setCurrentCode(e.target.value)}
            placeholder="AX2508AD001"
            className="-me-px rounded-e-none shadow-none focus-visible:z-1"
          />

          <Button
            onClick={() => handleCopy(getFullCode(), setCopyMessage)}
            variant="outline"
            size="icon"
            className="rounded-s-none"
            disabled={!currentCode}
          >
            <CopyIcon />
            <div className="sr-only">Copy</div>
          </Button>
          {copyMessage && (
            <div className="absolute -top-8 right-0 bg-black text-white px-2 py-1 rounded text-sm z-10">
              {copyMessage}
            </div>
          )}
        </div>

        <Button
          variant="outline"
          className="justify-center flex flex-col items-center w-100 mt-10"
          onClick={() => handleGenerate(currentUser, setCurrentCode, partCode)}
          disabled={isLoading || !currentUser}
        >
          Üret
        </Button>

        <Button
          variant="outline"
          className="justify-center flex flex-col items-center w-100 mt-10"
          onClick={handleSaveClick}
          disabled={isLoading || !currentUser || !currentCode}
        >
          {isSaving ? "Kaydediliyor" : "Kaydet"}
        </Button>

        <Button
          variant="outline"
          className="justify-center flex flex-col items-center w-100 mt-10"
          onClick={() => handleClear(setCurrentCode)}
          disabled={!currentCode}
        >
          Kodu Temizle
        </Button>

        <Button
          variant="outline"
          className="bg-red-500 text-white justify-center flex flex-col items-center w-100 mt-10"
          onClick={() => handleDeleteFromDB(getFullCode(), currentUser, setCurrentCode)}
          disabled={!currentCode}
        >
          Database'den Sil
        </Button>
      </div>
    </>
  );
};

export function Cmm() {
  return <InputIconButtonDemo />;
}
