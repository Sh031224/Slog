import { SignInForm } from './components/sign-in-form';

export function SignIn() {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[500px]">
      <div className="flex flex-col space-y-2 text-center sm:space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">
          Sign in
        </h1>

        <p className="text-sm text-muted-foreground sm:text-lg">
          Enter your email or sign in to your social account
        </p>

        <SignInForm />
      </div>
    </div>
  );
}
