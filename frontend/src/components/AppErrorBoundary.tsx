import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

// A render crash anywhere in the learner tree (e.g. one malformed profile
// field) would otherwise unmount everything and leave a permanent blank dark
// screen with no clue why. This catches it and offers a reload. Mounted once
// at the AuthGate root; AdminDashboard keeps its own boundary with a more
// technical error display.
interface BoundaryProps { children: ReactNode }
interface BoundaryState { error: Error | null }

export default class AppErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  // `declare` refines the inherited members for the type-checker without
  // re-emitting fields (React types aren't fully resolved in this project).
  declare props: BoundaryProps;
  state: BoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App render crashed:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-ink text-paper font-sans flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-ink-raise border border-ink-line rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-paper">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <h1 className="text-lg font-serif font-light tracking-tight">Алдаа гарлаа</h1>
            </div>
            <p className="mt-3 text-sm text-paper-2">
              Уучлаарай, ямар нэг зүйл буруу боллоо. Дахин ачаалахад ихэнхдээ засарна.
            </p>
            <p className="mt-3 text-xs font-mono text-paper-3 break-words whitespace-pre-wrap">
              {this.state.error.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 px-5 py-2.5 bg-paper text-ink rounded-full text-xs font-medium uppercase tracking-[0.15em] hover:bg-white transition-colors"
            >
              Дахин ачаалах
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
