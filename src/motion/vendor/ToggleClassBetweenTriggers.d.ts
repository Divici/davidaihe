export class ToggleClassBetweenTriggers {
  constructor(options: {
    start: string;
    end: string;
    target: string;
    threshold?: { start?: number; end?: number };
    className?: string;
    onChange?: (active: boolean) => void;
  });
  calculate(): void;
  destroy(): void;
}
