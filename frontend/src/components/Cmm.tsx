import { useEffect, useId, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { Label } from "../components/ui//label";
import { deleteCMM, saveCMM } from "@/api/cmm";
import { generatePrefixFromRole, generateRandomString } from "@/lib/utils";

const InputIconButtonDemo = () => {
  const id = useId();
  const [currentCode, setCurrentCode] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

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

  // CMM kod üret
  const handleGenerate = () => {
    if (!currentUser) {
      alert("Lütfen giriş yapın!");
      return;
    }

    // Frontend'de rastgele kod üret
    const rolePrefix = generatePrefixFromRole(currentUser.role);
    const randomPart = generateRandomString(4);
    const newCode = `CMM-${rolePrefix}-${randomPart}`;

    setCurrentCode(newCode);
    console.log("Generated code (UI only):", newCode);
  };

  // Kodu database'e kaydet
  const handleSave = async () => {
    if (!currentCode) {
      alert("Kaydedilecek kod yok!");
      return;
    }

    if (!currentUser) {
      alert("Giriş yapmanız gerekiyor!");
      return;
    }

    setIsSaving(true);
    try {
      await saveCMM(currentCode, currentUser.id);
      alert("Kod database'e kaydedildi!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Kod kaydedilemedi!");
    } finally {
      setIsSaving(false);
    }
  };

  // Kodu kopyala
  const handleCopy = () => {
    if (!currentCode) {
      alert("Kopyalanacak kod yok!");
      return;
    }

    navigator.clipboard.writeText(currentCode);
    alert("Kod kopyalandı!");
  };

  //input temizle
  const handleClear = () => {
    setCurrentCode(""); // Input'u temizle
    alert("Input temizlendi!");
  };

  // Database'den kodu silme
  const handleDeleteFromDB = async () => {
    if (!currentCode) {
      alert("Silinecek kod yok!");
      return;
    }

    if (!currentUser) {
      alert("Giriş yapmanız gerekiyor!");
      return;
    }

    try {
      await deleteCMM(currentCode, currentUser.id);
      setCurrentCode("");
      alert("Kod database'den silindi!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Bu kodu silme yetkiniz yok veya kod bulunamadı!");
    }
  };

  return (
    <>
      <Label className="text-left mb-2">CMM {currentUser && `(${currentUser.role})`}</Label>
      <div className="justify-center flex flex-col items-center w-full">
        <div className="flex rounded-md shadow-xs">
          <Input
            id={id}
            type="text"
            value={currentCode}
            onChange={(e) => setCurrentCode(e.target.value)}
            placeholder="CMM - _ _ _ _ _ _ _ _ _ _"
            className="-me-px rounded-e-none shadow-none focus-visible:z-1"
          />

          <Button onClick={handleCopy} variant="outline" size="icon" className="rounded-s-none" disabled={!currentCode}>
            <CopyIcon />
            <div className="sr-only">Copy</div>
          </Button>
        </div>

        <Button
          variant="outline"
          className="justify-center flex flex-col items-center w-100 mt-10"
          onClick={handleGenerate}
          disabled={isLoading || !currentUser}
        >
          Üret
        </Button>

        <Button
          variant="outline"
          className="justify-center flex flex-col items-center w-100 mt-10"
          onClick={handleSave}
          disabled={isLoading || !currentUser}
        >
          {isSaving ? "Kaydediliyor" : "Kaydet"}
        </Button>

        <Button
          variant="outline"
          className="justify-center flex flex-col items-center w-100 mt-10"
          onClick={handleClear}
        >
          Kodu Temizle
        </Button>

        <Button
          variant="outline"
          className="bg-red-500 text-white justify-center flex flex-col items-center w-100 mt-10"
          onClick={handleDeleteFromDB}
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
