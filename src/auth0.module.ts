import { DynamicModule, Module } from "@nestjs/common";
import { Auth0AuthenticationOptions, Auth0AuthenticationAsyncOptions } from "./auth0.interfaces";
import { Auth0AuthenticationCoreModule } from "./auth0-core.module";

@Module({})
export class Auth0AuthenticationModule {

    public static forRoot(options: Auth0AuthenticationOptions): DynamicModule {
        return {
            module: Auth0AuthenticationModule,
            imports: [Auth0AuthenticationCoreModule.forRoot(options)],
        };
    }

    public static forRootAsync(options: Auth0AuthenticationAsyncOptions): DynamicModule {
        return {
            module: Auth0AuthenticationModule,
            imports: [Auth0AuthenticationCoreModule.forRootAsync(options)],
        };
    }
}