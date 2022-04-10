import { AuthenticationClient } from "auth0";
import { createAuth0AuthenticationClient } from "./auth0.client";

describe("createAuth0AuthenticationClient", () => {
    const domain = "test";
    const clientId = "test";
    const clientSecret = "test";

    it("should return the Auth0 AuthenticationClient", () => {
        const auth0AuthenticationClient = createAuth0AuthenticationClient({ 
            domain: domain,
            clientId,
            clientSecret,
        });
        expect(auth0AuthenticationClient).toBeInstanceOf(AuthenticationClient);
    });
});