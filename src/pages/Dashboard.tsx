import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  User,
  Trophy,
  BookOpen,
  Mail,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  Target,
  Shield
} from "lucide-react";

const Dashboard = () => {
  // Mock user data - in a real app, this would come from your backend/Supabase
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "2024-01-15",
    totalQuizzes: 12,
    averageScore: 85,
    lastQuizScore: 92,
    currentStreak: 5,
    certificates: 2
  };

  const recentQuizzes = [
    { date: "2024-01-20", score: 92, total: 10, topic: "Email Phishing" },
    { date: "2024-01-18", score: 88, total: 10, topic: "Social Engineering" },
    { date: "2024-01-15", score: 75, total: 8, topic: "Website Security" },
    { date: "2024-01-12", score: 95, total: 10, topic: "Password Security" },
    { date: "2024-01-10", score: 82, total: 10, topic: "General Awareness" }
  ];

  const achievements = [
    { title: "Phishing Expert", description: "Scored 90%+ on 5 quizzes", earned: true },
    { title: "Consistent Learner", description: "Completed 10 quizzes", earned: true },
    { title: "Email Detective", description: "Perfect score on email quiz", earned: false },
    { title: "Security Champion", description: "Complete all training modules", earned: false }
  ];

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "text-success";
    if (percentage >= 70) return "text-primary";
    if (percentage >= 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadgeVariant = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "default";
    if (percentage >= 70) return "secondary";
    return "destructive";
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {userData.name}!
              </h1>
              <p className="text-muted-foreground">
                Keep up your great progress in phishing awareness training
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Quizzes</p>
                  <p className="text-2xl font-bold text-foreground">{userData.totalQuizzes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-full">
                  <Target className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold text-foreground">{userData.averageScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-warning/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold text-foreground">{userData.currentStreak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                  <p className="text-2xl font-bold text-foreground">{userData.certificates}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Quiz Results */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Quiz Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuizzes.map((quiz, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-foreground">{quiz.topic}</h3>
                          <Badge variant={getScoreBadgeVariant(quiz.score, quiz.total)}>
                            {quiz.score}/{quiz.total}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(quiz.date).toLocaleDateString()}
                          </div>
                          <div className={`font-medium ${getScoreColor(quiz.score, quiz.total)}`}>
                            {Math.round((quiz.score / quiz.total) * 100)}%
                          </div>
                        </div>
                      </div>
                      <div className="w-24">
                        <Progress 
                          value={(quiz.score / quiz.total) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link to="/quiz">
                    <Button variant="outline">
                      <Trophy className="h-4 w-4" />
                      Take Another Quiz
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Achievements */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/quiz">
                  <Button className="w-full justify-start">
                    <Trophy className="h-4 w-4" />
                    Take New Quiz
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4" />
                    Review Training
                  </Button>
                </Link>
                <Link to="/email-check">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4" />
                    Practice Email Detection
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-3 border rounded-lg ${
                      achievement.earned 
                        ? 'border-success/30 bg-success/5' 
                        : 'border-muted bg-muted/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Award className={`h-5 w-5 mt-0.5 ${
                        achievement.earned ? 'text-success' : 'text-muted-foreground'
                      }`} />
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {achievement.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <Badge variant="default" className="text-xs">
                          Earned
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Backend Integration Notice */}
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Enhanced Features Available
                </h3>
                <p className="text-muted-foreground mb-4">
                  This dashboard shows demo data. Connect to Supabase to enable real user authentication, 
                  quiz result storage, progress tracking, and personalized learning paths.
                </p>
                <p className="text-sm text-muted-foreground">
                  Features available with backend integration: Real-time progress tracking, 
                  personalized quiz recommendations, certificate generation, and detailed analytics.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;