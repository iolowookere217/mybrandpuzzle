"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function CreateCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [prizeAmount, setPrizeAmount] = useState("");
  const [gridSize, setGridSize] = useState<3 | 4 | 5>(3);
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);

  const handleImageChange = (url: string) => {
    setImageUrl(url);
    setImagePreview(url);
  };

  const updateQuestion = (
    index: number,
    field: string,
    value: string | number | string[]
  ) => {
    const newQuestions = [...questions];
    if (field === "options") {
      newQuestions[index].options = value as string[];
    } else if (field === "correctAnswer") {
      newQuestions[index].correctAnswer = value as number;
    } else {
      newQuestions[index].question = value as string;
    }
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Campaign created successfully!");
      router.push("/brand");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-100 font-[family-name:var(--font-orbitron)] mb-2">
          Create Puzzle Campaign
        </h1>
        <p className="text-dark-400">
          Upload your brand image and create 3 questions for players to answer
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="gaming-card">
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>
              Basic information about your campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Campaign Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Nike Swoosh Challenge"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your campaign..."
                className="w-full h-24 px-4 py-3 rounded-lg border-2 border-dark-700 bg-dark-900 text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-primary-500"
                required
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Prize Amount (NGN)
                </label>
                <Input
                  type="number"
                  value={prizeAmount}
                  onChange={(e) => setPrizeAmount(e.target.value)}
                  placeholder="50000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Puzzle Size
                </label>
                <select
                  value={gridSize}
                  onChange={(e) =>
                    setGridSize(Number(e.target.value) as 3 | 4 | 5)
                  }
                  className="w-full h-11 px-4 rounded-lg border-2 border-dark-700 bg-dark-900 text-dark-100 focus:outline-none focus:border-primary-500">
                  <option value={3}>3x3 (Easy)</option>
                  <option value={4}>4x4 (Medium)</option>
                  <option value={5}>5x5 (Hard)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gaming-card">
          <CardHeader>
            <CardTitle>Brand Image</CardTitle>
            <CardDescription>
              Upload the image that will be turned into a puzzle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                value={imageUrl}
                onChange={(e) => handleImageChange(e.target.value)}
                placeholder="Enter image URL"
                required
              />
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-dark-400 mb-2">Preview:</p>
                  <div className="w-48 h-48 rounded-lg overflow-hidden border-2 border-primary-500/30 relative">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      width={192}
                      height={192}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="gaming-card">
          <CardHeader>
            <CardTitle>Quiz Questions</CardTitle>
            <CardDescription>
              Create 3 questions about your brand
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="p-4 rounded-lg bg-dark-800/50 border border-dark-700">
                <h4 className="font-semibold text-primary-500 mb-3">
                  Question {qIndex + 1}
                </h4>
                <div className="space-y-3">
                  <Input
                    value={q.question}
                    onChange={(e) =>
                      updateQuestion(qIndex, "question", e.target.value)
                    }
                    placeholder="Enter your question"
                    required
                  />
                  <div className="grid sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIndex) => (
                      <div key={oIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={"correct-" + qIndex}
                          checked={q.correctAnswer === oIndex}
                          onChange={() =>
                            updateQuestion(qIndex, "correctAnswer", oIndex)
                          }
                          className="w-4 h-4 text-primary-500"
                        />
                        <Input
                          value={opt}
                          onChange={(e) =>
                            updateOption(qIndex, oIndex, e.target.value)
                          }
                          placeholder={
                            "Option " + String.fromCharCode(65 + oIndex)
                          }
                          className="flex-1"
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-dark-500">
                    Select the correct answer
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1">
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Creating..." : "Create Campaign"}
          </Button>
        </div>
      </form>
    </div>
  );
}
