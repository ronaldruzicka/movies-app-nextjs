import { SignInButton } from './sign-in-button';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="border-border/50 bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 border-primary/20 rounded-lg border p-2">
              {/* <Film className="h-6 w-6 text-primary" /> */}
            </div>
            <span className="text-foreground text-xl font-bold">CineMax</span>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden items-center gap-6 md:flex">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Home
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Movies
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              TV Shows
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              My List
            </Button>
          </nav>

          {/* Search and User */}
          <div className="flex items-center gap-4">
            {/* Search - Hidden on small screens */}
            <div className="relative hidden sm:block">
              {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-64 bg-input border-border focus:border-primary focus:ring-primary/20"
              /> */}
            </div>

            {/* User actions */}
            <SignInButton />

            {/* Mobile menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              {/* <Menu className="h-5 w-5" /> */}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="mt-4 sm:hidden">
          <div className="relative">
            {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-full bg-input border-border focus:border-primary focus:ring-primary/20"
            /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
