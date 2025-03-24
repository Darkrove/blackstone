import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BlogProps {
  blog: {
    title: string
    excerpt: string
    date: string
    category: string
    imageUrl: string
  }
}

export function BlogCard({ blog }: BlogProps) {
  return (
    <Card className="overflow-hidden h-full p-0">
      <div className="relative h-48 w-full">
        <Image src={blog.imageUrl || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" size="sm">
            {blog.category}
          </Badge>
          <span className="text-xs text-muted-foreground">{blog.date}</span>
        </div>
        <h3 className="font-medium mb-2 line-clamp-2 text-foreground">{blog.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{blog.excerpt}</p>
      </CardContent>
    </Card>
  )
}

