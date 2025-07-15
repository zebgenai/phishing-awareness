import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, BookOpen, Mail, Trophy, ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Learn Protection",
      description: "Master phishing awareness with comprehensive guides",
      link: "/learn",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Mail,
      title: "Analyze Emails",
      description: "Practice with real phishing examples",
      link: "/email-check",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: Trophy,
      title: "Test Knowledge",
      description: "Challenge yourself with our quiz",
      link: "/quiz",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: "1s"}}></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Shield className="h-24 w-24 text-primary animate-pulse-security" />
                <div className="absolute inset-0 h-24 w-24 bg-primary/20 rounded-full blur-xl animate-glow"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-scale-in">
              <span className="gradient-text">Phishing</span>
              <br />
              <span className="text-foreground">Security Hub</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
              Master the art of identifying and protecting yourself from phishing attacks with our comprehensive training platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in" style={{animationDelay: "0.4s"}}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group relative overflow-hidden hover-lift hover-glow bg-gradient-card border-0 shadow-elevated">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="mb-6">
                      <div className="relative inline-flex">
                        <Icon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                        <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {feature.description}
                    </p>
                    <Link to={feature.link}>
                      <Button className="w-full group-hover:shadow-glow transition-all duration-300">
                        Get Started
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="animate-fade-in" style={{animationDelay: "0.6s"}}>
            <Link to="/learn">
              <Button size="lg" className="px-8 py-4 text-lg hover:shadow-neon transition-all duration-500 animate-shimmer">
                <Shield className="h-6 w-6 mr-2" />
                Start Your Security Journey
                <ArrowRight className="h-6 w-6 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Join thousands learning to stay safe online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
