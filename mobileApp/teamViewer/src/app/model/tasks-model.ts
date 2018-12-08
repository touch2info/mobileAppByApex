export interface Task {
    "completionPct": string,
    "creator": User,
    "assignedTo"?: any,
    "points": number,
    "status": string,
    "interestedMembers"?: any,
    "priority": string,
    "description": string,
    "id": string,
    "targetDate": string,
    "tags": Array<string>,
    "title": string
}

export interface User {
    name: string,
    id: string
}