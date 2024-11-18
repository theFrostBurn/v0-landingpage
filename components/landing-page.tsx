'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, Code2, Clock, Users, Rocket, DollarSign, Book, Brain, Workflow, Shield } from 'lucide-react'
import { useState, useRef, useEffect } from "react"

// Custom hook for scroll-based animations
function useScrollAnimation(direction: 'left' | 'right') {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.classList.remove('animate-out');
          } else {
            entry.target.classList.remove('animate-in');
            entry.target.classList.add('animate-out');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (ref.current) {
      try {
        observer.observe(ref.current);
      } catch (error) {
        console.error("Error in useScrollAnimation:", error);
        alert("There was an issue with the page animation. Please refresh the page.");
      }
    }

    return () => {
      if (ref.current) {
        try {
          observer.unobserve(ref.current);
        } catch (error) {
          console.error("Error in useScrollAnimation cleanup:", error);
        }
      }
    };
  }, []);

  return [ref, direction];
}

// Typing animation component
function TypingAnimation({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [text]);

  // 타이핑이 완료되면 전체 텍스트를 표시
  return (
    <span className={className}>
      {isTypingComplete ? text : displayText}
      {!isTypingComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}

export function LandingPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Email submitted:", email)
      alert("Your email has been submitted successfully!")
    } catch (error) {
      console.error("Error submitting email:", error)
      alert("There was an error submitting your email. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Refs for sections
  const [heroRef, heroDirection] = useScrollAnimation('left');
  const [learnRef, learnDirection] = useScrollAnimation('left');
  const [processRef, processDirection] = useScrollAnimation('right');
  const [featuresRef, featuresDirection] = useScrollAnimation('left');
  const [testimonialsRef, testimonialsDirection] = useScrollAnimation('right');
  const [pricingRef, pricingDirection] = useScrollAnimation('left');
  const [ctaRef, ctaDirection] = useScrollAnimation('right');

  return (
    <div className="flex flex-col min-h-screen">
      <style jsx global>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-in {
          animation: fadeInLeft 1s ease-out forwards;
        }
        .animate-out {
          animation: fadeInRight 1s ease-out forwards reverse;
        }
        .animate-in[data-direction="right"],
        .animate-out[data-direction="left"] {
          animation-name: fadeInRight;
        }
        .animate-out[data-direction="right"],
        .animate-in[data-direction="left"] {
          animation-name: fadeInLeft;
        }
      `}</style>

      {/* Hero Section */}
      <header ref={heroRef} data-direction={heroDirection} className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-16 md:pt-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
              <TypingAnimation text="🚀 사전 예약 50% 할인" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              <TypingAnimation text="아이디어를 서비스로 바꾸는 비밀" />
              <TypingAnimation text=" – 커서 바이블" className="text-primary" />
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              <TypingAnimation text="복잡한 코딩 없이도 웹/앱을 만들 수 있습니다." />
              <br />
              <TypingAnimation text="AI 코드 에디터 Cursor로 여러분의 아이디어를 실현하세요." />
            </p>
            <div className="w-full max-w-sm space-y-2">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  placeholder="이메일을 입력하세요"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "제출 중..." : "예약하기"}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                50% 할인된 가격으로 구매하실 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* What You'll Learn Section */}
      <section ref={learnRef} data-direction={learnDirection} className="container px-4 py-16 md:px-6 md:py-24">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">커서 바이블에서 배우는 것들</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="animate-in" data-direction="left">
            <CardContent className="flex items-start gap-4 p-6">
              <Book className="size-8 text-primary shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Cursor와 친해지기</h3>
                <p className="text-muted-foreground">복잡해 보이던 코드 작성도 이제 두렵지 않아요! Cursor의 기본 사용법을 익히며, AI와 함께 빠르게 작업할 수 있어요.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-in" data-direction="right">
            <CardContent className="flex items-start gap-4 p-6">
              <Workflow className="size-8 text-primary shrink-0" />
              <div>
                <h3 className="font-bold mb-2">효율적인 작업 흐름 만들기</h3>
                <p className="text-muted-foreground">체계적 디버깅을 분리해서 시간을 절약하고, 더 꼼꼼하게 프로젝트를 진행하는 법을 배워요.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-in" data-direction="left">
            <CardContent className="flex items-start gap-4 p-6">
              <Brain className="size-8 text-primary shrink-0" />
              <div>
                <h3 className="font-bold mb-2">AI에게 똑똑하게 질문하기</h3>
                <p className="text-muted-foreground">AI를 제대로 활용하려면 명령을 잘 작성하는 법도 중요해요. Cursor에서 AI에게 효과적으로 질문하고 원하는 답을 얻는 방법을 익혀요.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-in" data-direction="right">
            <CardContent className="flex items-start gap-4 p-6">
              <Shield className="size-8 text-primary shrink-0" />
              <div>
                <h3 className="font-bold mb-2">오류 없는 프로젝트 관리</h3>
                <p className="text-muted-foreground">Requirements.md 기반을 통해 프로젝트의 일관성을 유지하고, 체계적인 관리 방법을 더 깊게 배워요.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Flow Section */}
      <section ref={processRef} data-direction={processDirection} className="bg-muted py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Cursor로 아이디어를 현실로</h2>
          <div className="grid gap-8 md:grid-cols-5">
            <div className="flex flex-col items-center text-center gap-4 animate-in" data-direction="left">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="size-6 text-primary" />
              </div>
              <h3 className="font-bold">아이디어 구상</h3>
            </div>
            <div className="flex flex-col items-center text-center gap-4 animate-in" data-direction="right">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Code2 className="size-6 text-primary" />
              </div>
              <h3 className="font-bold">Cursor로 코드 작성</h3>
            </div>
            <div className="flex flex-col items-center text-center gap-4 animate-in" data-direction="left">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="size-6 text-primary" />
              </div>
              <h3 className="font-bold">AI와 협업</h3>
            </div>
            <div className="flex flex-col items-center text-center gap-4 animate-in" data-direction="right">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="size-6 text-primary" />
              </div>
              <h3 className="font-bold">디버깅 및 최적화</h3>
            </div>
            <div className="flex flex-col items-center text-center gap-4 animate-in" data-direction="left">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Rocket className="size-6 text-primary" />
              </div>
              <h3 className="font-bold">완성된 프로젝트</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} data-direction={featuresDirection} className="container px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="animate-in" data-direction="left">
            <CardContent className="flex flex-col items-center gap-4 p-6">
              <Code2 className="size-12 text-primary" />
              <h3 className="text-xl font-bold">기술적 장벽 해소</h3>
              <p className="text-center text-muted-foreground">
                복잡한 코딩 없이 쉽게 시작할 수 있습니다.
              </p>
            </CardContent>
          </Card>
          <Card className="animate-in" data-direction="right">
            <CardContent className="flex flex-col items-center gap-4 p-6">
              <Clock className="size-12 text-primary" />
              <h3 className="text-xl font-bold">시간 관리</h3>
              <p className="text-center text-muted-foreground">
                효율적인 시간 관리 방법을 제공합니다.
              </p>
            </CardContent>
          </Card>
          <Card className="animate-in" data-direction="left">
            <CardContent className="flex flex-col items-center gap-4 p-6">
              <Sparkles className="size-12 text-primary" />
              <h3 className="text-xl font-bold">쉬운 도구</h3>
              <p className="text-center text-muted-foreground">
                간단하게 앱이나 웹사이트를 만들 수 있습니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} data-direction={testimonialsDirection} className="bg-muted py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">사용자 후기</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="animate-in" data-direction="left">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback>L</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">Lucy, 28세</div>
                    <div className="text-sm text-muted-foreground">외국계 기업 사무직</div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "코딩과 전혀 관련 없는 업무를 하고 평생 코딩의 '코' 자도 몰랐는데, 커서 바이블을 읽고 프로젝트를 만들어보니 정말 쉽고 간단하게 웹사이트를 만들 수 있었어요!
                  개발에 대한 두려움이 사라졌습니다."
                </p>
              </CardContent>
            </Card>
            <Card className="animate-in" data-direction="right">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback>D</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">David, 32세</div>
                    <div className="text-sm text-muted-foreground">백엔드 개발자</div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "백엔드 개발자라서 프론트엔드 작업에는 늘 어려움이 있었는데,
                  커서 바이블 덕분에 제가 상상하는 디자인을 구현할 수 있게 됐어요.
                  이제는 AI를 통해 UI/UX 개발도 더 자신 있게 할 수 있습니다."
                </p>
              </CardContent>
            </Card>
            <Card className="animate-in" data-direction="left">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">Sophia, 25세</div>
                    <div className="text-sm text-muted-foreground">프리랜서 디자이너</div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "디자인 작업을 주로 하다 보니 개발 쪽은 손도 못 대고 있었어요.
                  하지만 커서 바이블을 통해 AI 코드 에디터를 활용하는 방법을 배우니,
                  제 디자인을 바로 코드로 전환할 수 있게 되고,
                  직접 웹페이지를 만들 수 있게 된 것이 큰 도움이 됐습니다!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} data-direction={pricingDirection} className="container px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center animate-in" data-direction="left">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            특별 할인 프로모션
          </h2>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold line-through">100,000원</span>
              <span className="text-5xl font-bold text-primary">50,000원</span>
            </div>
            <p className="text-muted-foreground">
              한정된 시간 동안만 제공되는 혜택이니 서둘러 예약하세요!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} data-direction={ctaDirection} className="border-t bg-muted py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center animate-in" data-direction="right">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              지금 바로 시작하세요
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              이메일을 입력하고 커서 바이블을 50% 할인된 가격으로 만나보세요.
            </p>
            <div className="w-full max-w-sm space-y-2">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  placeholder="이메일을 입력하세요"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "제출 중..." : "지금 예약하기"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row md:py-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 커서 바이블. All rights reserved.
          </p>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            문의사항: support@cursorbible.com
          </p>
        </div>
      </footer>
    </div>
  )
}