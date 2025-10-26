import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  DollarSign,
  Zap,
  Target,
  ChefHat,
  LineChart
} from 'lucide-react'
import { stackServerApp } from '@/stack/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  // Check if user is authenticated
  const user = await stackServerApp.getUser();
  return (
    <div className="min-h-screen">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <span className="text-xl font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ServeAI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link href="/overview">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/handler/sign-in">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/handler/sign-up">
                    <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
            <Sparkles className="w-3 h-3 mr-2" />
            AI-Powered Restaurant Analytics
          </Badge>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight">
            Turn Your Menu Data Into{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              Pure Profit
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Restaurant owners waste <span className="font-semibold text-foreground">thousands monthly</span> on underperforming menu items.
            ServeAI analyzes your POS data and shows you exactly what to promote, remove, and reprice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/overview">
              <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg hover:shadow-xl transition-all">
                View Live Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 hover:bg-secondary">
              See How It Works
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>5-minute setup</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                30%
              </CardTitle>
              <CardDescription className="text-base">
                Average profit increase in first 3 months
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <DollarSign className="h-7 w-7 text-primary" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                $8.5K
              </CardTitle>
              <CardDescription className="text-base">
                Average monthly savings from reduced waste
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                5 min
              </CardTitle>
              <CardDescription className="text-base">
                Time to get your first AI recommendations
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Problem Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">The Problem</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Running a restaurant blindfolded
            </h2>
            <p className="text-xl text-muted-foreground">
              You're working 80-hour weeks but still don't know which items actually make money
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
                <CardTitle>30% of your menu generates almost no revenue</CardTitle>
                <CardDescription className="text-base">
                  Yet you keep buying ingredients that spoil, wasting thousands monthly on items nobody orders
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
                <CardTitle>You're stuck guessing on pricing</CardTitle>
                <CardDescription className="text-base">
                  Without data, you either leave money on the table or price yourself out of the market
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
                <CardTitle>Analytics software costs a fortune</CardTitle>
                <CardDescription className="text-base">
                  Enterprise solutions charge thousands per month—money you don't have as a small restaurant
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
                <CardTitle>Razor-thin margins despite working nonstop</CardTitle>
                <CardDescription className="text-base">
                  You know something needs to change, but you don't have time to analyze spreadsheets
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              From chaos to clarity in <span className="text-primary">3 simple steps</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your data, get instant insights, and watch your profits grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
                  <BarChart3 className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary/20 text-primary border-primary/30">Step 1</Badge>
                </div>
                <CardTitle className="text-2xl">Upload Your Data</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Connect your POS system (Square, Toast, Clover) or upload a CSV.
                  Works with any digital point-of-sale system.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
                  <Sparkles className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary/20 text-primary border-primary/30">Step 2</Badge>
                </div>
                <CardTitle className="text-2xl">AI Analyzes Everything</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Our AI crunches your numbers, identifies patterns, and compares against
                  local market data to find hidden opportunities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary/20 text-primary border-primary/30">Step 3</Badge>
                </div>
                <CardTitle className="text-2xl">Get Clear Actions</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Receive specific recommendations: remove underperformers, promote
                  winners, adjust prices, and create profitable bundles.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to maximize profits
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <LineChart className="h-10 w-10 text-primary mb-3" />
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>
                  Track daily, weekly, and monthly trends. See which days and items drive the most revenue.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <AlertTriangle className="h-10 w-10 text-primary mb-3" />
                <CardTitle>Waste Detection</CardTitle>
                <CardDescription>
                  Identify items with high spoilage rates and low sales before they drain your profits.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <DollarSign className="h-10 w-10 text-primary mb-3" />
                <CardTitle>Smart Pricing</CardTitle>
                <CardDescription>
                  Get data-driven price suggestions based on costs, competition, and local market intelligence.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-3" />
                <CardTitle>Margin Analysis</CardTitle>
                <CardDescription>
                  See profit margins by item and category. Focus on what actually makes you money.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lightbulb className="h-10 w-10 text-primary mb-3" />
                <CardTitle>Bundle Suggestions</CardTitle>
                <CardDescription>
                  AI-powered combo recommendations that increase average ticket size and move inventory.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <ChefHat className="h-10 w-10 text-primary mb-3" />
                <CardTitle>Menu Optimization</CardTitle>
                <CardDescription>
                  Remove deadweight items and double down on your best performers with confidence.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

            <CardHeader className="text-center relative z-10 pt-12">
              <CardTitle className="text-4xl md:text-5xl font-bold mb-4">
                Ready to stop the guesswork?
              </CardTitle>
              <CardDescription className="text-primary-foreground/90 text-xl max-w-2xl mx-auto">
                Join independent restaurant owners who are making data-driven decisions and increasing profits by 30% or more.
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center pb-12 relative z-10">
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-12 py-7 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="mt-6 text-primary-foreground/80">
                No credit card required • 5-minute setup • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/30 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <span className="text-lg font-bold text-primary-foreground">S</span>
              </div>
              <span className="font-bold text-lg">ServeAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 ServeAI. Turning restaurant data into profit.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
