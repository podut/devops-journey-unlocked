import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import matter from "gray-matter";

// Tipul pentru un articol de blog
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Folosim funcționalitatea Vite pentru a încărca fișierele Markdown
    const loadPosts = async () => {
      const postFiles = import.meta.glob("/src/content/blog/*.md", { as: "raw", eager: true });
      
      const loadedPosts = Object.entries(postFiles).map(([path, content]) => {
        const slug = path.split("/").pop()?.replace(".md", "") || "";
        const { data } = matter(content as string);
        
        return {
          slug,
          title: data.title || "Untitled",
          date: data.date || "",
          description: data.description || "",
          tags: data.tags || [],
        };
      });

      // Sortăm după dată (cele mai noi primele)
      setPosts(loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };

    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent inline-block">
            DevOps Insights
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Gânduri, tutoriale și experiențe despre infrastructură, automatizare și securitate cloud.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              to={`/blog/${post.slug}`}
              className="group block p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              
              <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              
              <p className="text-muted-foreground mb-6 line-clamp-3">
                {post.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground">Momentan nu există articole publicate.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
