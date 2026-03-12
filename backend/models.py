from pydantic import BaseModel, HttpUrl, EmailStr
from typing import Optional

class TeamMemberBase(BaseModel):
    name: str
    role: str
    bio: Optional[str] = None
    email: Optional[EmailStr] = None
    linkedin: Optional[str] = None # Using str to gracefully accept malformed links in dummy data if any, but HttpUrl is preferred. We will use str to avoid pydantic validation errors since dummy data has string urls.
    github: Optional[str] = None
    image: Optional[str] = None
    quote: Optional[str] = None

class TeamMemberCreate(TeamMemberBase):
    pass

class TeamMemberUpdate(TeamMemberBase):
    pass

class TeamMember(TeamMemberBase):
    id: str
