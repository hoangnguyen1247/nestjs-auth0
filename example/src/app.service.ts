import { AuthenticationClient } from "auth0";
import { InjectAuthenticationClient } from "src";

export class AppService {
    constructor(
        @InjectAuthenticationClient() private readonly authenticationClient: AuthenticationClient,
    ) {}
}