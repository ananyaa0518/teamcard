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
        "photo_url": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=80"
      },
      {
        "name": "Riya Mehta",
        "role": "Co-Founder & CTO",
        "linkedin_url": "https://linkedin.com/in/riyamehta",
        "github": "https://github.com/riyamehta",
        "email": "riya@innovatex.com",
        "bio": "Technology should make life easier.",
        "quote": "Technology should make life easier.",
        "photo_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80"
      },
      {
        "name": "Kabir Singh",
        "role": "Co-Founder & COO",
        "linkedin_url": "https://linkedin.com/in/kabirsingh",
        "github": "https://github.com/kabirsingh",
        "email": "kabir@innovatex.com",
        "bio": "Execution is the real strategy.",
        "quote": "Execution is the real strategy.",
        "photo_url": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80"
      },
      {
        "name": "Ananya Gupta",
        "role": "Founding Engineer",
        "linkedin_url": "https://linkedin.com/in/ananyagupta",
        "github": "https://github.com/ananyagupta",
        "email": "ananya@innovatex.com",
        "bio": "Code is poetry written for machines.",
        "quote": "Code is poetry written for machines.",
        "photo_url": "https://images.unsplash.com/photo-1528701800489-20be3c30c1d5?w=900&q=80"
      },
      {
        "name": "Rohan Verma",
        "role": "Frontend Engineer",
        "linkedin_url": "https://linkedin.com/in/rohanverma",
        "github": "https://github.com/rohanverma",
        "email": "rohan@innovatex.com",
        "bio": "Design is intelligence made visible.",
        "quote": "Design is intelligence made visible.",
        "photo_url": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900&q=80"
      },
      {
        "name": "Ishita Kapoor",
        "role": "Backend Engineer",
        "linkedin_url": "https://linkedin.com/in/ishitakapoor",
        "github": "https://github.com/ishitakapoor",
        "email": "ishita@innovatex.com",
        "bio": "Clean architecture builds scalable systems.",
        "quote": "Clean architecture builds scalable systems.",
        "photo_url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4c?w=900&q=80"
      },
      {
        "name": "Dev Patel",
        "role": "Full Stack Developer",
        "linkedin_url": "https://linkedin.com/in/devpatel",
        "github": "https://github.com/devpatel",
        "email": "dev@innovatex.com",
        "bio": "Every bug is a lesson.",
        "quote": "Every bug is a lesson.",
        "photo_url": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=80"
      },
      {
        "name": "Neha Iyer",
        "role": "UI/UX Designer",
        "linkedin_url": "https://linkedin.com/in/nehaiyer",
        "github": "https://github.com/nehaiyer",
        "email": "neha@innovatex.com",
        "bio": "Good design feels invisible.",
        "quote": "Good design feels invisible.",
        "photo_url": "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=900&q=80"
      },
      {
        "name": "Aditya Nair",
        "role": "DevOps Engineer",
        "linkedin_url": "https://linkedin.com/in/adityanair",
        "github": "https://github.com/adityanair",
        "email": "aditya@innovatex.com",
        "bio": "Automation is the backbone of reliability.",
        "quote": "Automation is the backbone of reliability.",
        "photo_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&q=80"
      },
      {
        "name": "Sneha Chatterjee",
        "role": "Product Manager",
        "linkedin_url": "https://linkedin.com/in/snehachatterjee",
        "github": "https://github.com/snehachatterjee",
        "email": "sneha@innovatex.com",
        "bio": "Products succeed when users love them.",
        "quote": "Products succeed when users love them.",
        "photo_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=80"
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
