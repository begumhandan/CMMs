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
  const [isLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [copyMessage, setCopyMessage] = useState("");

  const { handleGenerate } = useHandleGenerate();
  const { handleSave } = useHandleSave();
  const { handleCopy } = useHandleCopy();
  const { handleClear } = useHandleClear();
  const { handleDeleteFromDB } = useHandleDeleteFromDB();

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
      <Label className="text-left mb-2">Elektriksel Test {currentUser && `(${currentUser.role})`}</Label>
      <div className="justify-center flex flex-col items-center w-full">
        <div className="flex rounded-md shadow-xs">
          <Input
            id={id}
            type="text"
            value={currentCode}
            onChange={(e) => setCurrentCode(e.target.value)}
            placeholder="ET - _ _ _ _ _ _ _ _ _ _"
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
          onClick={() => handleGenerate(currentUser, setCurrentCode)}
          disabled={isLoading || !currentUser}
        >
          Üret
        </Button>

        <Button
          variant="outline"
          className="justify-center flex flex-col items-center w-100 mt-10"
          onClick={() => handleSave(currentCode, currentUser, setIsSaving)}
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
