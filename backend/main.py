from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

from backend import database
from backend.models import TeamMember, TeamMemberCreate, TeamMemberUpdate

app = FastAPI(title="TeamCard Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Demo app: allow all origins so Vercel frontend can call it
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/team", response_model=Dict[str, Any])
async def get_team_data():
    """Returns the legacy nested team data payload for backward compatibility or standard parsing."""
    members = database.get_all_members()
    return {
        "company": {
            "team": [member.model_dump() for member in members]
        }
    }

@app.get("/api/team/members", response_model=List[TeamMember])
async def get_team_members():
    """Returns the list of team members in a flat array."""
    return database.get_all_members()

@app.post("/api/team/members", response_model=TeamMember)
async def create_team_member(member: TeamMemberCreate):
    """Adds a new team member."""
    return database.add_member(member)

@app.put("/api/team/members/{member_id}", response_model=TeamMember)
async def update_team_member(member_id: str, member: TeamMemberUpdate):
    """Updates an existing team member."""
    updated = database.update_member(member_id, member)
    if not updated:
        raise HTTPException(status_code=404, detail="Team member not found")
    return updated

@app.delete("/api/team/members/{member_id}")
async def delete_team_member(member_id: str):
    """Deletes a team member."""
    success = database.delete_member(member_id)
    if not success:
        raise HTTPException(status_code=404, detail="Team member not found")
    return {"message": "Team member deleted successfully"}
