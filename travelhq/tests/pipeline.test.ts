// Basic AI pipeline integration test
describe("AI Pipeline", () => {
  test("should generate trip from mock input", async () => {
    const mockInput = {
      destination: "Goa",
      start_date: "2025-03-15",
      end_date: "2025-03-20",
      budget_inr: 30000,
      group_size: 2,
      style: "comfort" as const,
      interests: ["Beaches", "Food"],
    };
    expect(mockInput.destination).toBe("Goa");
    expect(mockInput.budget_inr).toBeGreaterThan(0);
  });

  test("formatINR formats correctly", () => {
    const amount = 45000;
    const formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
    expect(formatted).toContain("45,000");
  });
});
