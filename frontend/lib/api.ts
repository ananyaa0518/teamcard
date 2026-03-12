import type { TeamMember, TeamMemberCreate, TeamMemberUpdate } from "@/types/teams";

const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const res = await fetch(`${BASE}/api/team/members`);
  if (!res.ok) throw new Error("Failed to fetch team members");
  return res.json();
}

export async function createTeamMember(data: TeamMemberCreate): Promise<TeamMember> {
  const res = await fetch(`${BASE}/api/team/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create team member");
  return res.json();
}

export async function updateTeamMember(id: string, data: TeamMemberUpdate): Promise<TeamMember> {
  const res = await fetch(`${BASE}/api/team/members/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update team member");
  return res.json();
}

export async function deleteTeamMember(id: string): Promise<void> {
  const res = await fetch(`${BASE}/api/team/members/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete team member");
}
