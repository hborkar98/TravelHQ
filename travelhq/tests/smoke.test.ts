/**
 * Basic smoke tests — run with: npm test
 * These don't require Supabase or Claude to pass.
 */

import { formatCurrency, formatDate, getDurationDays, slugify } from "../lib/utils";
import { PRICING_PLANS, getPlan } from "../lib/payments";

describe("utils", () => {
  test("formatCurrency INR", () => {
    const result = formatCurrency(25000, "INR");
    expect(result).toContain("25,000");
  });

  test("formatDate", () => {
    const result = formatDate("2024-12-20");
    expect(result).toContain("20");
    expect(result).toContain("Dec");
  });

  test("getDurationDays", () => {
    expect(getDurationDays("2024-12-20", "2024-12-25")).toBe(5);
  });

  test("slugify", () => {
    expect(slugify("Goa Beach Trip!")).toBe("goa-beach-trip");
  });
});

describe("pricing", () => {
  test("all 3 plans exist", () => {
    expect(PRICING_PLANS).toHaveLength(3);
  });

  test("getPlan returns correct plan", () => {
    const plan = getPlan("wanderer");
    expect(plan.price_inr).toBe(799);
    expect(plan.popular).toBe(true);
  });

  test("free plan has 0 price", () => {
    const free = getPlan("free");
    expect(free.price_inr).toBe(0);
    expect(free.price_usd).toBe(0);
  });
});
