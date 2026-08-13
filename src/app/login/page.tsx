'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  User as UserIcon,
  CheckCircle2,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { PrimaryButton } from '@/components/primary-button';
import { Modal } from '@/components/modal';
import { useAuth } from '@/hooks/use-auth';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  resetPassword,
  authErrorMessage,
} from '@/services/auth';
import { cn } from '@/lib/utils';

type Mode = 'signin' | 'signup';

export default function LoginScreen() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [mode, setMode] = useState<Mode>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forgot-password modal state
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetBusy, setResetBusy] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Already signed in? Bounce to home.
  useEffect(() => {
    if (!loading && user) router.replace('/home');
  }, [user, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === 'signup') {
        if (!name.trim()) throw new Error('Please enter your name.');
        await signUpWithEmail(name.trim(), email.trim(), password);
      } else {
        await signInWithEmail(email.trim(), password);
      }
      router.replace('/home');
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    try {
      await signInWithGoogle();
      // OAuth redirect flow — onAuthStateChange + redirect handle the rest.
    } catch (err) {
      setError(authErrorMessage(err));
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setResetBusy(true);
    try {
      await resetPassword(resetEmail.trim());
      setResetSent(true);
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setResetBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 app-aurora" />
      <div className="pointer-events-none absolute -top-20 right-0 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-[390px] flex-1 flex-col px-6 pb-8 pt-14 safe-top">
        <div className="animate-fade-in mb-8">
          <Logo size={48} />
        </div>

        <div className="animate-slide-up mb-6">
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-white">
            {mode === 'signin' ? 'Welcome back.' : 'Create your account.'}
          </h1>
          <p className="mt-1.5 text-sm text-white/55">
            {mode === 'signin'
              ? 'Sign in to stay protected with real-time AI threat awareness.'
              : 'Join Guardian Vision AI to stay protected wherever you go.'}
          </p>
        </div>

        {/* Mode switch */}
        <div className="mb-5 flex rounded-2xl bg-white/[0.05] p-1">
          <SwitchTab active={mode === 'signin'} onClick={() => setMode('signin')}>
            Sign In
          </SwitchTab>
          <SwitchTab active={mode === 'signup'} onClick={() => setMode('signup')}>
            Create Account
          </SwitchTab>
        </div>

        <form
          onSubmit={handleSubmit}
          className="animate-slide-up space-y-3.5"
          style={{ animationDelay: '0.05s' }}
        >
          {mode === 'signup' && (
            <Field
              id="name"
              label="Full name"
              type="text"
              placeholder="Aaradhya Sharma"
              icon={<UserIcon className="h-5 w-5" />}
              autoComplete="name"
              value={name}
              onChange={setName}
              required
            />
          )}
          <Field
            id="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            icon={<Mail className="h-5 w-5" />}
            autoComplete="email"
            value={email}
            onChange={setEmail}
            required
          />
          <Field
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            icon={<Lock className="h-5 w-5" />}
            autoComplete={
              mode === 'signin' ? 'current-password' : 'new-password'
            }
            value={password}
            onChange={setPassword}
            required
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="text-white/45 transition-colors hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            }
          />

          {mode === 'signin' && (
            <div className="flex justify-end pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setResetEmail(email);
                  setResetSent(false);
                  setForgotOpen(true);
                }}
                className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Forgot password?
              </button>
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive"
            >
              {error}
            </p>
          )}

          <PrimaryButton
            type="submit"
            size="block"
            loading={busy}
            rightIcon={!busy && <ArrowRight className="h-5 w-5" />}
            className="mt-1"
          >
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </PrimaryButton>
        </form>

        <div className="my-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">
            or continue with
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          className="glass flex h-12 w-full items-center justify-center gap-2.5 rounded-2xl text-sm font-medium text-white transition-all hover:bg-white/[0.12] active:scale-[0.97]"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="mt-auto pt-8 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-white/35">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            <span>Protected by end-to-end encryption</span>
          </div>
        </div>
      </div>

      {/* Forgot-password modal */}
      <Modal
        open={forgotOpen}
        onOpenChange={setForgotOpen}
        title="Reset your password"
        description={
          resetSent
            ? undefined
            : "Enter your email and we'll send you a reset link."
        }
      >
        {resetSent ? (
          <div className="flex flex-col items-center gap-3 py-2 text-center">
            <CheckCircle2 className="h-10 w-10 text-success" />
            <p className="text-sm text-white/70">
              If an account exists for{' '}
              <span className="font-medium text-white">{resetEmail}</span>, a
              reset link is on its way.
            </p>
            <PrimaryButton
              className="mt-2 w-full"
              onClick={() => setForgotOpen(false)}
            >
              Done
            </PrimaryButton>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <Field
              id="reset-email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="h-5 w-5" />}
              autoComplete="email"
              value={resetEmail}
              onChange={setResetEmail}
              required
            />
            <PrimaryButton
              type="submit"
              size="block"
              loading={resetBusy}
              leftIcon={!resetBusy ? <Mail className="h-5 w-5" /> : undefined}
            >
              Send reset link
            </PrimaryButton>
          </form>
        )}
      </Modal>
    </div>
  );
}

function SwitchTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 rounded-xl py-2 text-sm font-medium transition-all',
        active ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-white/55 hover:text-white',
      )}
    >
      {children}
    </button>
  );
}

function Field({
  id,
  label,
  type,
  placeholder,
  icon,
  trailing,
  autoComplete,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  trailing?: React.ReactNode;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-white/75"
      >
        {label}
      </label>
      <div className="group flex h-[52px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 transition-colors focus-within:border-primary/60 focus-within:bg-white/[0.08]">
        <span className="text-white/40 transition-colors group-focus-within:text-primary">
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-white placeholder:text-white/35 focus:outline-none"
        />
        {trailing}
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
