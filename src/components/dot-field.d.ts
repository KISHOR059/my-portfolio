import type { ReactNode } from "react";

declare const DotField: (props: DotFieldProps) => ReactNode;

interface DotFieldProps {
  className?: string;
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  [key: string]: unknown;
}

export default DotField;
