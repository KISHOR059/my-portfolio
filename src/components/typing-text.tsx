"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function TypingText({ words }: { words: readonly string[] }) {
  const reducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const word = words[wordIndex];
    const completed = text === word;
    const empty = text === "";
    const timeout = window.setTimeout(
      () => {
        if (completed && !deleting) setDeleting(true);
        else if (empty && deleting) {
          setDeleting(false);
          setWordIndex((current) => (current + 1) % words.length);
        } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      },
      completed && !deleting ? 1400 : empty && deleting ? 280 : deleting ? 42 : 78,
    );

    return () => window.clearTimeout(timeout);
  }, [deleting, reducedMotion, text, wordIndex, words]);

  return (
    <span className="inline-flex min-h-8 items-center font-mono text-base font-medium text-cyan-300 sm:text-lg">
      <span className="text-violet-400">&lt;</span>
      {reducedMotion ? words[0] : text}
      <span className="text-violet-400">/&gt;</span>
      <motion.span
        className="ml-1 h-5 w-px bg-cyan-200"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
}
