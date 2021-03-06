import { AuthenticationClient } from "auth0";
import { InjectAuthenticationClient } from "nestjs-auth0";

export class AppService {
    constructor(
        @InjectAuthenticationClient() private readonly authenticationClient: AuthenticationClient,
    ) {}
}