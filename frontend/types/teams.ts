export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  image?: string
  quote?: string
  linkedin?: string
  github?: string
  email?: string
}

export interface TeamMemberCreate {
  name: string
  role: string
  bio?: string
  image?: string
  quote?: string
  linkedin?: string
  github?: string
  email?: string
}

export interface TeamMemberUpdate extends TeamMemberCreate {}