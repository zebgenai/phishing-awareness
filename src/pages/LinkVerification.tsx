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

    try {
      // Normalize URL
      let normalizedUrl = url.trim();
      if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
        normalizedUrl = `https://${normalizedUrl}`;
      }

      // Protocol check
      if (!normalizedUrl.startsWith('https://')) {
        issues.push("Uses HTTP instead of HTTPS (not encrypted)");
        isLegitimate = false;
        risk = "High";
      } else {
        positives.push("Uses HTTPS encryption");
      }

      const urlObj = new URL(normalizedUrl);
      const domain = urlObj.hostname.toLowerCase();

      // IP address check (highest priority)
      if (/^\d+\.\d+\.\d+\.\d+$/.test(domain)) {
        issues.push("Uses IP address instead of domain name - highly suspicious");
        isLegitimate = false;
        risk = "High";
      }

      // Suspicious domains patterns
      const suspiciousDomains = [
        'login-', 'secure-', 'verify-', 'account-', 'support-', 'help-',
        'update-', 'confirm-', 'alert-', 'warning-', 'security-'
      ];
      
      if (suspiciousDomains.some(pattern => domain.includes(pattern))) {
        issues.push("Domain contains suspicious prefixes commonly used in phishing");
        isLegitimate = false;
        risk = "High";
      }

      // Character substitution patterns (typosquatting)
      const brandSubstitutions = [
        { original: 'google', patterns: ['g00gle', 'g0ogle', 'googIe', 'goog1e'] },
        { original: 'paypal', patterns: ['payp4l', 'paypaI', 'p4ypal', 'paypaL'] },
        { original: 'amazon', patterns: ['amaz0n', 'amazom', 'amazone', 'am4zon'] },
        { original: 'microsoft', patterns: ['micr0soft', 'microsooft', 'microsofl'] },
        { original: 'facebook', patterns: ['facebo0k', 'facebok', 'faceb00k'] },
        { original: 'apple', patterns: ['appIe', 'app1e', 'appl3'] }
      ];

      brandSubstitutions.forEach(brand => {
        brand.patterns.forEach(pattern => {
          if (domain.includes(pattern)) {
            issues.push(`Suspicious character substitution detected - '${pattern}' mimics '${brand.original}'`);
            isLegitimate = false;
            risk = "High";
          }
        });
      });

      // Known legitimate domains
      const knownDomains = [
        'google.com', 'facebook.com', 'amazon.com', 'paypal.com', 
        'microsoft.com', 'apple.com', 'github.com', 'linkedin.com',
        'twitter.com', 'instagram.com', 'youtube.com', 'gmail.com'
      ];
      
      const isKnownLegit = knownDomains.some(legitDomain => 
        domain === legitDomain || domain.endsWith(`.${legitDomain}`)
      );

      if (isKnownLegit) {
        positives.push("Matches verified legitimate domain");
      }

      // Suspicious TLDs
      const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.xyz', '.click', '.download'];
      if (suspiciousTlds.some(tld => domain.endsWith(tld))) {
        issues.push("Uses suspicious top-level domain commonly associated with malicious sites");
        risk = risk === "Low" ? "Medium" : "High";
      }

      // URL shorteners (medium risk)
      const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'short.link'];
      if (shorteners.some(shortener => domain.includes(shortener))) {
        issues.push("URL shortener detected - destination is hidden");
        risk = risk === "Low" ? "Medium" : risk;
      }

      // Excessive hyphens or dots
      const hyphenCount = (domain.match(/-/g) || []).length;
      const dotCount = (domain.match(/\./g) || []).length;
      
      if (hyphenCount > 2) {
        issues.push("Excessive hyphens in domain - may be attempting to mimic legitimate sites");
        risk = risk === "Low" ? "Medium" : risk;
      }

      if (dotCount > 3) {
        issues.push("Excessive subdomains detected");
        risk = risk === "Low" ? "Medium" : risk;
      }

      // URL path analysis
      const path = urlObj.pathname.toLowerCase();
      const suspiciousKeywords = [
        'urgent', 'suspend', 'verify', 'confirm', 'update', 'secure', 
        'alert', 'warning', 'blocked', 'limited', 'expired', 'locked'
      ];
      
      const foundSuspiciousKeywords = suspiciousKeywords.filter(keyword => 
        path.includes(keyword) || urlObj.search.includes(keyword)
      );

      if (foundSuspiciousKeywords.length > 0) {
        issues.push(`Contains urgency-inducing keywords: ${foundSuspiciousKeywords.join(', ')}`);
        if (foundSuspiciousKeywords.some(kw => ['suspend', 'urgent', 'blocked', 'expired'].includes(kw))) {
          isLegitimate = false;
          risk = "High";
        } else {
          risk = risk === "Low" ? "Medium" : risk;
        }
      }

      // Domain length check
      if (domain.length > 30) {
        issues.push("Unusually long domain name");
        risk = risk === "Low" ? "Medium" : risk;
      }

      // Check for common phishing patterns in full URL
      const phishingPatterns = [
        /login.*[0-9]/, /secure.*[0-9]/, /account.*verify/, 
        /update.*payment/, /confirm.*identity/
      ];
      
      if (phishingPatterns.some(pattern => normalizedUrl.match(pattern))) {
        issues.push("URL structure matches common phishing patterns");
        isLegitimate = false;
        risk = "High";
      }

      // Final risk assessment
      if (issues.length === 0) {
        positives.push("No obvious red flags detected");
        positives.push("URL structure appears normal");
      }

      // Adjust final legitimacy based on issues found
      if (issues.some(issue => issue.includes('IP address') || issue.includes('character substitution') || issue.includes('phishing patterns'))) {
        isLegitimate = false;
        risk = "High";
      } else if (issues.length > 2) {
        isLegitimate = false;
        risk = "High";
      } else if (issues.length > 0) {
        risk = "Medium";
      }

      const verdict = isLegitimate && risk === "Low" 
        ? "✅ This link appears safe to visit" 
        : risk === "Medium"
        ? "⚠️ Exercise caution - this link has concerning features"
        : "❌ This link appears malicious - do not visit";

      return {
        url: normalizedUrl,
        isLegitimate: isLegitimate && risk === "Low",
        risk,
        issues,
        positives,
        verdict
      };
    } catch (error) {
      return {
        url,
        isLegitimate: false,
        risk: "High",
        issues: ["Invalid URL format"],
        positives: [],
        verdict: "❌ Invalid URL - cannot analyze"
      };
    }
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
            Learn to identify malicious links and verify authentic ones.
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
                  <p className="text-muted-foreground">
                    Select an example link above to see a detailed security analysis.
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