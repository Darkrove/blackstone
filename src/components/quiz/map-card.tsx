"use client"

import Image from "next/image"
import Link from "next/link"

interface MapCreatorDriveProps {
    title: string
    imageUrl?: string
    linkUrl: string
}

export default function MapCard({ imageUrl, linkUrl, title }: MapCreatorDriveProps) {
    return (
        <div className="bg-primary rounded-lg overflow-hidden">
            <Link href={linkUrl} target="_blank" rel="noopener noreferrer">
               
            <div className="bg-primary px-3 py-1.5 flex items-center">
                <div className="w-4 h-4 mr-2 bg-primary-foreground rounded-sm"></div>
                <span className="text-sm text-primary-foreground">{title}</span>
            </div>
            <div className="relative h-40 w-full">
                <Image
                    src={imageUrl || "/placeholder.svg?height=160&width=320"}
                    alt={`${title} view`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            </Link>
        </div>
    )
}
