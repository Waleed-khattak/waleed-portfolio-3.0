/* eslint-disable prettier/prettier */
import { useCallback, useState } from "react";

let audioCtx: AudioContext | null = null;
let gainNode: GainNode | null = null;
let oscillator: OscillatorNode | null = null;

function getAudioCtx(): AudioContext {
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.connect(audioCtx.destination);
  }

  return audioCtx;
}

function playAmbient(on: boolean) {
  if (typeof window === "undefined") return;

  try {
    const ctx = getAudioCtx();

    if (on) {
      if (!oscillator) {
        oscillator = ctx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(55, ctx.currentTime);
        oscillator.connect(gainNode!);
        oscillator.start();
      }

      gainNode!.gain.cancelScheduledValues(ctx.currentTime);
      gainNode!.gain.setTargetAtTime(0.04, ctx.currentTime, 0.5);
    } else {
      gainNode?.gain.cancelScheduledValues(ctx.currentTime);
      gainNode?.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
    }
  } catch {
    // AudioContext can be blocked by browser autoplay policy
  }
}

export function useSoundToggle() {
  const [on, setOn] = useState(false);

  const toggle = useCallback(() => {
    setOn((prev) => {
      const next = !prev;
      playAmbient(next);
      return next;
    });
  }, []);

  return { on, toggle };
}