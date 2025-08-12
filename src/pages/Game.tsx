import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface Item {
  id: number;
  prompt: string;
  isPhish: boolean;
  reason: string;
  type: "url" | "email" | "message";
}

const SAMPLE_ITEMS: Item[] = [
  {
    id: 1,
    prompt: "login-g00gle.com/security",
    isPhish: true,
    reason: "Misspelled brand and hyphenated domain.",
    type: "url",
  },
  {
    id: 2,
    prompt: "accounts.google.com/signin",
    isPhish: false,
    reason: "Legitimate subdomain of google.com.",
    type: "url",
  },
  {
    id: 3,
    prompt: "Action required: Verify your payroll info now",
    isPhish: true,
    reason: "Urgency + sensitive request typical of phishing.",
    type: "email",
  },
  {
    id: 4,
    prompt: "Your GitHub Copilot trial ends next week",
    isPhish: false,
    reason: "Informational email with no suspicious ask.",
    type: "email",
  },
  {
    id: 5,
    prompt: "http://secure-paypal.com.login-check.ru",
    isPhish: true,
    reason: "Real brand in a deceptive multi-level domain.",
    type: "url",
  },
  {
    id: 6,
    prompt: "Delivery notice: your parcel arrives tomorrow",
    isPhish: false,
    reason: "Neutral message without credential ask.",
    type: "message",
  },
];

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const GAME_DURATION = 60; // seconds

const Game = () => {
  const [deck, setDeck] = useState<Item[]>(() => shuffle(SAMPLE_ITEMS).concat(shuffle(SAMPLE_ITEMS)));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [running, setRunning] = useState(false);

  const current = deck[index % deck.length];

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running]);

  const startGame = useCallback(() => {
    setDeck(shuffle(SAMPLE_ITEMS).concat(shuffle(SAMPLE_ITEMS)));
    setIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(GAME_DURATION);
    setRunning(true);
  }, []);

  const nextCard = () => setIndex((i) => i + 1);

  const handleChoice = (choiceIsPhish: boolean) => {
    if (!running) return;
    const correct = choiceIsPhish === current.isPhish;
    if (correct) {
      toast.success("Correct!", { description: current.reason });
      setScore((s) => s + 10 + streak);
      setStreak((s) => {
        const newS = s + 1;
        setBestStreak((b) => Math.max(b, newS));
        return newS;
      });
    } else {
      toast.error("Oops, that was " + (current.isPhish ? "phishing" : "safe") + ".", { description: current.reason });
      setStreak(0);
    }
    nextCard();
  };

  const progress = useMemo(() => (timeLeft / GAME_DURATION) * 100, [timeLeft]);

  const canonical = (typeof window !== "undefined" ? `${window.location.origin}/game` : "/game");

  return (
    <>
      <Helmet>
        <title>Phishing Awareness Game - PhishGuard</title>
        <meta name="description" content="Play an interactive phishing awareness game. Spot phishing attempts and improve your skills." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="bg-card border-b">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground">Phishing Awareness Game</h1>
          <p className="text-muted-foreground mt-2">Classify each prompt as Safe or Phish before the timer runs out. Learn the warning signs as you play.</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <section aria-labelledby="game-section">
          <Card>
            <CardHeader>
              <CardTitle id="game-section" className="flex items-center justify-between">
                <span>Spot the Phish</span>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div>Score: <span className="text-foreground font-semibold">{score}</span></div>
                  <div>Streak: <span className="text-foreground font-semibold">{streak}</span></div>
                  <div>Best: <span className="text-foreground font-semibold">{bestStreak}</span></div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Time left</span>
                  <span className="text-sm font-medium text-foreground">{timeLeft}s</span>
                </div>
                <Progress value={progress} aria-label="Time remaining" />
              </div>

              <div className="min-h-[130px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current?.id + String(index)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="p-5 rounded-md bg-accent"
                  >
                    <p className="text-sm uppercase tracking-wide text-muted-foreground mb-1">{current?.type}</p>
                    <p className="text-lg font-medium text-foreground break-words">{current?.prompt}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button variant="success" size="lg" onClick={() => handleChoice(false)} disabled={!running}>
                  Safe
                </Button>
                <Button variant="destructive" size="lg" onClick={() => handleChoice(true)} disabled={!running}>
                  Phish
                </Button>
              </div>

              {!running && (
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">Time's up! You scored <span className="text-foreground font-semibold">{score}</span> with a best streak of <span className="text-foreground font-semibold">{bestStreak}</span>.</p>
                  <Button variant="hero" size="lg" onClick={startGame}>Play Again</Button>
                </div>
              )}

              {running ? (
                <p className="text-xs text-muted-foreground text-center">Tip: Watch for misspellings, odd domains, urgency, and requests for credentials.</p>
              ) : (
                <div className="text-center">
                  <Button variant="hero" size="lg" onClick={startGame}>Start Game</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="mt-8" aria-labelledby="learn-more">
          <h2 id="learn-more" className="text-xl font-semibold text-foreground mb-2">How to get better</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Check the real domain and avoid clicking suspicious links.</li>
            <li>Be skeptical of urgent requests or prizes.</li>
            <li>Never share passwords or 2FA codes via email or chat.</li>
          </ul>
        </section>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Game",
            "name": "Phishing Awareness Game",
            "applicationCategory": "Educational",
            "description": "Interactive game to learn how to spot phishing attempts.",
            "author": { "@type": "Organization", "name": "PhishGuard" }
          })}
        </script>
      </main>
    </>
  );
};

export default Game;
