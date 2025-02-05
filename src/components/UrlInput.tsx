import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link2 } from "lucide-react";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export const UrlInput = ({ onSubmit, isLoading }: UrlInputProps) => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(url);
      onSubmit(url);
    } catch {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative">
        <Input
          type="url"
          placeholder="Paste your article URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-14 pl-12 pr-4 bg-white/5 border-white/10 text-white placeholder:text-white/50"
        />
        <Link2 className="absolute left-4 top-4 text-white/50" size={24} />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium"
      >
        {isLoading ? "Loading..." : "Read Article"}
      </Button>
    </form>
  );
};