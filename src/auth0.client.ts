import { AuthenticationClient } from "auth0";
import { Auth0AuthenticationOptions } from "./auth0.interfaces";

export function createAuth0AuthenticationClient(options: Auth0AuthenticationOptions) {
    const auth0AuthenticationClient = new AuthenticationClient(options);

    return auth0AuthenticationClient;
}