import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  AlertTriangle, 
  BookOpen, 
  Trophy, 
  Mail, 
  Users, 
  Target,
  Eye,
  Lock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Star
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Learn Protection",
      description: "Master phishing awareness with comprehensive guides and real-world scenarios.",
      link: "/learn",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: Mail,
      title: "Analyze Emails",
      description: "Practice with real phishing examples and learn to spot red flags instantly.",
      link: "/email-check",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      icon: Trophy,
      title: "Test Knowledge",
      description: "Challenge yourself with our comprehensive quiz and earn your security badge.",
      link: "/quiz",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    }
  ];

  const stats = [
    { 
      number: "3.4B", 
      label: "Phishing emails sent daily",
      icon: Mail,
      trend: "+15% this year"
    },
    { 
      number: "83%", 
      label: "Of organizations experienced attacks",
      icon: Target,
      trend: "Industry average"
    },
    { 
      number: "30%", 
      label: "Of phishing emails get opened",
      icon: Eye,
      trend: "Why training matters"
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "95% of users report improved security awareness"
    },
    {
      icon: Zap,
      title: "Fast Learning",
      description: "Complete training in just 30 minutes"
    },
    {
      icon: Globe,
      title: "Real-World Focus",
      description: "Based on actual phishing campaigns"
    },
    {
      icon: Star,
      title: "Expert Approved",
      description: "Designed by cybersecurity professionals"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: "1s"}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-glow rounded-full blur-3xl opacity-30"></div>
      
      {/* Hero Section */}
      <section className="relative z-10 bg-gradient-hero text-primary-foreground py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8 animate-fade-in">
              <div className="relative">
                <Shield className="h-24 w-24 text-primary-foreground animate-pulse-security" />
                <div className="absolute inset-0 h-24 w-24 bg-primary-foreground/20 rounded-full blur-xl animate-glow"></div>
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-warning animate-float" />
              </div>
            </div>
            
            <Badge className="mb-6 px-4 py-2 bg-warning/20 text-warning border-warning/30 animate-scale-in">
              🔒 Protect Yourself Today
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
              Stay Safe from
              <span className="block gradient-text text-warning"> Phishing Attacks</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-primary-foreground/90 animate-fade-in" style={{animationDelay: "0.4s"}}>
              Master the art of identifying and protecting yourself from phishing scams through 
              <span className="font-semibold text-warning"> interactive training</span> and real-world examples.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{animationDelay: "0.6s"}}>
              <Link to="/learn">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto hover:shadow-glow transition-all duration-300 group">
                  <BookOpen className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Start Learning
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/quiz">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 hover:shadow-neon transition-all duration-300 group">
                  <Trophy className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Take Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-muted/20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
              The <span className="gradient-text">Phishing Threat</span> is Real
            </h2>
            <p className="text-xl text-muted-foreground animate-fade-in" style={{animationDelay: "0.2s"}}>
              Understanding the scale helps you stay protected
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover-lift hover-glow bg-gradient-card border-0 shadow-elevated group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <Icon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 h-12 w-12 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                      </div>
                    </div>
                    <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-105 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <p className="text-muted-foreground text-lg mb-2">{stat.label}</p>
                    <Badge variant="outline" className="text-xs">
                      {stat.trend}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
              Comprehensive <span className="gradient-text">Phishing Protection</span> Training
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{animationDelay: "0.2s"}}>
              Our interactive platform helps you recognize and defend against phishing attacks with hands-on experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className={`bg-gradient-card border-0 shadow-elevated group relative overflow-hidden ${feature.borderColor}`}>
                  <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="flex justify-center mb-6">
                      <div className={`relative p-4 ${feature.bgColor} rounded-2xl`}>
                        <Icon className={`h-8 w-8 ${feature.color}`} />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <Link to={feature.link}>
                      <Button className="w-full">
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-success/10 rounded-full group-hover:bg-success/20 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-success group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          {/* How It Works Section */}
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              How Our <span className="gradient-text">Training Works</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              A simple 3-step process to become phishing-aware in just 30 minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
                  <div className="h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent hidden md:block"></div>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Learn the Basics</h4>
              <p className="text-muted-foreground">
                Understand common phishing tactics, red flags, and security best practices through interactive lessons.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
                  <div className="h-0.5 bg-gradient-to-r from-green-500/50 to-orange-500/50 hidden md:block"></div>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Practice Analysis</h4>
              <p className="text-muted-foreground">
                Analyze real phishing emails and learn to identify suspicious elements before they reach your inbox.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Test & Certify</h4>
              <p className="text-muted-foreground">
                Complete our comprehensive quiz to earn your Phishing Awareness Certificate and prove your skills.
              </p>
            </div>
          </div>

          {/* What You'll Learn Section */}
          <div className="bg-muted/20 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                What You'll <span className="gradient-text">Master</span>
              </h3>
              <p className="text-muted-foreground">
                Comprehensive skills to protect yourself and your organization
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Email Authentication</h4>
                    <p className="text-sm text-muted-foreground">Learn to verify sender authenticity and domain legitimacy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">URL Analysis</h4>
                    <p className="text-sm text-muted-foreground">Spot malicious links and suspicious redirects instantly</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Social Engineering Tactics</h4>
                    <p className="text-sm text-muted-foreground">Recognize psychological manipulation techniques</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Incident Response</h4>
                    <p className="text-sm text-muted-foreground">Know exactly what to do if you encounter a threat</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Mobile Security</h4>
                    <p className="text-sm text-muted-foreground">Protect yourself on smartphones and tablets</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Best Practices</h4>
                    <p className="text-sm text-muted-foreground">Daily habits to maintain strong security posture</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow blur-3xl opacity-20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-warning/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <AlertTriangle className="h-20 w-20 text-warning" />
                <div className="absolute inset-0 h-20 w-20 bg-warning/20 rounded-full blur-xl"></div>
              </div>
            </div>
            
            <Badge className="mb-6 px-4 py-2 bg-destructive/20 text-destructive border-destructive/30">
              ⚠️ Don't Wait Until It's Too Late
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Don't Be the Next <span className="gradient-text text-destructive">Victim</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your phishing awareness training today and protect yourself from cyber threats. 
              <span className="font-semibold text-foreground"> Every minute counts.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/learn">
                <Button size="lg" className="px-8 py-4 text-lg group">
                  <Shield className="h-6 w-6 mr-2" />
                  Start Training Now
                  <ArrowRight className="h-6 w-6 ml-2" />
                </Button>
              </Link>
              <Link to="/email-check">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg group">
                  <Eye className="h-6 w-6 mr-2" />
                  Test Your Skills
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              🔒 Trusted by thousands • ⭐ 5-star rated • 🚀 Start immediately
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;