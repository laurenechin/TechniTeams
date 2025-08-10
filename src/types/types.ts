export interface UserData {
    email: string;
}

export interface UserProfile {
    name: string;
    track: string;
    environment: string;
    bio?: string;
    languages?: string[];
    tools?: string[];
    interests?: string[];
    myRoles?: string[];
    neededRoles?: string[];
    personality?: string[];
    ideaStatus?: string;
    searchingStatus?: string;
    profileImage?: string;
    tags?: string[];
}