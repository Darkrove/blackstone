import { BlogCard } from "@/components/dashboard/blog-card"

export function BlogSection() {
  const blogs = [
    {
      title: "What is the difference between intelligent speed assistance and adaptive cruise control?",
      excerpt: "The evolution of autonomous and connected driving is accelerating, making vehicles safer, more efficient and easier to use.",
      date: "May 15, 2024",
      category: "Connected Driving",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Location forecast 2025: our round-up of need-to-know asset tracking trends.",
      excerpt: "We sat down with Gino Ferru, HERE’s Senior Vice President and General Manager EMEA, to uncover the innovative advancements—from artificial intelligence to location tech—that are reshaping how we track, move and manage goods.",
      date: "May 12, 2024",
      category: "Supply Chain",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "How digital maps make fleet management smarter and easier.",
      excerpt: "Managing a fleet can be challenging, but digital maps are here to lighten the load. By helping teams plan faster routes, track vehicles in real time, and avoid delays, these tools make day-to-day logistics smoother and less stressful.",
      date: "May 10, 2024",
      category: "Fleet Managemen",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "MThe pros and cons of autonomous vehicles and how they will shape the future of transportation.",
      excerpt: "Autonomous vehicles are promising a world of safer roads, cleaner skies and faster commutes, but at what cost?",
      date: "May 8, 2024",
      category: "Automated Driving",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-foreground">HERE360 news</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  )
}

