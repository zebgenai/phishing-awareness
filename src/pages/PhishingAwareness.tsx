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
  CheckCircle,
  UserCheck,
  Smartphone,
  Wifi,
  Settings,
  BookOpen,
  Target,
  Lightbulb,
  FileText,
  Clock
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

  const advancedProtectionStrategies = [
    {
      icon: UserCheck,
      title: "Verify Before You Trust",
      description: "Always confirm requests through independent channels",
      steps: [
        "Contact the organization directly using official phone numbers",
        "Visit their official website by typing the URL manually",
        "Ask for verification details that only they would know",
        "Never use contact information provided in suspicious messages"
      ]
    },
    {
      icon: Smartphone,
      title: "Secure Your Devices",
      description: "Implement comprehensive device security measures",
      steps: [
        "Enable automatic security updates on all devices",
        "Use strong, unique passwords for each account",
        "Install reputable antivirus software",
        "Enable device lock screens with PIN, fingerprint, or face recognition"
      ]
    },
    {
      icon: Wifi,
      title: "Safe Internet Practices",
      description: "Browse and communicate safely online",
      steps: [
        "Use secure Wi-Fi networks and avoid public Wi-Fi for sensitive activities",
        "Look for HTTPS (lock icon) when entering personal information",
        "Log out of accounts when finished, especially on shared devices",
        "Regularly clear browser cookies and cached data"
      ]
    },
    {
      icon: Settings,
      title: "Account Security Settings",
      description: "Configure your accounts for maximum protection",
      steps: [
        "Enable two-factor authentication on all important accounts",
        "Set up account recovery options with secure backup methods",
        "Review and limit app permissions and third-party access",
        "Monitor account activity and set up security alerts"
      ]
    }
  ];

  const practicalExercises = [
    {
      icon: Target,
      title: "URL Inspection Exercise",
      description: "Learn to identify suspicious web addresses",
      content: "Practice examining URLs for misspellings, extra characters, or suspicious domains. Real bank URLs vs fake ones: chase.com vs ch4se.com or chase-security.net"
    },
    {
      icon: Mail,
      title: "Email Header Analysis",
      description: "Check the real source of emails",
      content: "Learn to view email headers to see the actual sender. Look for mismatched 'From' and 'Reply-To' addresses, and suspicious routing information."
    },
    {
      icon: Lightbulb,
      title: "Social Engineering Tactics",
      description: "Recognize psychological manipulation",
      content: "Understand how attackers create urgency, fear, or excitement to bypass your rational thinking. Practice identifying emotional manipulation in messages."
    }
  ];

  const incidentResponse = [
    {
      step: "1",
      title: "Don't Panic",
      description: "Stay calm and don't click any more links or provide additional information"
    },
    {
      step: "2", 
      title: "Document Everything",
      description: "Take screenshots of suspicious messages and note any information you may have shared"
    },
    {
      step: "3",
      title: "Secure Your Accounts",
      description: "Change passwords for any accounts that might be compromised and enable 2FA"
    },
    {
      step: "4",
      title: "Report the Incident",
      description: "Contact your bank, IT department, or relevant authorities. Forward phishing emails to anti-phishing@domain.com"
    },
    {
      step: "5",
      title: "Monitor for Unusual Activity",
      description: "Check bank statements, credit reports, and account activities for any unauthorized access"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-glow blur-3xl animate-float"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Shield className="h-16 w-16 text-primary animate-pulse-security" />
                <div className="absolute inset-0 h-16 w-16 bg-primary/20 rounded-full blur-xl animate-glow"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
              <span className="gradient-text">Phishing Awareness</span> Guide
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{animationDelay: "0.2s"}}>
              Learn about different types of phishing attacks and how to protect yourself from cybercriminals.
            </p>
          </div>
        </div>

        
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

        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Types of Phishing Attacks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phishingTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-elevated hover-lift hover-glow bg-gradient-card border-0 group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
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

        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Warning Signs to Watch For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {warningSignsData.map((sign, index) => {
              const Icon = sign.icon;
              return (
                <Card key={index} className="shadow-card text-center bg-warning/5 border-warning/20 hover-lift group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardContent className="p-6">
                    <Icon className="h-12 w-12 text-warning mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-foreground mb-2">{sign.title}</h3>
                    <p className="text-sm text-muted-foreground">{sign.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        
        <Card className="mb-12 shadow-card bg-success/5 border-success/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-success" />
              Essential Protection Tips
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

        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Advanced Protection Strategies
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {advancedProtectionStrategies.map((strategy, index) => {
              const Icon = strategy.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />
                      {strategy.title}
                    </CardTitle>
                    <p className="text-muted-foreground">{strategy.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {strategy.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-semibold text-primary">{stepIndex + 1}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Practical Learning Exercises
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {practicalExercises.map((exercise, index) => {
              const Icon = exercise.icon;
              return (
                <Card key={index} className="shadow-card bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <Icon className="h-6 w-6 text-primary" />
                      {exercise.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{exercise.description}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{exercise.content}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        
        <Card className="mb-12 shadow-card bg-destructive/5 border-destructive/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              What to Do If You've Been Targeted
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              If you suspect you've fallen victim to a phishing attack, follow these steps immediately:
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incidentResponse.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-background rounded-lg border">
                  <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">{step.step}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        
        <Card className="mb-12 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Complete Your Learning Journey
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Now that you've learned the fundamentals, practice with real examples and test your knowledge.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Analyze Real Examples
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Practice identifying phishing emails with our interactive email checker tool.
                </p>
                <Link to="/email-check">
                  <Button variant="default" size="sm" className="w-full">
                    Start Email Analysis
                  </Button>
                </Link>
              </div>
              <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Test Your Knowledge
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Take our comprehensive quiz to verify your understanding of phishing protection.
                </p>
                <Link to="/quiz">
                  <Button variant="outline" size="sm" className="w-full">
                    Take the Quiz
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        
        <Card className="mb-12 shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Recommended Reading</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• NIST Cybersecurity Framework</li>
                  <li>• FBI Internet Crime Complaint Center (IC3)</li>
                  <li>• SANS Security Awareness Training</li>
                  <li>• Anti-Phishing Working Group (APWG) Reports</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Regular Practice</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Review security settings monthly</li>
                  <li>• Stay updated on latest attack trends</li>
                  <li>• Practice identifying suspicious content</li>
                  <li>• Share knowledge with family and colleagues</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PhishingAwareness;