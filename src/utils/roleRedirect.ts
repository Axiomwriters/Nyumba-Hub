export function resolveDashboard(role: string) {
  const r = role?.toLowerCase()

  if (!r) return "/dashboard"

  if (
    r === "agent" ||
    r === "host" ||
    r === "professional"
  ) {
    return "/professionalDashboard"
  }

  return "/dashboard"
}
