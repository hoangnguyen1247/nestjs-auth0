import { Module } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AuthenticationClient } from "auth0";
import { AUTH0_AUTHENTITCATION_TOKEN } from "./auth0.constants";
import { Auth0AuthenticationOptions, Auth0AuthenticationOptionsFactory } from "./auth0.interfaces";
import { Auth0AuthenticationModule } from "./auth0.module";

describe("Auth0AuthenticationModule", () => {
    const domain = "test";
    const clientId = "test";
    const clientSecret = "test";

    class TestService implements Auth0AuthenticationOptionsFactory {
        createAuth0AuthenticationOptions(): Auth0AuthenticationOptions {
            return {
                domain,
                clientId,
                clientSecret,
            };
        }
    }

    @Module({
        exports: [TestService],
        providers: [TestService],
    })
    class TestModule { }

    describe("forRoot", () => {
        it("should provide the Auth0 AuthenticationClient", async () => {
            const module = await Test.createTestingModule({
                imports: [Auth0AuthenticationModule.forRoot({ 
                    domain, 
                    clientId,
                    clientSecret,
                })],
            }).compile();

            const authenticationClient = module.get<AuthenticationClient>(AUTH0_AUTHENTITCATION_TOKEN);
            expect(authenticationClient).toBeDefined();
            expect(authenticationClient).toBeInstanceOf(AuthenticationClient);
        });
    });

    describe("forRootAsync", () => {
        describe("when the `useFactory` option is used", () => {
            it("should provide the Auth0 AuthenticationClient", async () => {
                const module = await Test.createTestingModule({
                    imports: [
                        Auth0AuthenticationModule.forRootAsync({
                            useFactory: () => ({ domain, clientId, clientSecret }),
                        }),
                    ],
                }).compile();

                const authenticationClient = module.get<AuthenticationClient>(AUTH0_AUTHENTITCATION_TOKEN);
                expect(authenticationClient).toBeDefined();
                expect(authenticationClient).toBeInstanceOf(AuthenticationClient);
            });
        });

        describe("when the `useExisting` option is used", () => {
            it("should provide the Auth0 AuthenticationClient", async () => {
                const module = await Test.createTestingModule({
                    imports: [
                        Auth0AuthenticationModule.forRootAsync({
                            imports: [TestModule],
                            useExisting: TestService,
                        }),
                    ],
                }).compile();

                const authenticationClient = module.get<AuthenticationClient>(AUTH0_AUTHENTITCATION_TOKEN);
                expect(authenticationClient).toBeDefined();
                expect(authenticationClient).toBeInstanceOf(AuthenticationClient);
            });
        });

        describe("when the `useClass` option is used", () => {
            it("should provide the Auth0 AuthenticationClient", async () => {
                const module = await Test.createTestingModule({
                    imports: [
                        Auth0AuthenticationModule.forRootAsync({
                            useClass: TestService,
                        }),
                    ],
                }).compile();

                const authenticationClient = module.get<AuthenticationClient>(AUTH0_AUTHENTITCATION_TOKEN);
                expect(authenticationClient).toBeDefined();
                expect(authenticationClient).toBeInstanceOf(AuthenticationClient);
            });
        });
    });
});