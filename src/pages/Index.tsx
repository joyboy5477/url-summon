import { useState } from "react";
import { UrlInput } from "@/components/UrlInput";
import { ArticleDisplay } from "@/components/ArticleDisplay";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState<{
    title?: string;
    content?: string;
    author?: string;
    date?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('YOUR_BACKEND_API_URL/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch article');
      }

      const data = await response.json();
      setArticle({
        title: data.title,
        content: data.content,
        author: data.author,
        date: data.date,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load article');
      console.error('Error fetching article:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Article Reader
          </h1>
          <p className="text-lg text-white/60">
            Paste any article URL to read it in a clean, distraction-free format
          </p>
        </div>
        
        <UrlInput onSubmit={handleUrlSubmit} isLoading={isLoading} />
        
        {error && (
          <div className="text-red-400 text-center p-4 bg-red-400/10 rounded-lg">
            {error}
          </div>
        )}
        
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