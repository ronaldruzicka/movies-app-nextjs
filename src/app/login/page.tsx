import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { loginAction } from '@/features/auth/actions/login.action';

export default function SignIn() {
  return (
    <div className="flex justify-center pt-10">
      <div className="flex flex-col items-center gap-6 text-center">
        <Heading variant="h1">Please Sign in with TMDB</Heading>
        <p className="w-[60ch] text-sm text-balance">
          You will be redirected to TMDB.org to either create an account or approve the sign in.
        </p>
        <form action={loginAction}>
          <Button type="submit">Continue to TMDB</Button>
        </form>
      </div>
    </div>
  );
}
