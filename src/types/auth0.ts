import type { User } from "@auth0/auth0-react";

export interface Auth0User extends User {
    given_name?: string;
    family_name?: string;
    picture?: string;
    email_verified?: boolean;
    "https://task-manager.app/roles"?: string[];
    "https://task-manager.app/permissions"?: string[];
}