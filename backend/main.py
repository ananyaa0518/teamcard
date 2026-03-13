import os
from typing import Any, Dict, List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

try:
    from backend import database
    from backend.models import TeamMember, TeamMemberCreate, TeamMemberUpdate
except ModuleNotFoundError:
    import database
    from models import TeamMember, TeamMemberCreate, TeamMemberUpdate

app = FastAPI(title="TeamCard Backend API")
allowed_origins = [
    "http://localhost:3000",
    "https://teamcard-hazel.vercel.app",
]
frontend_origin = os.getenv("FRONTEND_ORIGIN")
if frontend_origin:
    normalized_origin = frontend_origin.rstrip("/")
    if normalized_origin not in allowed_origins:
        allowed_origins.append(normalized_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/team", response_model=List[TeamMember])
async def list_team_members() -> List[TeamMember]:
    """
    Returns all team members as a flat list.
    """

    return database.get_all_members()


@app.post("/team", response_model=TeamMember, status_code=201)
async def create_team_member(member: TeamMemberCreate) -> TeamMember:
    """
    Creates a new team member.
    """

    return database.add_member(member)


@app.put("/team/{member_id}", response_model=TeamMember)
async def update_team_member(member_id: str, member: TeamMemberUpdate) -> TeamMember:
    """
    Updates an existing team member by ID.
    """

    updated = database.update_member(member_id, member)
    if not updated:
        raise HTTPException(status_code=404, detail="Team member not found")
    return updated


@app.delete("/team/{member_id}")
async def delete_team_member(member_id: str) -> Dict[str, str]:
    """
    Deletes a team member by ID.
    """

    success = database.delete_member(member_id)
    if not success:
        raise HTTPException(status_code=404, detail="Team member not found")
    return {"message": "Team member deleted successfully"}


@app.get("/api/team", response_model=Dict[str, Any])
async def get_team_data_legacy() -> Dict[str, Any]:
    """
    Legacy endpoint that returns a nested payload structure.
    Kept for backward compatibility with older clients.
    """

    members = database.get_all_members()
    return {
        "company": {
            "team": [member.model_dump() for member in members]
        }
    }


@app.get("/api/team/members", response_model=List[TeamMember])
async def get_team_members_legacy() -> List[TeamMember]:
    """
    Legacy endpoint returning the list of team members in a flat array,
    under the older `/api/team/members` path.
    """

    return database.get_all_members()
