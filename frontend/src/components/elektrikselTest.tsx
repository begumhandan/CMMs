import { useEffect, useId, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { deleteET, saveET } from "@/api/electrical_testing";
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

  // Elektriksel test için kod üret
  const handleGenerate = () => {
    if (!currentUser) {
      alert("Lütfen giriş yapın!");
      return;
    }

    //Frontend'de rastgele kod üret
    const rolePrefix = generatePrefixFromRole(currentUser.role);
    const randomPart = generateRandomString(4);
    const newCode = `ET-${rolePrefix}-${randomPart}`;

    setCurrentCode(newCode);
    console.log("Generated code (UI only):", newCode); //sadece frontendde
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
      await saveET(currentCode, currentUser.id);
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
    setCurrentCode("");
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
      await deleteET(currentCode, currentUser.id);
      setCurrentCode("");
      alert("Kod database'den silindi!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Bu kodu silme yetkiniz yok veya kod bulunamadı!");
    }
  };

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
export function ElektrikselTest() {
  return <InputIconButtonDemo />;
}
