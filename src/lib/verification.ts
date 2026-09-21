export type VerificationStatus="pending"|"in-review"|"verified"|"rejected";

export const allowedTransitions: Record<VerificationStatus, VerificationStatus[]> = {
  pending: ["in-review", "rejected"],
  "in-review": ["verified", "rejected", "pending"],
  verified: ["pending"],
  rejected: ["pending"],
};

export function canTransition(from: VerificationStatus, to: VerificationStatus) {
  return allowedTransitions[from].includes(to);
}

export function assertTransition(from: VerificationStatus, to: VerificationStatus) {
  if (!canTransition(from, to)) throw new Error("Invalid verification status transition.");
}
