import { useEffect, useId, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { useHandleGenerate } from "./hooks/useET/useHandleGenerateET";
import { useHandleSave } from "./hooks/useET/useHandleSaveET";
import { useHandleCopy } from "./hooks/useET/useHandleCopyET";
import { useHandleClear } from "./hooks/useET/useHandleClearET";
import { useHandleDeleteFromDB } from "./hooks/useET/useHandleDeleteET";

const InputIconButtonDemo = () => {
  const id = useId();
  const [currentCode, setCurrentCode] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [partCode, setPartCode] = useState("");
  const [isLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [copyMessage, setCopyMessage] = useState("");

  const { handleGenerate } = useHandleGenerate();
  const { handleSave } = useHandleSave();
  const { handleCopy } = useHandleCopy();
  const { handleClear } = useHandleClear();
  const { handleDeleteFromDB } = useHandleDeleteFromDB();

  const getFullCode = () => {
    if (!currentCode || currentCode.trim() === "") {
      return "";
    }
    return `ET-${currentCode}`;
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
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCurrentUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <Label className="text-left mb-2">Elektriksel Test / {currentUser && `(${currentUser.role})`}</Label>
      <div className="justify-center flex flex-col items-center w-full">
        <div className="flex rounded-md shadow-xs">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            ET-
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
            onClick={() => handleCopy(currentCode, setCopyMessage)}
            variant="outline"
            size="icon"
            className="rounded-s-none"
            disabled={!currentCode}
          >
            <CopyIcon />
            <div className="sr-only">Copy</div>
          </Button>
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
          disabled={isLoading || !currentUser}
        >
          {isSaving ? "Kaydediliyor" : "Kaydet"}
        </Button>

        <Button
          variant="outline"
          className="justify-center flex flex-col items-center w-100 mt-10"
          onClick={() => handleClear(setCurrentCode)}
        >
          Kodu Temizle
        </Button>

        <Button
          variant="outline"
          className="bg-red-500 text-white justify-center flex flex-col items-center w-100 mt-10"
          onClick={() => handleDeleteFromDB(currentCode, currentUser, setCurrentCode)}
          disabled={!currentCode}
        >
          Database'den Sil
        </Button>
      </div>
    </>
  );
};
export function ElektrikselTest() {
  return <InputIconButtonDemo />;
}
