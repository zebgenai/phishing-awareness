import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Globe, 
  CreditCard, 
  Shield, 
  AlertTriangle,
  Eye,
  Lock,
  CheckCircle
} from "lucide-react";

const PhishingAwareness = () => {
  const phishingTypes = [
    {
      icon: Mail,
      title: "Email Phishing",
      description: "Fraudulent emails that appear to be from trusted sources, asking for personal information or login credentials.",
      examples: ["Fake bank notifications", "Fake delivery notices", "Fake account suspension warnings"],
      color: "text-blue-600"
    },
    {
      icon: MessageSquare,
      title: "SMS Phishing (Smishing)",
      description: "Text messages containing malicious links or requests for personal information.",
      examples: ["Fake prize notifications", "Fake security alerts", "Fake payment requests"],
      color: "text-green-600"
    },
    {
      icon: Phone,
      title: "Voice Phishing (Vishing)",
      description: "Phone calls where attackers impersonate legitimate organizations to steal information.",
      examples: ["Fake tech support calls", "Fake bank verification calls", "Fake government calls"],
      color: "text-purple-600"
    },
    {
      icon: Globe,
      title: "Website Phishing",
      description: "Fake websites that mimic legitimate sites to steal login credentials and personal data.",
      examples: ["Fake banking sites", "Fake shopping sites", "Fake social media login pages"],
      color: "text-orange-600"
    }
  ];

  const warningSignsData = [
    {
      icon: AlertTriangle,
      title: "Urgent Language",
      description: "Messages claiming immediate action is required or threatening account closure."
    },
    {
      icon: Eye,
      title: "Generic Greetings",
      description: "Emails starting with 'Dear Customer' instead of your actual name."
    },
    {
      icon: Lock,
      title: "Suspicious Links",
      description: "URLs that don't match the supposed sender or contain spelling errors."
    },
    {
      icon: CreditCard,
      title: "Requests for Information",
      description: "Asking for passwords, PINs, or personal information via email or text."
    }
  ];

  const protectionTips = [
    "Always verify the sender's identity through a separate communication channel",
    "Never click suspicious links - type URLs directly into your browser",
    "Use multi-factor authentication whenever possible",
    "Keep your software and browsers updated",
    "Be cautious of urgent or threatening messages",
    "Check for spelling and grammar errors in official communications"
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-primary animate-pulse-security" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Phishing Awareness Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about different types of phishing attacks and how to protect yourself from cybercriminals.
          </p>
        </div>

        {/* What is Phishing Section */}
        <Card className="mb-12 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-warning" />
              What is Phishing?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Phishing is a cyber attack method where criminals disguise themselves as trustworthy entities 
              to trick individuals into revealing sensitive information such as usernames, passwords, credit 
              card details, or other personal data. These attacks can occur through various channels including 
              email, text messages, phone calls, or fake websites.
            </p>
          </CardContent>
        </Card>

        {/* Types of Phishing */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Types of Phishing Attacks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phishingTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 transform hover:scale-105">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className={`h-6 w-6 ${type.color}`} />
                      {type.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Common Examples:</h4>
                      <ul className="space-y-1">
                        {type.examples.map((example, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Warning Signs */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Warning Signs to Watch For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {warningSignsData.map((sign, index) => {
              const Icon = sign.icon;
              return (
                <Card key={index} className="shadow-card text-center bg-warning/5 border-warning/20">
                  <CardContent className="p-6">
                    <Icon className="h-12 w-12 text-warning mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{sign.title}</h3>
                    <p className="text-sm text-muted-foreground">{sign.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Protection Tips */}
        <Card className="mb-12 shadow-card bg-success/5 border-success/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-success" />
              How to Protect Yourself
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {protectionTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-muted-foreground mb-6">
            Practice identifying phishing attempts with our interactive tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/email-check">
              <Button variant="default" size="lg">
                <Mail className="h-5 w-5" />
                Check Email Examples
              </Button>
            </Link>
            <Link to="/quiz">
              <Button variant="outline" size="lg">
                Take the Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishingAwareness;