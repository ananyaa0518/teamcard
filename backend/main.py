from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any

app = FastAPI(title="TeamCard Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

team_data = {
  "company": {
    "team": [
      {
        "name": "Aarav Sharma",
        "role": "Founder & CEO",
        "linkedin": "https://linkedin.com/in/aaravsharma",
        "github": "https://github.com/aaravsharma",
        "email": "aarav@innovatex.com",
        "quote": "Great products start with simple ideas.",
        "image": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=80"
      },
      {
        "name": "Riya Mehta",
        "role": "Co-Founder & CTO",
        "linkedin": "https://linkedin.com/in/riyamehta",
        "github": "https://github.com/riyamehta",
        "email": "riya@innovatex.com",
        "quote": "Technology should make life easier.",
        "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80"
      },
      {
        "name": "Kabir Singh",
        "role": "Co-Founder & COO",
        "linkedin": "https://linkedin.com/in/kabirsingh",
        "github": "https://github.com/kabirsingh",
        "email": "kabir@innovatex.com",
        "quote": "Execution is the real strategy.",
        "image": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80"
      },
      {
        "name": "Ananya Gupta",
        "role": "Founding Engineer",
        "linkedin": "https://linkedin.com/in/ananyagupta",
        "github": "https://github.com/ananyagupta",
        "email": "ananya@innovatex.com",
        "quote": "Code is poetry written for machines.",
        "image": "https://images.unsplash.com/photo-1528701800489-20be3c30c1d5?w=900&q=80"
      },
      {
        "name": "Rohan Verma",
        "role": "Frontend Engineer",
        "linkedin": "https://linkedin.com/in/rohanverma",
        "github": "https://github.com/rohanverma",
        "email": "rohan@innovatex.com",
        "quote": "Design is intelligence made visible.",
        "image": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900&q=80"
      },
      {
        "name": "Ishita Kapoor",
        "role": "Backend Engineer",
        "linkedin": "https://linkedin.com/in/ishitakapoor",
        "github": "https://github.com/ishitakapoor",
        "email": "ishita@innovatex.com",
        "quote": "Clean architecture builds scalable systems.",
        "image": "https://images.unsplash.com/photo-1539109136881-3be0616acf4c?w=900&q=80"
      },
      {
        "name": "Dev Patel",
        "role": "Full Stack Developer",
        "linkedin": "https://linkedin.com/in/devpatel",
        "github": "https://github.com/devpatel",
        "email": "dev@innovatex.com",
        "quote": "Every bug is a lesson.",
        "image": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=80"
      },
      {
        "name": "Neha Iyer",
        "role": "UI/UX Designer",
        "linkedin": "https://linkedin.com/in/nehaiyer",
        "github": "https://github.com/nehaiyer",
        "email": "neha@innovatex.com",
        "quote": "Good design feels invisible.",
        "image": "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=900&q=80"
      },
      {
        "name": "Aditya Nair",
        "role": "DevOps Engineer",
        "linkedin": "https://linkedin.com/in/adityanair",
        "github": "https://github.com/adityanair",
        "email": "aditya@innovatex.com",
        "quote": "Automation is the backbone of reliability.",
        "image": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&q=80"
      },
      {
        "name": "Sneha Chatterjee",
        "role": "Product Manager",
        "linkedin": "https://linkedin.com/in/snehachatterjee",
        "github": "https://github.com/snehachatterjee",
        "email": "sneha@innovatex.com",
        "quote": "Products succeed when users love them.",
        "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=80"
      }
    ]
  }
}

@app.get("/api/team", response_model=Dict[str, Any])
async def get_team_data():
    """Returns the static company and team JSON payload."""
    return team_data
