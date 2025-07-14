import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  ArrowRight,
  ArrowLeft,
  Target
} from "lucide-react";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the most common way phishing attacks are delivered?",
      options: [
        "Through email messages",
        "Through phone calls",
        "Through text messages",
        "Through social media"
      ],
      correct: 0,
      explanation: "Email is the most common method for phishing attacks, accounting for over 90% of all phishing attempts."
    },
    {
      id: 2,
      question: "Which of the following is a red flag in a phishing email?",
      options: [
        "Professional company logo",
        "Generic greeting like 'Dear Customer'",
        "Proper spelling and grammar",
        "Company contact information"
      ],
      correct: 1,
      explanation: "Generic greetings are a major red flag. Legitimate companies typically address you by name."
    },
    {
      id: 3,
      question: "What should you do if you receive a suspicious email asking for your password?",
      options: [
        "Reply with your password",
        "Click the link to verify your account",
        "Delete the email and contact the company directly",
        "Forward it to your friends"
      ],
      correct: 2,
      explanation: "Never provide passwords via email. Always contact the company directly through official channels to verify."
    },
    {
      id: 4,
      question: "Which URL is most likely to be a phishing site?",
      options: [
        "https://amazon.com",
        "https://arnazon.com",
        "https://secure.amazon.com",
        "https://www.amazon.com"
      ],
      correct: 1,
      explanation: "The URL 'arnazon.com' uses character substitution (rn instead of m) to mimic the legitimate Amazon site."
    },
    {
      id: 5,
      question: "What is 'spear phishing'?",
      options: [
        "Mass emails sent to everyone",
        "Phishing attacks via text message",
        "Targeted attacks on specific individuals",
        "Phishing through social media"
      ],
      correct: 2,
      explanation: "Spear phishing involves highly targeted attacks where criminals research specific individuals to make their attacks more convincing."
    },
    {
      id: 6,
      question: "Which of these is the best way to verify a suspicious link?",
      options: [
        "Click on it to see where it goes",
        "Hover over it to see the actual URL",
        "Trust it if it looks official",
        "Ask a friend to click it first"
      ],
      correct: 1,
      explanation: "Hovering over links reveals the actual destination URL, helping you identify suspicious or malicious links."
    },
    {
      id: 7,
      question: "What does 'https://' indicate in a website URL?",
      options: [
        "The website is definitely safe",
        "The connection is encrypted",
        "The website is government-approved",
        "The website is phishing-free"
      ],
      correct: 1,
      explanation: "HTTPS indicates encryption but doesn't guarantee the site is legitimate. Phishing sites can also use HTTPS."
    },
    {
      id: 8,
      question: "What should you do if you accidentally clicked on a phishing link?",
      options: [
        "Ignore it and hope for the best",
        "Immediately change your passwords and monitor accounts",
        "Just close the browser",
        "Wait to see what happens"
      ],
      correct: 1,
      explanation: "Quick action is crucial. Change passwords immediately and monitor all accounts for suspicious activity."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++;
      }
    });
    return correct;
  };

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return { message: "Excellent! You're a phishing expert!", color: "text-success" };
    if (percentage >= 70) return { message: "Great job! You have good phishing awareness.", color: "text-primary" };
    if (percentage >= 50) return { message: "Not bad, but there's room for improvement.", color: "text-warning" };
    return { message: "You might want to review the training materials.", color: "text-destructive" };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const score = calculateScore();
  const scoreMessage = getScoreMessage(score, questions.length);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showResults ? (
          <>
            
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Trophy className="h-12 w-12 text-primary animate-pulse-security" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Phishing Awareness Quiz
              </h1>
              <p className="text-muted-foreground">
                Test your knowledge of phishing attacks and security best practices
              </p>
            </div>

            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            
            <Card className="shadow-elevated mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl">
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 hover:bg-accent/50'
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground'
                      }`}>
                        {selectedAnswers[currentQuestion] === index && (
                          <div className="w-full h-full rounded-full bg-primary-foreground transform scale-50"></div>
                        )}
                      </div>
                      <span className="text-foreground">{option}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                variant={currentQuestion === questions.length - 1 ? "success" : "default"}
              >
                {currentQuestion === questions.length - 1 ? (
                  <>
                    Submit Quiz
                    <Target className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          
          <div className="animate-fade-in">
            
            <div className="text-center mb-8">
              <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Quiz Complete!
              </h1>
              <div className="text-6xl font-bold text-primary mb-2">
                {score}/{questions.length}
              </div>
              <p className={`text-xl ${scoreMessage.color} font-semibold`}>
                {scoreMessage.message}
              </p>
            </div>

            
            <Card className="shadow-elevated mb-8">
              <CardHeader>
                <CardTitle>Detailed Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions.map((question, index) => {
                  const isCorrect = selectedAnswers[index] === question.correct;
                  return (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-start gap-3 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-foreground mb-1">
                            Question {index + 1}: {question.question}
                          </p>
                          <div className="space-y-1 text-sm">
                            <p className="text-muted-foreground">
                              Your answer: {question.options[selectedAnswers[index]]}
                            </p>
                            {!isCorrect && (
                              <p className="text-success">
                                Correct answer: {question.options[question.correct]}
                              </p>
                            )}
                            <p className="text-muted-foreground italic">
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                        <Badge variant={isCorrect ? "default" : "destructive"}>
                          {isCorrect ? "Correct" : "Wrong"}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            
            <div className="text-center space-y-4">
              <Button onClick={handleRestartQuiz} size="lg" variant="outline">
                <RotateCcw className="h-5 w-5" />
                Retake Quiz
              </Button>
              <p className="text-sm text-muted-foreground">
                Practice makes perfect! Keep learning about phishing prevention.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;