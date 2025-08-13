import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { loginUser } from "@/api/user";

export function Login({ className, ...props }: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const result = await loginUser({ email, password });

      // Başarılı giriş sonrası yönlendirme
      window.location.href = "/a";
    } catch (error) {
      console.error("Login error:", error);
      alert("Giriş başarısız! Email veya şifre hatalı.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("p-[10px] md:p-[2rem] max-w-sm flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Kullanıcı Giriş</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required disabled={isLoading} />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Şifre</Label>
                  <a href="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
                    Forget password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={isLoading}>
                {isLoading ? "Giriş yapılıyor..." : "Log In"}
              </Button>
            </div>
            <div className="text-center text-sm mt-4">
              Don't have an account?
              <br />
              <a href="/signup" className="underline underline-offset-4 hover:text-primary">
                Sign Up
              </a>
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
