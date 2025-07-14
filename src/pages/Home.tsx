import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, BookOpen, Trophy, Mail, Users } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Learn About Phishing",
      description: "Understand different types of phishing attacks and how to identify them.",
      link: "/learn"
    },
    {
      icon: Mail,
      title: "Real vs Fake Emails",
      description: "Practice identifying phishing emails with our interactive comparison tool.",
      link: "/email-check"
    },
    {
      icon: Trophy,
      title: "Take the Quiz",
      description: "Test your knowledge with our comprehensive phishing awareness quiz.",
      link: "/quiz"
    }
  ];

  const stats = [
    { number: "3.4B", label: "Phishing emails sent daily" },
    { number: "83%", label: "Of organizations experienced phishing attacks" },
    { number: "30%", label: "Of phishing emails get opened" },
  ];

  return (
    <div className="min-h-screen bg-background">
      
      <section className="bg-gradient-hero text-primary-foreground py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Shield className="h-20 w-20 text-primary-foreground animate-pulse-security" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Stay Safe from
              <span className="block text-warning"> Phishing Attacks</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-primary-foreground/90 animate-fade-in">
              Learn to identify and protect yourself from phishing scams through interactive training and real-world examples.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Link to="/learn">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Start Learning
                  <BookOpen className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/quiz">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Take Quiz
                  <Trophy className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Phishing Protection Training
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our interactive platform helps you recognize and defend against phishing attacks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 transform hover:scale-105 bg-gradient-card">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {feature.description}
                    </p>
                    <Link to={feature.link}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="h-16 w-16 text-warning mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Don't Be the Next Victim
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start your phishing awareness training today and protect yourself from cyber threats.
          </p>
          <Link to="/learn">
            <Button variant="hero" size="lg">
              <Shield className="h-5 w-5" />
              Start Training Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;