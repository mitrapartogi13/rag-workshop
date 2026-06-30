"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/quizzes";
import { cn } from "@/lib/utils";
import { CheckIcon, CloseIcon, RefreshIcon } from "@/components/icons";

/**
 * Interactive mini quiz.
 *
 * Flow: one question at a time. Selecting an option locks the answer and
 * reveals instant feedback: a short confirmation when correct, or the correct
 * answer plus an explanation when wrong. After the last question a score
 * screen appears with a "Redo quiz" button that resets all state.
 */
export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const total = questions.length;
  const [current, setCurrent] = useState(0);
  const [selections, setSelections] = useState<(number | null)[]>(() =>
    questions.map(() => null)
  );
  const [finished, setFinished] = useState(false);

  const question = questions[current];
  const selected = selections[current];
  const answered = selected !== null;
  const isCorrect = answered && selected === question.answer;
  const score = selections.reduce<number>(
    (acc, sel, i) => acc + (sel === questions[i].answer ? 1 : 0),
    0
  );

  function choose(index: number) {
    if (answered) return; // lock in the first choice
    setSelections((prev) => {
      const next = [...prev];
      next[current] = index;
      return next;
    });
  }

  function goNext() {
    if (current < total - 1) setCurrent(current + 1);
    else setFinished(true);
  }

  function restart() {
    setSelections(questions.map(() => null));
    setCurrent(0);
    setFinished(false);
  }

  if (finished) {
    return <ScoreScreen score={score} total={total} onRestart={restart} />;
  }

  const progress = ((current + (answered ? 1 : 0)) / total) * 100;

  return (
    <div className="not-prose my-6 rounded-lg border border-slate-200 p-5 sm:p-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Question {current + 1} of {total}
        </span>
      </div>
      <div className="mb-5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-sky-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mb-4 text-base font-semibold text-slate-900">
        {question.question}
      </p>

      <div className="space-y-2">
        {question.options.map((option, index) => {
          const state = !answered
            ? "idle"
            : index === question.answer
              ? "correct"
              : index === selected
                ? "wrong"
                : "muted";

          return (
            <button
              key={index}
              type="button"
              onClick={() => choose(index)}
              disabled={answered}
              className={cn(
                "flex w-full items-center gap-3 rounded-md border px-4 py-2.5 text-left text-sm transition-colors",
                state === "idle" &&
                  "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                state === "correct" && "border-emerald-500 bg-emerald-50 text-emerald-900",
                state === "wrong" && "border-rose-500 bg-rose-50 text-rose-900",
                state === "muted" && "border-slate-200 text-slate-400",
                answered && "cursor-default"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 flex-none items-center justify-center rounded-full border text-[0.7rem] font-semibold",
                  state === "correct" && "border-emerald-500 bg-emerald-500 text-white",
                  state === "wrong" && "border-rose-500 bg-rose-500 text-white",
                  (state === "idle" || state === "muted") &&
                    "border-slate-300 text-slate-400"
                )}
              >
                {state === "correct" ? (
                  <CheckIcon className="h-3 w-3" />
                ) : state === "wrong" ? (
                  <CloseIcon className="h-3 w-3" />
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {answered ? (
        <div
          className={cn(
            "mt-4 rounded-r-md border-l-4 p-4 text-sm",
            isCorrect ? "border-emerald-500 bg-emerald-50/60" : "border-rose-500 bg-rose-50/60"
          )}
        >
          <p
            className={cn(
              "mb-1 font-semibold",
              isCorrect ? "text-emerald-800" : "text-rose-800"
            )}
          >
            {isCorrect
              ? "Correct!"
              : `Not quite. The correct answer is ${String.fromCharCode(
                  65 + question.answer
                )}.`}
          </p>
          <p className={cn("leading-6", isCorrect ? "text-emerald-800" : "text-rose-800")}>
            {question.explanation}
          </p>
        </div>
      ) : null}

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={goNext}
          disabled={!answered}
          className={cn(
            "inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
            answered
              ? "bg-slate-900 text-white hover:bg-slate-700"
              : "cursor-not-allowed bg-slate-100 text-slate-400"
          )}
        >
          {current < total - 1 ? "Next question" : "See results"}
        </button>
      </div>
    </div>
  );
}

function ScoreScreen({
  score,
  total,
  onRestart,
}: {
  score: number;
  total: number;
  onRestart: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const message =
    pct >= 90
      ? "Outstanding!"
      : pct >= 70
        ? "Great work!"
        : pct >= 50
          ? "Good effort!"
          : "Keep practicing!";

  return (
    <div className="not-prose my-6 rounded-lg border border-slate-200 p-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Quiz complete
      </p>
      <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
        {score} <span className="text-slate-300">/</span> {total}
      </p>
      <p className="mt-1 text-sm font-medium text-sky-600">
        {pct}%, {message}
      </p>
      <div className="mx-auto mt-4 h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-sky-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <button
        type="button"
        onClick={onRestart}
        className="mt-6 inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
      >
        <RefreshIcon className="h-4 w-4" />
        Redo quiz
      </button>
    </div>
  );
}
