export interface Task {
    "completionPct": string,
    "creator": User,
    "assignedTo": User,
    "points": number,
    "status": string,
    "interestedMembers": Array<User>,
    "priority": string,
    "description": string,
    "id": string,
    "targetDate": string,
    "tags": Array<string>,
    "title": string
}

export interface User {
    name: string,
    id: number
}