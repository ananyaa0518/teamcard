from typing import Optional

from pydantic import BaseModel, EmailStr, HttpUrl


class TeamMemberBase(BaseModel):
    """
    Core team member data used for create/update operations.

    This model intentionally includes a few additional fields (`quote`, `github`)
    to support the existing frontend design, while still satisfying the required
    schema fields for the public API.
    """

    # Required fields for all team members
    name: str
    role: str
    photo_url: HttpUrl
    bio: Optional[str] = None
    linkedin_url: Optional[HttpUrl] = None
    email: Optional[EmailStr] = None
    location: Optional[str] = None
    quote: Optional[str] = None
    github: Optional[str] = None


class TeamMemberCreate(TeamMemberBase):
    """
    Payload for creating a new team member.
    """

    pass


class TeamMemberUpdate(TeamMemberBase):
    """
    Payload for updating an existing team member.
    """

    pass


class TeamMember(TeamMemberBase):
    """
    Stored representation of a team member, including the generated ID.
    """

    id: str
