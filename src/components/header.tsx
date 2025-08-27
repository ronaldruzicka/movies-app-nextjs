import { AccountDropdown } from './account-dropdown';
import { SignInButton } from './sign-in-button';
import { ThemeToggle } from './theme/theme-toggle';
import { Button } from './ui/button';

type Props = {
  avatar: string | undefined;
  username: string | undefined;
};

export function Header({ avatar, username }: Props) {
  return (
    <header className="border-border/50 bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="border-primary/20 bg-primary/10 rounded-lg border p-2">
              {/* <Film className="h-6 w-6 text-primary" /> */}
            </div>
            <span className="text-foreground text-xl font-bold">Movio</span>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden items-center gap-6 md:flex">
            <Button className="text-foreground hover:text-primary" variant="ghost">
              Home
            </Button>
            <Button className="text-foreground hover:text-primary" variant="ghost">
              Movies
            </Button>
            <Button className="text-foreground hover:text-primary" variant="ghost">
              TV Shows
            </Button>
            <Button className="text-foreground hover:text-primary" variant="ghost">
              My List
            </Button>
          </nav>

          {/* Search and User */}
          <div className="flex items-center gap-4">
            {/* User actions */}
            {username ? <AccountDropdown avatar={avatar} username={username} /> : <SignInButton />}
            {/* Mobile menu */}
            <Button className="md:hidden" size="sm" variant="ghost">
              {/* <Menu className="h-5 w-5" /> */}
            </Button>

            <ThemeToggle />
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
