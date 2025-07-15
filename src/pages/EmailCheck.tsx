import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Eye,
  ExternalLink,
  Clock,
  User
} from "lucide-react";

const EmailCheck = () => {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const emailExamples = [
    {
      id: 1,
      type: "legitimate",
      subject: "Your Bank Statement is Ready",
      sender: "Bank of America <statements@bankofamerica.com>",
      content: `Dear John Smith,

Your monthly statement for account ending in ***1234 is now available in your online banking portal.

To view your statement:
1. Log in to your account at bankofamerica.com
2. Navigate to Statements & Documents
3. Select your account statement

If you have any questions about your statement, please contact us at 1-800-432-1000.

Best regards,
Bank of America Customer Service Team

This email was sent to johnsmith@email.com
Unsubscribe | Privacy Policy | Contact Us`,
      indicators: {
        positive: [
          "Uses your actual name",
          "Sent from legitimate bank domain",
          "No urgent action required",
          "No suspicious links",
          "Professional formatting",
          "Includes official contact information"
        ],
        negative: []
      }
    },
    {
      id: 2,
      type: "phishing",
      subject: "URGENT: Your Account Will Be Suspended!",
      sender: "security@bank0famerica.com",
      content: `Dear Valued Customer,

We have detected suspicious activity on your account. Your account will be SUSPENDED in 24 hours unless you verify your information immediately.

CLICK HERE TO VERIFY YOUR ACCOUNT NOW: http://bankofamerica-security.com/verify

You must provide:
- Full Social Security Number
- Credit Card Number and CVV
- Online Banking Password

Failure to verify will result in permanent account closure.

Act now to protect your account!

Bank Security Team`,
      indicators: {
        positive: [],
        negative: [
          "Generic greeting",
          "Urgent/threatening language",
          "Suspicious sender domain (0 instead of o)",
          "Requests sensitive information",
          "Suspicious external link",
          "Poor grammar and formatting",
          "Creates false urgency"
        ]
      }
    },
    {
      id: 3,
      type: "legitimate",
      subject: "Welcome to Amazon Prime",
      sender: "Amazon <no-reply@amazon.com>",
      content: `Hello Jane,

Welcome to Amazon Prime! Your membership is now active.

Your Prime benefits include:
• FREE Two-Day Shipping on eligible items
• Prime Video streaming
• Prime Music
• Exclusive deals and early access

Start shopping with Prime benefits at amazon.com

Thanks for being a Prime member!

The Amazon Prime Team

Amazon.com, Inc.
410 Terry Ave. North, Seattle, WA 98109-5210`,
      indicators: {
        positive: [
          "Personal greeting with name",
          "Legitimate Amazon domain",
          "No requests for personal information",
          "Professional appearance",
          "Company address included",
          "Clear call to action"
        ],
        negative: []
      }
    },
    {
      id: 4,
      type: "phishing",
      sender: "PayPal Security <security@paypaI.com>",
      subject: "Action Required: Verify Your PayPal Account",
      content: `Dear PayPal User,

We've noticed some unusual activity on your PayPal account. To protect your account, we've temporarily limited access.

To restore full access, please verify your account information by clicking the link below:

VERIFY YOUR ACCOUNT: http://paypal-verification.secure-site.com

Please provide the following information:
- Full Name and Address
- Credit Card Details
- Social Security Number
- PayPal Login Credentials

This verification must be completed within 48 hours or your account will be permanently suspended.

If you don't complete this verification, you won't be able to access your PayPal account or funds.

PayPal Security Team`,
      indicators: {
        positive: [],
        negative: [
          "Generic greeting",
          "Creates urgency with time limit",
          "Suspicious domain (capital I instead of l in PayPal)",
          "Requests sensitive information",
          "Threatening language about account suspension",
          "External verification link",
          "No official PayPal branding"
        ]
      }
    },
    {
      id: 5,
      type: "phishing",
      subject: "You've Won $1,000,000 in the International Lottery!",
      sender: "lottery@winnings-claim.org",
      content: `Congratulations!!!

You have been selected as the winner of $1,000,000 USD in the International Email Lottery Program!

Your winning numbers are: 7-14-21-28-35-42
Reference Number: INT/8302118308/02

To claim your prize, you must:
1. Reply with your full name, address, and phone number
2. Pay the processing fee of $500 via Western Union
3. Provide a copy of your passport or driver's license

IMPORTANT: You have only 72 hours to claim your prize or it will be forfeited!

Contact our claims agent immediately:
Email: claims@lottery-winnings.biz
Phone: +234-801-234-5678

Congratulations again!
International Lottery Commission`,
      indicators: {
        positive: [],
        negative: [
          "Too good to be true offer",
          "Requests upfront payment",
          "Urgent time limit",
          "Requests personal documents",
          "International phone number (+234 is Nigeria)",
          "Suspicious email domains",
          "No legitimate lottery contact information",
          "Multiple spelling and grammar errors"
        ]
      }
    },
    {
      id: 6,
      type: "legitimate",
      subject: "Password Reset Confirmation - Microsoft Account",
      sender: "Microsoft account team <account-security-noreply@accountprotection.microsoft.com>",
      content: `Hi Sarah,

Your password for your Microsoft account sarah.johnson@email.com was successfully changed on December 14, 2024 at 2:30 PM PST.

If this was you, you can safely ignore this email.

If this wasn't you, your account may be compromised:
• Sign in to your account and change your password immediately
• Review your recent activity
• Enable two-factor authentication

Get help: aka.ms/accounthelp

Thanks,
The Microsoft account team

Microsoft Corporation
One Microsoft Way, Redmond, WA 98052`,
      indicators: {
        positive: [
          "Official Microsoft domain",
          "Specific account email mentioned",
          "Detailed timestamp provided",
          "Clear next steps if compromised",
          "Official Microsoft help link",
          "Company address included",
          "No immediate action required"
        ],
        negative: []
      }
    },
    {
      id: 7,
      type: "phishing",
      subject: "Apple ID Locked - Immediate Action Required",
      sender: "Apple Support <noreply@apple-security.com>",
      content: `Dear Apple Customer,

Your Apple ID has been locked due to suspicious sign-in attempts from an unknown device.

Device Information:
- Location: Russia, Moscow
- IP Address: 192.168.1.1
- Time: Today, 3:42 AM

IMMEDIATE ACTION REQUIRED:
Click here to unlock your Apple ID: http://apple-id-unlock.secure-verify.net

You will need to provide:
• Apple ID username and password
• Credit card information on file
• Answers to security questions

WARNING: Failure to verify within 24 hours will result in permanent account deletion and loss of all purchased content.

Do not delay - secure your account now!

Apple ID Support Team
Apple Inc.`,
      indicators: {
        positive: [],
        negative: [
          "Generic greeting",
          "Suspicious sender domain (not apple.com)",
          "Creates extreme urgency",
          "Threats of permanent deletion",
          "Requests multiple sensitive details",
          "Suspicious verification URL",
          "Fear-based language",
          "Immediate action demanded"
        ]
      }
    },
    {
      id: 8,
      type: "phishing",
      subject: "Netflix - Update Payment Method",
      sender: "Netflix Billing <billing@netfIix.com>",
      content: `Hello,

We were unable to process your monthly payment for your Netflix subscription.

Your account will be suspended in 2 days if payment is not updated.

Update Payment Method: http://netflix-billing-update.com/account

Please log in with your Netflix credentials and update your payment information to continue enjoying Netflix.

This is an automated message. Please do not reply to this email.

Netflix Customer Service`,
      indicators: {
        positive: [],
        negative: [
          "Suspicious domain (capital I instead of l in Netflix)",
          "Generic greeting (no name)",
          "Creates urgency with deadline",
          "External payment update link",
          "Requests login credentials",
          "No Netflix branding or official footer",
          "Automated message claim to avoid replies"
        ]
      }
    },
    {
      id: 9,
      type: "legitimate",
      subject: "Your Amazon Order Has Shipped",
      sender: "Amazon.com <ship-confirm@amazon.com>",
      content: `Hello Jessica,

Your order has shipped!

Order #: 114-3456789-1234567
Shipped on: December 14, 2024

Items in this shipment:
• Echo Dot (5th Gen) - Charcoal
• Quantity: 1

Shipping Details:
Carrier: UPS
Tracking number: 1Z999AA1234567890
Estimated delivery: December 16, 2024

Track your package: Go to Your Orders to track your package

If you need to return an item, visit our Returns Center.

Thanks for shopping with us!
Amazon.com

Amazon.com, Inc. | 410 Terry Ave. North, Seattle, WA 98109-5210`,
      indicators: {
        positive: [
          "Personal greeting with customer name",
          "Official Amazon domain and subdomain",
          "Specific order number and details",
          "Legitimate tracking information",
          "Professional formatting",
          "Official Amazon branding and address",
          "No requests for personal information"
        ],
        negative: []
      }
    },
    {
      id: 10,
      type: "phishing",
      subject: "IRS Tax Refund Notification",
      sender: "Internal Revenue Service <refund@irs-gov.net>",
      content: `OFFICIAL NOTICE

Dear Taxpayer,

The Internal Revenue Service has processed your tax return and determined you are eligible for a refund of $2,847.

To receive your refund via direct deposit, you must verify your information within 5 business days.

CLICK HERE TO CLAIM REFUND: http://irs-refund-processing.com/claim

Required Information:
- Social Security Number
- Bank Account Number and Routing Number
- Driver's License Number
- Previous Year's Tax Return (upload PDF)

Failure to respond within 5 days will result in your refund being sent to the U.S. Treasury General Fund.

Internal Revenue Service
Department of Treasury`,
      indicators: {
        positive: [],
        negative: [
          "IRS doesn't initiate contact via email",
          "Suspicious domain (.net instead of .gov)",
          "Requests sensitive financial information",
          "External claiming website",
          "Creates urgency with deadline",
          "Generic taxpayer greeting",
          "Threat of losing refund",
          "Asks for multiple forms of ID"
        ]
      }
    }
  ];

  const handleEmailSelect = (emailId: number) => {
    setSelectedEmail(emailId);
    setShowAnalysis(false);
  };

  const handleShowAnalysis = () => {
    setShowAnalysis(true);
  };

  const currentEmail = emailExamples.find(email => email.id === selectedEmail);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-glow blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Mail className="h-16 w-16 text-primary animate-pulse-security" />
                <div className="absolute inset-0 h-16 w-16 bg-primary/20 rounded-full blur-xl animate-glow"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
              Real vs Fake <span className="gradient-text">Email Examples</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{animationDelay: "0.2s"}}>
              Learn to identify phishing emails by examining real examples side by side with legitimate communications.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Email Examples</h2>
            <div className="space-y-4">
              {emailExamples.map((email) => (
                <Card 
                  key={email.id}
                  className={`cursor-pointer transition-all duration-300 hover-lift group ${
                    selectedEmail === email.id 
                      ? 'shadow-elevated border-primary bg-primary/5 animate-glow' 
                      : 'shadow-card hover:shadow-elevated hover-glow'
                  }`}
                  onClick={() => handleEmailSelect(email.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge 
                        variant={email.type === 'legitimate' ? 'default' : 'destructive'}
                        className="mb-2"
                      >
                        {email.type === 'legitimate' ? (
                          <><CheckCircle className="h-3 w-3 mr-1" /> Legitimate</>
                        ) : (
                          <><AlertTriangle className="h-3 w-3 mr-1" /> Phishing</>
                        )}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {email.subject}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      From: {email.sender}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          
          <div className="lg:col-span-2">
            {selectedEmail ? (
              <div className="space-y-6">
                
                <Card className="shadow-elevated hover-glow bg-gradient-card border-0 animate-fade-in">
                  <CardHeader className="border-b bg-muted/30 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary" />
                        <span className="font-medium">Email Preview</span>
                      </div>
                      <Badge 
                        variant={currentEmail?.type === 'legitimate' ? 'default' : 'destructive'}
                      >
                        {currentEmail?.type === 'legitimate' ? (
                          <><CheckCircle className="h-3 w-3 mr-1" /> Legitimate</>
                        ) : (
                          <><AlertTriangle className="h-3 w-3 mr-1" /> Phishing</>
                        )}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <User className="h-4 w-4" />
                          From:
                        </div>
                        <p className="font-medium">{currentEmail?.sender}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Mail className="h-4 w-4" />
                          Subject:
                        </div>
                        <p className="font-medium">{currentEmail?.subject}</p>
                      </div>
                      <div className="border-t pt-4">
                        <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-mono">
                          {currentEmail?.content}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                
                <div className="text-center">
                  <Button 
                    onClick={handleShowAnalysis}
                    variant={showAnalysis ? "secondary" : "default"}
                    size="lg"
                  >
                    <Eye className="h-5 w-5" />
                    {showAnalysis ? "Hide Analysis" : "Show Analysis"}
                  </Button>
                </div>

                
                {showAnalysis && currentEmail && (
                  <div className="animate-fade-in">
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary" />
                          Security Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        
                        {currentEmail.indicators.positive.length > 0 && (
                          <div>
                            <h3 className="font-semibold text-success mb-3 flex items-center gap-2">
                              <CheckCircle className="h-5 w-5" />
                              Positive Security Indicators
                            </h3>
                            <ul className="space-y-2">
                              {currentEmail.indicators.positive.map((indicator, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                                  {indicator}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        
                        {currentEmail.indicators.negative.length > 0 && (
                          <div>
                            <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5" />
                              Red Flags & Warning Signs
                            </h3>
                            <ul className="space-y-2">
                              {currentEmail.indicators.negative.map((indicator, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                                  {indicator}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        
                        <div className={`p-4 rounded-lg border ${
                          currentEmail.type === 'legitimate' 
                            ? 'bg-success/10 border-success/20' 
                            : 'bg-destructive/10 border-destructive/20'
                        }`}>
                          <h3 className={`font-semibold mb-2 ${
                            currentEmail.type === 'legitimate' ? 'text-success' : 'text-destructive'
                          }`}>
                            Verdict: {currentEmail.type === 'legitimate' ? 'Safe to Trust' : 'Phishing Attempt'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {currentEmail.type === 'legitimate' 
                              ? 'This email appears to be legitimate based on multiple positive security indicators.'
                              : 'This email shows multiple red flags indicating it is likely a phishing attempt. Do not click links or provide information.'
                            }
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            ) : (
              <Card className="shadow-card h-64 flex items-center justify-center">
                <CardContent className="text-center">
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Select an email from the list to view and analyze it.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailCheck;