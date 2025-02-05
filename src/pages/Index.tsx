import { useState } from "react";
import { UrlInput } from "@/components/UrlInput";
import { ArticleDisplay } from "@/components/ArticleDisplay";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState<{
    title?: string;
    content?: string;
    author?: string;
    date?: string;
  } | null>(null);
  const { toast } = useToast();

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    try {
      // For now, we'll use a mock API call
      // In the next iteration, we'll integrate with a real API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setArticle({
        title: "Sample Article",
        content: "<p>This is a sample article content. In the next iteration, we'll fetch real content from the provided URL.</p>",
        author: "John Doe",
        date: "March 14, 2024",
      });
      
      toast({
        title: "Success",
        description: "Article loaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load article",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4 text-center animate-fade-in">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Article Reader
          </h1>
          <p className="text-lg text-white/60">
            Paste any article URL to read it in a clean, distraction-free format
          </p>
        </div>
        
        <UrlInput onSubmit={handleUrlSubmit} isLoading={isLoading} />
        
        {article && (
          <ArticleDisplay
            title={article.title}
            content={article.content}
            author={article.author}
            date={article.date}
          />
        )}
      </div>
    </div>
  );
};

export default Index;