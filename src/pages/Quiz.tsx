import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
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
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header Section */}
              <motion.div 
                className="text-center mb-8 relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-glow blur-3xl"></div>
                <div className="relative z-10">
                  <motion.div 
                    className="flex justify-center mb-4"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="relative">
                      <Trophy className="h-12 w-12 text-primary" aria-hidden="true" />
                      <div className="absolute inset-0 h-12 w-12 bg-primary/20 rounded-full blur-xl animate-glow"></div>
                    </div>
                  </motion.div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    <span className="gradient-text">Phishing Awareness</span> Quiz
                  </h1>
                  <p className="text-muted-foreground">
                    Test your knowledge of phishing attacks and security best practices
                  </p>
                </div>
              </motion.div>

              {/* Progress Section */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <Progress value={progress} className="h-2" role="progressbar" aria-label="Quiz progress" />
              </motion.div>

              {/* Question Card */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card className="shadow-elevated mb-8 interactive-card bg-gradient-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl" role="heading" aria-level={2}>
                      {questions[currentQuestion].question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <fieldset>
                      <legend className="sr-only">Answer options</legend>
                      {questions[currentQuestion].options.map((option, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 focus-visible-ring group ${
                              selectedAnswers[currentQuestion] === index
                                ? 'border-primary bg-primary/10 shadow-glow'
                                : 'border-border hover:border-primary/50 hover:bg-accent/50 hover:shadow-elevated'
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleAnswerSelect(index);
                              }
                            }}
                            tabIndex={0}
                            role="radio"
                            aria-checked={selectedAnswers[currentQuestion] === index}
                            aria-label={`Option ${index + 1}: ${option}`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                                selectedAnswers[currentQuestion] === index
                                  ? 'border-primary bg-primary'
                                  : 'border-muted-foreground'
                              }`}>
                                {selectedAnswers[currentQuestion] === index && (
                                  <motion.div 
                                    className="w-full h-full rounded-full bg-primary-foreground"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                  />
                                )}
                              </div>
                              <span className="text-foreground">{option}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </fieldset>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Navigation Buttons */}
              <motion.div 
                className="flex justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="interactive-button focus-visible-ring"
                  aria-label="Go to previous question"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Previous
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  variant={currentQuestion === questions.length - 1 ? "success" : "default"}
                  className="interactive-button focus-visible-ring"
                  aria-label={currentQuestion === questions.length - 1 ? "Submit quiz" : "Go to next question"}
                >
                  {currentQuestion === questions.length - 1 ? (
                    <>
                      Submit Quiz
                      <Target className="h-4 w-4 ml-2" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            // Results Section
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Results Header */}
                <motion.div
                className="text-center mb-8 relative"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-glow blur-3xl animate-float"></div>
                <div className="relative z-10">
                  <motion.div 
                    className="relative inline-flex mb-4"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Trophy className="h-16 w-16 text-primary" aria-hidden="true" />
                    <div className="absolute inset-0 h-16 w-16 bg-primary/20 rounded-full blur-xl animate-glow"></div>
                  </motion.div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    Quiz Complete!
                  </h1>
                  <motion.div 
                    className="text-6xl font-bold gradient-text mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5, type: "spring", bounce: 0.5 }}
                    aria-label={`Score: ${score} out of ${questions.length} correct`}
                  >
                    {score}/{questions.length}
                  </motion.div>
                  <motion.p 
                    className={`text-xl ${scoreMessage.color} font-semibold`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    {scoreMessage.message}
                  </motion.p>
                </div>
              </motion.div>

              {/* Detailed Results */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <Card className="shadow-elevated mb-8 bg-gradient-card border-0 interactive-card">
                  <CardHeader>
                    <CardTitle role="heading" aria-level={2}>Detailed Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {questions.map((question, index) => {
                      const isCorrect = selectedAnswers[index] === question.correct;
                      return (
                        <motion.div 
                          key={index} 
                          className="border-b pb-4 last:border-b-0"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.1 + (index * 0.1), duration: 0.4 }}
                        >
                          <div className="flex items-start gap-3 mb-2">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 1.2 + (index * 0.1), duration: 0.3, type: "spring" }}
                            >
                              {isCorrect ? (
                                <CheckCircle 
                                  className="h-5 w-5 text-success mt-0.5" 
                                  aria-label="Correct answer"
                                />
                              ) : (
                                <XCircle 
                                  className="h-5 w-5 text-destructive mt-0.5" 
                                  aria-label="Incorrect answer"
                                />
                              )}
                            </motion.div>
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
                            <Badge 
                              variant={isCorrect ? "default" : "destructive"}
                              aria-label={isCorrect ? "Correct answer" : "Incorrect answer"}
                            >
                              {isCorrect ? "Correct" : "Wrong"}
                            </Badge>
                          </div>
                        </motion.div>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                <Button 
                  onClick={handleRestartQuiz} 
                  size="lg" 
                  variant="outline"
                  className="interactive-button focus-visible-ring"
                  aria-label="Retake the quiz"
                >
                  <RotateCcw className="h-5 w-5 mr-2" aria-hidden="true" />
                  Retake Quiz
                </Button>
                <p className="text-sm text-muted-foreground">
                  Practice makes perfect! Keep learning about phishing prevention.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Quiz;