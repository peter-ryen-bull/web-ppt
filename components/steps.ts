"use client";

import { createContext, useContext } from "react";

/*
 * Klikk-steg innenfor en slide. SlideCanvas setter gjeldende steg via
 * StepContext; figurer leser det med useStep() og viser innhold gradvis.
 * Standardverdien er uendelig, slik at miniatyrer og forhåndsvisninger
 * alltid viser sliden ferdig avslørt.
 */
export const StepContext = createContext<number>(Number.POSITIVE_INFINITY);

export function useStep(): number {
  return useContext(StepContext);
}
