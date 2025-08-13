import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { registerUser } from "@/api/user";

export function Signup({ className, ...props }: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Form verilerini işle
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const role = formData.get("role") as string;

      console.log("Signup data:", { email, password, role });

      const result = await registerUser({ email, password, role });

      console.log("Signup success:", result);
      alert("Kayıt başarılı! Giriş yapabilirsiniz.");

      window.location.href = "/";
    } catch (error) {
      console.error("Signup error:", error);
      alert("Kayıt başarısız! Bu email zaten kullanılıyor olabilir.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("p-[10px] md:p-[2rem] max-w-sm flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="elizamccardlejohson@robust.com"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="role">Rol</Label>
                <Input id="role" name="role" type="text" placeholder="Rolünüzü girin" required disabled={isLoading} />
              </div>

              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={isLoading}>
                {isLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>.
      </div>
    </div>
  );
}
