import { Inject } from "@nestjs/common";
import { AUTH0_AUTHENTITCATION_TOKEN } from "./auth0.constants";

export function InjectAuthenticationClient() {
    return Inject(AUTH0_AUTHENTITCATION_TOKEN);
}
