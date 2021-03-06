import { ModuleMetadata, Type } from "@nestjs/common";
import { AuthenticationClientOptions } from "auth0";

export type Auth0AuthenticationOptions = AuthenticationClientOptions;

export interface Auth0AuthenticationOptionsFactory {
    createAuth0AuthenticationOptions(): Auth0AuthenticationOptions | Promise<Auth0AuthenticationOptions>;
}

export interface Auth0AuthenticationAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    inject?: any[],
    useClass?: Type<Auth0AuthenticationOptionsFactory>,
    useExisting?: Type<Auth0AuthenticationOptionsFactory>,
    useFactory?: (...args: any[]) => Auth0AuthenticationOptions | Promise<Auth0AuthenticationOptions>,
}
