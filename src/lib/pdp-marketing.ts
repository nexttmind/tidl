import type { GoalId } from "@/types/quiz";
import type { PdpMarketing } from "@/components/pdp/data/types";

/**
 * Goal-based emotional marketing copy. Persuasive and aspirational — designed to
 * make the visitor feel "this is me, I need this" — without shaming anyone.
 *
 * Before/after images MUST be passed in (sandbox peptide-derived assets only).
 * This module no longer embeds local lifestyle photography.
 */
const GOAL_MARKETING: Record<
  GoalId,
  Omit<PdpMarketing, "beforeAfter" | "emotionalHeadline">
> = {
  "weight-loss": {
    emotionalSub:
      "You've tried the diets, the apps, the willpower. It was never about willpower. It's about the right medicine, prescribed for your body.",
    painPoints: [
      "Tired of hiding in the back of every photo",
      "Tired of the scale that never moves",
      "Tired of starting over every Monday",
      "Tired of feeling like your body is working against you",
    ],
    dream:
      "Imagine catching your reflection and smiling. Buying the outfit you actually want. Feeling light, confident, and finally in control.",
    motivationHeadline: "You deserve to feel like yourself again.",
    motivationSub:
      "Thousands started exactly where you are. One quiz, one licensed provider, one plan built for you.",
  },
  "metabolic-health": {
    emotionalSub:
      "The afternoon crashes, the stubborn middle, the foggy mornings. Your metabolism can be supported, the right way.",
    painPoints: [
      "Tired of the 3pm energy crash",
      "Tired of stubborn weight that won't budge",
      "Tired of feeling older than you are",
      "Tired of guessing what your body needs",
    ],
    dream:
      "Imagine steady energy from morning to night, a body that responds again, and workouts that finally pay off.",
    motivationHeadline: "Your best metabolic years aren't behind you.",
    motivationSub: "Physician-guided support, built around your goals — not a supplement-store guess.",
  },
  performance: {
    emotionalSub:
      "The plateau, the nagging soreness, the sleep that doesn't restore you. You can do more — with the right support.",
    painPoints: [
      "Tired of hitting the same plateau",
      "Tired of soreness that lingers for days",
      "Tired of watching younger guys out-recover you",
      "Tired of leaving gains on the table",
    ],
    dream:
      "Imagine adding lean muscle, sleeping deep, and waking up ready to attack the day — every day.",
    motivationHeadline: "Unlock the performance you've been chasing.",
    motivationSub: "Physician-supervised protocols — real medicine, never gray-market shortcuts.",
  },
  recovery: {
    emotionalSub:
      "The injury that won't quit, the joints that ache, the recovery that takes forever. There's a better way.",
    painPoints: [
      "Tired of injuries that never fully heal",
      "Tired of sitting out the activities you love",
      "Tired of aches that slow you down",
      "Tired of recovery taking forever",
    ],
    dream:
      "Imagine moving without pain, bouncing back between sessions, and feeling strong in your own body again.",
    motivationHeadline: "Your comeback starts now.",
    motivationSub: "Physician-supervised recovery protocols, dispensed by licensed US pharmacies.",
  },
  longevity: {
    emotionalSub:
      "The energy dip, the slower recovery, the mirror that surprises you. Longevity isn't luck — it's a protocol.",
    painPoints: [
      "Tired of feeling older than you should",
      "Tired of low energy and foggy days",
      "Tired of watching yourself slow down",
      "Tired of one-size-fits-all supplements",
    ],
    dream:
      "Imagine sharper focus, deeper sleep, better skin, and the vitality to keep up with the life you want.",
    motivationHeadline: "The best version of you is still ahead.",
    motivationSub: "Physician-supervised longevity protocols, personalized to your goals.",
  },
  "hormonal-health": {
    emotionalSub:
      "Energy, drive, mood, focus — when your hormones are off, everything is off. It doesn't have to stay that way.",
    painPoints: [
      "Tired of low energy and low drive",
      "Tired of mood swings and brain fog",
      "Tired of not feeling like yourself",
      "Tired of being told it's just aging",
    ],
    dream:
      "Imagine waking up energized, focused, and confident — with your drive and edge restored.",
    motivationHeadline: "Balance changes everything.",
    motivationSub: "Lab-guided, physician-prescribed care built around how you actually feel.",
  },
};

/**
 * Build an emotional marketing block. `beforeAfterImages` must be sandbox-derived
 * peptide product images (never lifestyle / stock photography).
 */
export function buildGoalMarketing(
  goal: GoalId,
  emotionalHeadline: string,
  compound: string,
  beforeAfterImages: readonly [string, string],
): PdpMarketing {
  const base = GOAL_MARKETING[goal];
  return {
    emotionalHeadline,
    emotionalSub: base.emotionalSub,
    painPoints: base.painPoints,
    dream: base.dream,
    motivationHeadline: base.motivationHeadline,
    motivationSub: base.motivationSub,
    beforeAfter: [
      {
        image: beforeAfterImages[0],
        beforeLabel: "Week 0",
        afterLabel: "Week 12",
        caption: `${compound} protocol — pharmacy product from the PrescribeRx catalog.`,
        weeks: "12-week journey",
      },
      {
        image: beforeAfterImages[1],
        beforeLabel: "Week 0",
        afterLabel: "Week 16",
        caption: "Same sandbox product, physician-guided care.",
        weeks: "16-week journey",
      },
    ],
  };
}

/** GLP-1 flagship helper — BA images still sandbox peptide-derived. */
export function buildGlp1Marketing(): PdpMarketing {
  return buildGoalMarketing(
    "weight-loss",
    "This time, the weight actually stays off.",
    "GLP-1",
    ["/peptides/ba/glp-1-weight-loss-before.png", "/peptides/ba/glp-1-weight-loss-after.png"],
  );
}
