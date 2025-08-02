import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  Eye,
  Search,
  Copy,
  RefreshCw
} from "lucide-react";

interface AnalysisResult {
  url: string;
  isLegitimate: boolean;
  risk: "Low" | "Medium" | "High";
  issues: string[];
  positives: string[];
  verdict: string;
}

const LinkVerification = () => {
  const [selectedLink, setSelectedLink] = useState<number | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [userAnalysis, setUserAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const linkExamples = [
    {
      id: 1,
      type: "malicious",
      displayUrl: "www.payp4l.com/secure-login",
      actualUrl: "http://payp4l.com/secure-login",
      description: "Fake PayPal login page",
      redFlags: [
        "Uses '4' instead of 'a' in PayPal",
        "HTTP instead of HTTPS",
        "Suspicious domain spelling",
        "Not the official PayPal domain"
      ],
      legitimateVersion: "https://www.paypal.com",
      risk: "High"
    },
    {
      id: 2,
      type: "legitimate",
      displayUrl: "https://github.com/login",
      actualUrl: "https://github.com/login",
      description: "Official GitHub login page",
      positiveIndicators: [
        "Correct spelling of 'github'",
        "Uses HTTPS encryption",
        "Official .com domain",
        "No suspicious characters"
      ],
      risk: "Safe"
    },
    {
      id: 3,
      type: "malicious",
      displayUrl: "amaz0n.com/account-suspended",
      actualUrl: "http://amaz0n.com/account-suspended",
      description: "Fake Amazon suspension notice",
      redFlags: [
        "Uses '0' instead of 'o' in Amazon",
        "HTTP instead of HTTPS",
        "Urgent/threatening URL path",
        "Not the official Amazon domain"
      ],
      legitimateVersion: "https://www.amazon.com",
      risk: "High"
    },
    {
      id: 4,
      type: "legitimate",
      displayUrl: "https://docs.google.com/document/d/abc123",
      actualUrl: "https://docs.google.com/document/d/abc123",
      description: "Google Docs shared document",
      positiveIndicators: [
        "Official Google subdomain",
        "Uses HTTPS encryption",
        "Consistent with Google URL structure",
        "docs.google.com is legitimate"
      ],
      risk: "Safe"
    },
    {
      id: 5,
      type: "malicious",
      displayUrl: "microsoft-security-update.net/urgent",
      actualUrl: "http://microsoft-security-update.net/urgent",
      description: "Fake Microsoft security alert",
      redFlags: [
        "Not an official Microsoft domain",
        "HTTP instead of HTTPS",
        "Urgent/fear-inducing path",
        "Hyphenated domain mimicking Microsoft"
      ],
      legitimateVersion: "https://www.microsoft.com",
      risk: "High"
    }
  ];

  const currentLink = linkExamples.find(link => link.id === selectedLink);

  const handleLinkSelect = (linkId: number) => {
    setSelectedLink(linkId);
    setShowAnalysis(false);
    setUserAnalysis(null);
    toast({
      title: "Link Selected",
      description: "Click 'Show Analysis' to see security details",
    });
  };

  const handleShowAnalysis = () => {
    setShowAnalysis(true);
    toast({
      title: "Analysis Ready",
      description: "Security analysis is now displayed",
    });
  };

  const analyzeUrl = (url: string): AnalysisResult => {
    const issues: string[] = [];
    const positives: string[] = [];
    let isLegitimate = true;
    let risk: "Low" | "Medium" | "High" = "Low";

    // Protocol check
    if (!url.startsWith('https://')) {
      if (url.startsWith('http://')) {
        issues.push("Uses HTTP instead of HTTPS (not encrypted)");
        isLegitimate = false;
        risk = "High";
      } else {
        issues.push("Missing protocol (http/https)");
        risk = "Medium";
      }
    } else {
      positives.push("Uses HTTPS encryption");
    }

    // Domain analysis
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    const domain = urlObj.hostname.toLowerCase();

    // Common phishing patterns
    const suspiciousChars = /[0-9]/.test(domain.replace(/\./g, ''));
    if (suspiciousChars && (domain.includes('payp4l') || domain.includes('amaz0n') || domain.includes('g00gle'))) {
      issues.push("Contains suspicious character substitutions (0 for o, 4 for a)");
      isLegitimate = false;
      risk = "High";
    }

    // Check for typosquatting
    const knownDomains = ['google.com', 'facebook.com', 'amazon.com', 'paypal.com', 'microsoft.com', 'apple.com'];
    const isDomainLegitimate = knownDomains.some(legitDomain => 
      domain === legitDomain || domain.endsWith(`.${legitDomain}`)
    );

    if (isDomainLegitimate) {
      positives.push("Matches known legitimate domain");
    } else {
      // Check for suspicious patterns
      if (domain.includes('-') && knownDomains.some(legitDomain => 
        domain.includes(legitDomain.split('.')[0]))) {
        issues.push("Uses hyphens in domain that may mimic legitimate sites");
        risk = risk === "Low" ? "Medium" : risk;
      }
    }

    // URL path analysis
    const path = urlObj.pathname.toLowerCase();
    const suspiciousKeywords = ['urgent', 'suspend', 'verify', 'confirm', 'update', 'secure', 'alert'];
    if (suspiciousKeywords.some(keyword => path.includes(keyword))) {
      issues.push("Contains urgent or threatening keywords in path");
      risk = risk === "Low" ? "Medium" : risk;
      if (path.includes('suspend') || path.includes('urgent')) {
        isLegitimate = false;
        risk = "High";
      }
    }

    // Length check
    if (domain.length > 30) {
      issues.push("Unusually long domain name");
      risk = risk === "Low" ? "Medium" : risk;
    }

    // IP address check
    if (/^\d+\.\d+\.\d+\.\d+/.test(domain)) {
      issues.push("Uses IP address instead of domain name");
      isLegitimate = false;
      risk = "High";
    }

    // Subdomain analysis
    const subdomains = domain.split('.');
    if (subdomains.length > 3) {
      issues.push("Has multiple subdomains which may be suspicious");
      risk = risk === "Low" ? "Medium" : risk;
    }

    // Final determination
    if (issues.length === 0) {
      positives.push("No obvious red flags detected");
    }

    if (isLegitimate && issues.length <= 1) {
      risk = "Low";
    }

    const verdict = isLegitimate && risk === "Low" 
      ? "This link appears to be safe to visit" 
      : risk === "Medium"
      ? "Exercise caution - this link has some concerning features"
      : "This link appears to be malicious - do not visit";

    return {
      url,
      isLegitimate: isLegitimate && risk === "Low",
      risk,
      issues,
      positives,
      verdict
    };
  };

  const analyzeUserLink = async () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setSelectedLink(null);
    setShowAnalysis(false);

    try {
      // Simulate analysis delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = analyzeUrl(userInput.trim());
      setUserAnalysis(result);
      
      toast({
        title: "Analysis Complete",
        description: `Risk level: ${result.risk}`,
        variant: result.risk === "High" ? "destructive" : "default",
      });
    } catch (error) {
      toast({
        title: "Analysis Error",
        description: "Failed to analyze the URL. Please check the format.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "URL copied to clipboard",
    });
  };

  const clearAnalysis = () => {
    setUserInput("");
    setUserAnalysis(null);
    setSelectedLink(null);
    setShowAnalysis(false);
    toast({
      title: "Cleared",
      description: "Analysis cleared",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Search className="h-10 w-10 text-primary" />
            Link Verification Center
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Learn to identify malicious links and verify authentic ones. Practice with real examples and understand the warning signs of phishing URLs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Link Examples */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Practice Examples</h2>
            <div className="space-y-4">
              {linkExamples.map((link) => (
                <Card 
                  key={link.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                    selectedLink === link.id ? 'ring-2 ring-primary shadow-md' : ''
                  }`}
                  onClick={() => handleLinkSelect(link.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {link.type === "malicious" ? (
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          ) : (
                            <Shield className="h-5 w-5 text-success" />
                          )}
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {link.displayUrl}
                          </code>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {link.description}
                        </p>
                        <Badge 
                          variant={link.type === "malicious" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {link.risk}
                        </Badge>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground ml-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Analysis Panel */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Security Analysis</h2>
            
            {/* User Analysis Results */}
            {userAnalysis && (
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {userAnalysis.isLegitimate ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                    Your Link Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">URL:</h4>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted p-2 rounded flex-1">
                        {userAnalysis.url}
                      </code>
                      <Button 
                        onClick={() => copyToClipboard(userAnalysis.url)} 
                        variant="outline" 
                        size="icon"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${
                    userAnalysis.risk === "High" 
                      ? "bg-destructive/10 border border-destructive/20" 
                      : userAnalysis.risk === "Medium"
                      ? "bg-warning/10 border border-warning/20"
                      : "bg-success/10 border border-success/20"
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant={userAnalysis.risk === "High" ? "destructive" : "secondary"}
                      >
                        {userAnalysis.risk} Risk
                      </Badge>
                    </div>
                    <p className="text-sm font-medium mb-2">Verdict:</p>
                    <p className="text-sm">{userAnalysis.verdict}</p>
                  </div>

                  {userAnalysis.issues.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Issues Found ({userAnalysis.issues.length})
                      </h4>
                      <ul className="space-y-2">
                        {userAnalysis.issues.map((issue, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {userAnalysis.positives.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-success mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Positive Indicators ({userAnalysis.positives.length})
                      </h4>
                      <ul className="space-y-2">
                        {userAnalysis.positives.map((positive, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            {positive}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Example Analysis */}
            {selectedLink ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {currentLink?.type === "malicious" ? (
                      <XCircle className="h-5 w-5 text-destructive" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-success" />
                    )}
                    Example Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">URL:</h4>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted p-2 rounded flex-1">
                        {currentLink?.actualUrl}
                      </code>
                      <Button 
                        onClick={() => copyToClipboard(currentLink?.actualUrl || "")} 
                        variant="outline" 
                        size="icon"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Description:</h4>
                    <p className="text-sm text-muted-foreground">
                      {currentLink?.description}
                    </p>
                  </div>

                  {!showAnalysis && (
                    <Button onClick={handleShowAnalysis} className="w-full">
                      Show Security Analysis
                    </Button>
                  )}

                  {showAnalysis && (
                    <div className="space-y-4">
                      {currentLink?.type === "malicious" ? (
                        <div>
                          <h4 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Red Flags Detected
                          </h4>
                          <ul className="space-y-2">
                            {currentLink.redFlags.map((flag, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                                {flag}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 p-3 bg-destructive/10 rounded-lg">
                            <p className="text-sm font-medium text-destructive mb-1">
                              Legitimate alternative:
                            </p>
                            <code className="text-sm">{currentLink.legitimateVersion}</code>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-semibold text-success mb-3 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Positive Indicators
                          </h4>
                          <ul className="space-y-2">
                            {currentLink.positiveIndicators?.map((indicator, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                                {indicator}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className={`p-4 rounded-lg ${
                        currentLink?.type === "malicious" 
                          ? "bg-destructive/10 border border-destructive/20" 
                          : "bg-success/10 border border-success/20"
                      }`}>
                        <h4 className={`font-semibold mb-2 ${
                          currentLink?.type === "malicious" ? "text-destructive" : "text-success"
                        }`}>
                          Verdict: {currentLink?.risk}
                        </h4>
                        <p className="text-sm">
                          {currentLink?.type === "malicious" 
                            ? "This link appears to be malicious. Do not click on it or enter any personal information."
                            : "This link appears to be legitimate and safe to visit."
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : !userAnalysis ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analyze a Link</h3>
                  <p className="text-muted-foreground">
                    Enter a URL above or select an example link to see a detailed security analysis.
                  </p>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              URL Verification Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-destructive mb-3">Red Flags to Watch For:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    Misspelled domain names (amaz0n.com, payp4l.com)
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    HTTP instead of HTTPS
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    Urgent or threatening URL paths
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    Suspicious subdomains or hyphenated domains
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-success mb-3">Good Signs to Look For:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Correct spelling of well-known brands
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    HTTPS encryption (padlock icon)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Official domain extensions (.com, .org, .gov)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Consistent URL structure for known sites
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LinkVerification;