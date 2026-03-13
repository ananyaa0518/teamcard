import uuid
from typing import List, Optional

try:
  from backend.models import TeamMember, TeamMemberCreate, TeamMemberUpdate
except ModuleNotFoundError:
  from models import TeamMember, TeamMemberCreate, TeamMemberUpdate

# In-memory database
_team_db = {}

def init_db():
    team_data = [
      {
        "name": "Aarav Sharma",
        "role": "Founder & CEO",
        "linkedin_url": "https://linkedin.com/in/aaravsharma",
        "github": "https://github.com/aaravsharma",
        "email": "aarav@innovatex.com",
        "bio": "Great products start with simple ideas.",
        "quote": "Great products start with simple ideas.",
        "photo_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      },
      {
        "name": "Riya Mehta",
        "role": "Co-Founder & CTO",
        "linkedin_url": "https://linkedin.com/in/riyamehta",
        "github": "https://github.com/riyamehta",
        "email": "riya@innovatex.com",
        "bio": "Technology should make life easier.",
        "quote": "Technology should make life easier.",
        "photo_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      {
        "name": "Kabir Singh",
        "role": "Co-Founder & COO",
        "linkedin_url": "https://linkedin.com/in/kabirsingh",
        "github": "https://github.com/kabirsingh",
        "email": "kabir@innovatex.com",
        "bio": "Execution is the real strategy.",
        "quote": "Execution is the real strategy.",
        "photo_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      },
      {
        "name": "Ananya Gupta",
        "role": "Founding Engineer",
        "linkedin_url": "https://linkedin.com/in/ananyagupta",
        "github": "https://github.com/ananyagupta",
        "email": "ananya@innovatex.com",
        "bio": "Code is poetry written for machines.",
        "quote": "Code is poetry written for machines.",
        "photo_url": "https://images.unsplash.com/photo-1527980965255-d3b416303d12"
      },
      {
        "name": "Rohan Verma",
        "role": "Frontend Engineer",
        "linkedin_url": "https://linkedin.com/in/rohanverma",
        "github": "https://github.com/rohanverma",
        "email": "rohan@innovatex.com",
        "bio": "Design is intelligence made visible.",
        "quote": "Design is intelligence made visible.",
        "photo_url": "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7"
      },
      {
        "name": "Ishita Kapoor",
        "role": "Backend Engineer",
        "linkedin_url": "https://linkedin.com/in/ishitakapoor",
        "github": "https://github.com/ishitakapoor",
        "email": "ishita@innovatex.com",
        "bio": "Clean architecture builds scalable systems.",
        "quote": "Clean architecture builds scalable systems.",
        "photo_url": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce"
      },
      {
        "name": "Dev Patel",
        "role": "Full Stack Developer",
        "linkedin_url": "https://linkedin.com/in/devpatel",
        "github": "https://github.com/devpatel",
        "email": "dev@innovatex.com",
        "bio": "Every bug is a lesson.",
        "quote": "Every bug is a lesson.",
        "photo_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
      },
      {
        "name": "Neha Iyer",
        "role": "UI/UX Designer",
        "linkedin_url": "https://linkedin.com/in/nehaiyer",
        "github": "https://github.com/nehaiyer",
        "email": "neha@innovatex.com",
        "bio": "Good design feels invisible.",
        "quote": "Good design feels invisible.",
        "photo_url": "https://images.unsplash.com/photo-1519345182560-3f2917c472ef"
      },
      {
        "name": "Aditya Nair",
        "role": "DevOps Engineer",
        "linkedin_url": "https://linkedin.com/in/adityanair",
        "github": "https://github.com/adityanair",
        "email": "aditya@innovatex.com",
        "bio": "Automation is the backbone of reliability.",
        "quote": "Automation is the backbone of reliability.",
        "photo_url": "https://images.unsplash.com/photo-1552058544-f2b08422138a"
      },
      {
        "name": "Sneha Chatterjee",
        "role": "Product Manager",
        "linkedin_url": "https://linkedin.com/in/snehachatterjee",
        "github": "https://github.com/snehachatterjee",
        "email": "sneha@innovatex.com",
        "bio": "Products succeed when users love them.",
        "quote": "Products succeed when users love them.",
        "photo_url": "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e"
      }
    ]
    for m in team_data:
        member_id = str(uuid.uuid4())
        _team_db[member_id] = TeamMember(id=member_id, **m)

init_db()

def get_all_members() -> List[TeamMember]:
    return list(_team_db.values())

def get_member(member_id: str) -> Optional[TeamMember]:
    return _team_db.get(member_id)

def add_member(member: TeamMemberCreate) -> TeamMember:
    member_id = str(uuid.uuid4())
    new_member = TeamMember(id=member_id, **member.model_dump())
    _team_db[member_id] = new_member
    return new_member

def update_member(member_id: str, member_update: TeamMemberUpdate) -> Optional[TeamMember]:
    if member_id not in _team_db:
        return None
    
    updated_member = TeamMember(id=member_id, **member_update.model_dump())
    _team_db[member_id] = updated_member
    return updated_member

def delete_member(member_id: str) -> bool:
    if member_id in _team_db:
        del _team_db[member_id]
        return True
    return False
