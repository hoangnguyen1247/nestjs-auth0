import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { Auth0AuthenticationOptions, Auth0AuthenticationAsyncOptions, Auth0AuthenticationOptionsFactory } from "./auth0.interfaces";
import { createAuth0AuthenticationClient } from "./auth0.client";
import { AUTH0_AUTHENTITCATION_TOKEN, AUTH0_AUTHENTITCATION_OPTIONS } from "./auth0.constants";

@Global()
@Module({})
export class Auth0AuthenticationCoreModule {

    public static forRoot(options: Auth0AuthenticationOptions): DynamicModule {
        const auth0AuthenticationClient: Provider = {
            provide: AUTH0_AUTHENTITCATION_TOKEN,
            useValue: createAuth0AuthenticationClient(options),
        };

        return {
            exports: [auth0AuthenticationClient],
            module: Auth0AuthenticationCoreModule,
            providers: [auth0AuthenticationClient],
        };
    }

    public static forRootAsync(asyncOptions: Auth0AuthenticationAsyncOptions): DynamicModule {
        const auth0AuthenticationClient: Provider = {
            inject: [AUTH0_AUTHENTITCATION_OPTIONS],
            provide: AUTH0_AUTHENTITCATION_TOKEN,
            useFactory: (options: Auth0AuthenticationOptions) => createAuth0AuthenticationClient(options),
        };

        return {
            exports: [auth0AuthenticationClient],
            imports: asyncOptions.imports,
            module: Auth0AuthenticationCoreModule,
            providers: [...this.createAsyncProviders(asyncOptions), auth0AuthenticationClient],
        };
    }

    private static createAsyncProviders(options: Auth0AuthenticationAsyncOptions): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }

        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }

    private static createAsyncOptionsProvider(
        options: Auth0AuthenticationAsyncOptions,
    ): Provider {
        if (options.useFactory) {
            return {
                inject: options.inject || [],
                provide: AUTH0_AUTHENTITCATION_OPTIONS,
                useFactory: options.useFactory,
            };
        }

        return {
            inject: [options.useExisting || options.useClass],
            provide: AUTH0_AUTHENTITCATION_OPTIONS,
            useFactory: (optionsFactory: Auth0AuthenticationOptionsFactory) =>
                optionsFactory.createAuth0AuthenticationOptions(),
        };
    }
}
