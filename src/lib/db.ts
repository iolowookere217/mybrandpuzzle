import { User, Brand, Campaign, Participation } from "@/types";

// Demo data storage (in production, this would be a real database)
const demoUsers: User[] = [
  {
    id: "1",
    email: "john@example.com",
    name: "John Doe",
    role: "USER",
    solvedToday: 0,
    totalSolved: 0,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "tata@example.com",
    name: "Tata Africa",
    role: "BRAND",
    solvedToday: 0,
    totalSolved: 0,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    email: "admin@brandaware.com",
    name: "Admin User",
    role: "ADMIN",
    solvedToday: 0,
    totalSolved: 0,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

const demoBrands: Brand[] = [
  {
    id: "1",
    name: "Tata Africa",
    description:
      "Leading provider of tractors and agricultural machinery in Africa",
    logo: "/logos/tata.png",
    industry: "Agriculture",
    size: "LARGE",
    userId: "2",
    user: demoUsers[1],
    campaigns: [],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "TechCorp Nigeria",
    description: "Innovative technology solutions for modern businesses",
    logo: "/logos/techcorp.png",
    industry: "Technology",
    size: "MEDIUM",
    userId: "4",
    user: {
      id: "4",
      email: "techcorp@example.com",
      name: "TechCorp Nigeria",
      role: "BRAND",
      solvedToday: 0,
      totalSolved: 0,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    campaigns: [],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

const demoCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Tata Tractor Knowledge Challenge",
    description:
      "Test your knowledge about modern farming and Tata tractors. Win up to ₦300,000!",
    content: [
      {
        id: "1",
        type: "VIDEO",
        url: "https://example.com/tata-video.mp4",
        order: 1,
        campaignId: "1",
        campaign: {} as Campaign,
      },
      {
        id: "2",
        type: "TEXT",
        text: "Tata tractors have been revolutionizing agriculture in Africa for over two decades. Our advanced technology and reliable machinery help farmers increase productivity and efficiency.",
        order: 2,
        campaignId: "1",
        campaign: {} as Campaign,
      },
    ],
    questions: [
      {
        id: "1",
        question:
          "What is the primary benefit of using Tata tractors in agriculture?",
        options: [
          "Lower fuel consumption",
          "Increased productivity and efficiency",
          "Reduced maintenance costs",
          "Better resale value",
        ],
        correctAnswer: 1,
        explanation:
          "Tata tractors are designed to increase productivity and efficiency, helping farmers get more work done in less time.",
        order: 1,
        campaignId: "1",
        campaign: {} as Campaign,
        aiGenerated: true,
        approved: true,
      },
      {
        id: "2",
        question:
          "How long has Tata been serving the African agricultural market?",
        options: ["One decade", "Two decades", "Three decades", "Four decades"],
        correctAnswer: 1,
        explanation:
          "Tata has been revolutionizing agriculture in Africa for over two decades.",
        order: 2,
        campaignId: "1",
        campaign: {} as Campaign,
        aiGenerated: true,
        approved: true,
      },
    ],
    prizeAmount: 300000,
    prizeDescription:
      "Cash prizes for top 10 participants based on leaderboard ranking",
    status: "ACTIVE",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    brandId: "1",
    brand: demoBrands[0],
    participations: [],
    leaderboard: [],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    title: "TechCorp Innovation Quiz",
    description:
      "Discover the future of technology with TechCorp. Complete our quiz and win ₦150,000!",
    content: [
      {
        id: "3",
        type: "IMAGE",
        url: "/images/techcorp-innovation.jpg",
        order: 1,
        campaignId: "2",
        campaign: {} as Campaign,
      },
    ],
    questions: [
      {
        id: "3",
        question: "What is the main focus of TechCorp Nigeria?",
        options: [
          "Agricultural technology",
          "Innovative technology solutions for businesses",
          "Consumer electronics",
          "Software development",
        ],
        correctAnswer: 1,
        explanation:
          "TechCorp Nigeria specializes in innovative technology solutions for modern businesses.",
        order: 1,
        campaignId: "2",
        campaign: {} as Campaign,
        aiGenerated: true,
        approved: true,
      },
    ],
    prizeAmount: 150000,
    prizeDescription: "Cash prizes for top performers",
    status: "ACTIVE",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-11-30"),
    brandId: "2",
    brand: demoBrands[1],
    participations: [],
    leaderboard: [],
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
];

// Database operations
export const db = {
  users: {
    findMany: () => Promise.resolve(demoUsers),
    findById: (id: string) =>
      Promise.resolve(demoUsers.find((u) => u.id === id) || null),
    findByEmail: (email: string) =>
      Promise.resolve(demoUsers.find((u) => u.email === email) || null),
    create: (user: Omit<User, "id" | "createdAt" | "updatedAt">) => {
      const newUser: User = {
        ...user,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      demoUsers.push(newUser);
      return Promise.resolve(newUser);
    },
  },
  brands: {
    findMany: () => Promise.resolve(demoBrands),
    findById: (id: string) =>
      Promise.resolve(demoBrands.find((b) => b.id === id) || null),
    findByUserId: (userId: string) =>
      Promise.resolve(demoBrands.find((b) => b.userId === userId) || null),
    create: (
      brand: Omit<Brand, "id" | "createdAt" | "updatedAt" | "campaigns">
    ) => {
      const newBrand: Brand = {
        ...brand,
        id: Date.now().toString(),
        campaigns: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      demoBrands.push(newBrand);
      return Promise.resolve(newBrand);
    },
  },
  campaigns: {
    findMany: () => Promise.resolve(demoCampaigns),
    findById: (id: string) =>
      Promise.resolve(demoCampaigns.find((c) => c.id === id) || null),
    findByBrandId: (brandId: string) =>
      Promise.resolve(demoCampaigns.filter((c) => c.brandId === brandId)),
    create: (
      campaign: Omit<
        Campaign,
        "id" | "createdAt" | "updatedAt" | "participations" | "leaderboard"
      >
    ) => {
      const newCampaign: Campaign = {
        ...campaign,
        id: Date.now().toString(),
        participations: [],
        leaderboard: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      demoCampaigns.push(newCampaign);
      return Promise.resolve(newCampaign);
    },
  },
  participations: {
    findByUserAndCampaign: (_userId: string, _campaignId: string) => {
      // This would query participations in a real database
      void _userId;
      void _campaignId;
      return Promise.resolve(null);
    },
    create: (
      participation: Omit<Participation, "id" | "createdAt" | "updatedAt">
    ) => {
      const newParticipation: Participation = {
        ...participation,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return Promise.resolve(newParticipation);
    },
  },
  leaderboard: {
    findByCampaignId: (_campaignId: string) => {
      // This would query leaderboard entries in a real database
      void _campaignId;
      return Promise.resolve([]);
    },
  },
};

export function initializeDatabase() {
  // In a real application, this would initialize the database connection
  console.log("Demo database initialized with sample data");
}
