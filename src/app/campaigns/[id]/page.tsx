"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { Campaign } from "@/types";
import { formatCurrency } from "@/lib/utils";

export default function CampaignPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: string; selectedAnswer: number }[]
  >([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadCampaign = async () => {
      try {
        const campaignData = await db.campaigns.findById(campaignId);
        setCampaign(campaignData);
      } catch (error) {
        console.error("Error loading campaign:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCampaign();
  }, [campaignId]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null || !campaign) return;

    const currentQuestion = campaign.questions[currentQuestionIndex];
    const newAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedAnswer,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < campaign.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed
      const correctAnswers = updatedAnswers.filter((answer, index) => {
        const question = campaign.questions[index];
        return answer.selectedAnswer === question.correctAnswer;
      });

      const finalScore =
        (correctAnswers.length / campaign.questions.length) * 100;
      setScore(finalScore);
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousAnswer = answers[currentQuestionIndex - 1];
      setSelectedAnswer(previousAnswer ? previousAnswer.selectedAnswer : null);
      setAnswers(answers.slice(0, -1));
    }
  };

  const generateReportCard = async () => {
    if (!campaign) return;

    const reportText = `I just completed ${campaign.brand.name}\u2019s ${
      campaign.title
    } quiz and scored ${score.toFixed(
      0
    )}%!\n\nI just took a quiz to stand a chance to win ${formatCurrency(
      campaign.prizeAmount
    )}! Please help me by liking and sharing so I can win.\n\nClick here to take the quiz yourself and stand a chance to win ${formatCurrency(
      campaign.prizeAmount
    )} for free: ${window.location.origin}/campaigns/${
      campaign.id
    }\n\nSponsored by ${
      campaign.brand.name
    } – your reliable source for quality products and services.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `I completed ${campaign.brand.name}\u2019s quiz!`,
          text: reportText,
          url: `${window.location.origin}/campaigns/${campaign.id}`,
        });
      } else {
        await navigator.clipboard.writeText(reportText);
        alert("Report card text copied to clipboard!");
      }
    } catch (err) {
      // ignore share errors silently
      console.error("Share failed", err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Campaign Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The campaign you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button onClick={() => router.push("/campaigns")}>
            Browse Other Campaigns
          </Button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-green-600 mb-2">
              🎉 Congratulations!
            </CardTitle>
            <CardDescription className="text-lg">
              You completed {campaign.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {score.toFixed(0)}%
              </div>
              <p className="text-green-700">
                You answered{" "}
                {
                  answers.filter(
                    (answer, index) =>
                      answer.selectedAnswer ===
                      campaign.questions[index].correctAnswer
                  ).length
                }{" "}
                out of {campaign.questions.length} questions correctly
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What&apos;s Next?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Share Your Achievement
                  </h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Share your completion on social media to increase your
                    leaderboard ranking!
                  </p>
                  <Button
                    onClick={generateReportCard}
                    variant="outline"
                    size="sm">
                    Share Report Card
                  </Button>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">
                    Check Leaderboard
                  </h4>
                  <p className="text-sm text-purple-700 mb-3">
                    See how you rank against other participants. Top 10 win
                    prizes!
                  </p>
                  <Button
                    onClick={() => router.push("/leaderboard")}
                    variant="outline"
                    size="sm">
                    View Leaderboard
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => router.push("/campaigns")}
                className="mr-4">
                Browse More Campaigns
              </Button>
              <Button variant="outline" onClick={() => router.push("/user")}>
                Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizStarted) {
    const currentQuestion = campaign.questions[currentQuestionIndex];
    const progress =
      ((currentQuestionIndex + 1) / campaign.questions.length) * 100;

    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {campaign.questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {progress.toFixed(0)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedAnswer === index
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}>
                  <span className="font-medium mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}>
                Previous
              </Button>

              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}>
                {currentQuestionIndex === campaign.questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Campaign Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {campaign.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{campaign.description}</p>

          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="text-center">
              <div className="font-semibold text-green-600 text-lg">
                {formatCurrency(campaign.prizeAmount)}
              </div>
              <div>Prize Pool</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-600 text-lg">
                {campaign.questions.length}
              </div>
              <div>Questions</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-purple-600 text-lg">
                {campaign.brand.name}
              </div>
              <div>Sponsored by</div>
            </div>
          </div>
        </div>

        {/* Campaign Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Content</CardTitle>
              <CardDescription>
                Learn about {campaign.brand.name} before taking the quiz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaign.content.map((content) => (
                  <div key={content.id}>
                    {content.type === "TEXT" && (
                      <p className="text-gray-700">{content.text}</p>
                    )}
                    {content.type === "VIDEO" && (
                      <div className="bg-gray-100 p-8 rounded-lg text-center">
                        <div className="text-gray-500 mb-2">📹</div>
                        <p className="text-sm text-gray-600">
                          Video content would be displayed here
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {content.url}
                        </p>
                      </div>
                    )}
                    {content.type === "IMAGE" && (
                      <div className="bg-gray-100 p-8 rounded-lg text-center">
                        <div className="text-gray-500 mb-2">🖼️</div>
                        <p className="text-sm text-gray-600">
                          Image content would be displayed here
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {content.url}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quiz Information</CardTitle>
              <CardDescription>What to expect in this quiz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Number of Questions:</span>
                  <span className="font-medium">
                    {campaign.questions.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Time:</span>
                  <span className="font-medium">
                    {campaign.questions.length * 2} minutes
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prize Pool:</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(campaign.prizeAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Campaign Ends:</span>
                  <span className="font-medium">
                    {new Date(campaign.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">How to Win:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Complete the quiz with a high score</li>
                    <li>• Share your achievement on social media</li>
                    <li>• Get likes and shares to boost your ranking</li>
                    <li>• Top 10 on leaderboard win cash prizes!</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Start Quiz Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleStartQuiz}
            className="px-12 py-3 text-lg">
            Start Quiz Now
          </Button>
          <p className="text-sm text-gray-600 mt-4">
            Make sure you have reviewed the content above before starting the
            quiz.
          </p>
        </div>
      </div>
    </div>
  );
}
