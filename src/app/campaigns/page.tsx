"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const campaigns = [
  {
    id: "1",
    title: "Nike Swoosh Challenge",
    brand: "Nike",
    description:
      "Solve the iconic Nike swoosh puzzle and answer questions about the brand!",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Coca-Cola Classic",
    brand: "Coca-Cola",
    description:
      "Piece together the classic Coca-Cola bottle and test your knowledge!",
    imageUrl:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=400&fit=crop",
  },
  {
    id: "3",
    title: "MTN Network Challenge",
    brand: "MTN",
    description: "Connect the MTN logo and prove your telecom knowledge!",
    imageUrl:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
  },
];

export default function CampaignsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark-100 font-[family-name:var(--font-orbitron)] mb-4">
          Active Campaigns
        </h1>
        <p className="text-dark-400 max-w-2xl mx-auto">
          Solve puzzles and answer questions. Each solved campaign counts
          towards your daily ranking!
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="gaming-card overflow-hidden group">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={campaign.imageUrl}
                alt={campaign.title}
                className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                fill
              />
              <div className="absolute top-3 right-3 bg-dark-950/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-primary-500">
                3x3
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-950 to-transparent p-4">
                <p className="text-xs text-dark-400">{campaign.brand}</p>
                <h3 className="text-lg font-bold text-dark-100">
                  {campaign.title}
                </h3>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-dark-400 mb-4 line-clamp-2">
                {campaign.description}
              </p>
              <Link href={"/play/" + campaign.id}>
                <Button className="w-full">Solve Puzzle</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
