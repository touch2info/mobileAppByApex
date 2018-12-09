export interface Task {
    "completionPct": string,
    "creator": User,
    "assignedTo"?: any,
    "points": number,
    "taskStatus": string,
    "interestedMembers"?: any,
    "priority": string,
    "description": string,
    "id": number,
    "targetDate": string,
    "tags": Array<string>,
    "title": string
}

export interface User {
    name: string,
    id: number
}