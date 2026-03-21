import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import matter from "gray-matter";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postFiles = import.meta.glob("/src/content/blog/*.md", { as: "raw" });
        const filePath = `/src/content/blog/${slug}.md`;
        
        if (postFiles[filePath]) {
          const rawContent = await postFiles[filePath]();
          const { data: frontmatter, content: markdownBody } = matter(rawContent as string);
          
          setData(frontmatter);
          setContent(markdownBody);
        }
      } catch (error) {
        console.error("Error loading blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Articol negăsit</h1>
        <p className="text-muted-foreground mb-8">Articolul pe care îl cauți nu există sau a fost mutat.</p>
        <Link to="/blog" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Înapoi la blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <article className="max-w-3xl mx-auto">
          <Link to="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Înapoi la blog
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {data.date}
              </span>
              <div className="flex gap-2">
                {data.tags?.map((tag: string) => (
                  <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {data.title}
            </h1>
            
            {data.description && (
              <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6 py-2">
                {data.description}
              </p>
            )}
          </header>

          <div className="prose prose-invert prose-slate max-w-none 
            prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed 
            prose-li:text-muted-foreground prose-strong:text-foreground prose-code:text-primary 
            prose-code:bg-primary/5 prose-code:px-1 prose-code:rounded prose-pre:bg-slate-900 
            prose-pre:border prose-pre:border-border">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
