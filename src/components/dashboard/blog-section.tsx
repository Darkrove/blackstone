import { BlogCard } from "@/components/dashboard/blog-card"

export function BlogSection() {
  const blogs = [
    {
      title: "Getting Started with Next.js 15",
      excerpt: "Learn about the new features in Next.js 15 and how to use them in your projects.",
      date: "May 15, 2024",
      category: "Web Development",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Building UIs with shadcn/ui",
      excerpt: "A comprehensive guide to using shadcn/ui components to build beautiful user interfaces.",
      date: "May 12, 2024",
      category: "UI Design",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "React Server Components Explained",
      excerpt: "Understanding the benefits and use cases of React Server Components in modern web apps.",
      date: "May 10, 2024",
      category: "React",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Mastering TypeScript for Frontend Developers",
      excerpt: "Essential TypeScript patterns and practices for building type-safe frontend applications.",
      date: "May 8, 2024",
      category: "TypeScript",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-foreground">Latest News & Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  )
}

