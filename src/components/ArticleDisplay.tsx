import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ArticleDisplayProps {
  title?: string;
  content?: string;
  author?: string;
  date?: string;
}

export const ArticleDisplay = ({ title, content, author, date }: ArticleDisplayProps) => {
  if (!content) return null;

  return (
    <Card className="w-full mt-8 bg-white/5 border-white/10">
      <ScrollArea className="h-[60vh] rounded-lg">
        <div className="p-6 space-y-4">
          {title && (
            <h1 className="text-2xl font-bold text-white/90">{title}</h1>
          )}
          {(author || date) && (
            <div className="flex items-center gap-2 text-sm text-white/60">
              {author && <span>{author}</span>}
              {author && date && <span>•</span>}
              {date && <span>{date}</span>}
            </div>
          )}
          <div className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};