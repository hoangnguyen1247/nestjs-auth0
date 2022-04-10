import { Injectable } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationClient } from "auth0";
import { InjectAuthenticationClient } from "./auth0.decorators";
import { Auth0AuthenticationModule } from "./auth0.module";

describe("InjectAuthenticationClient", () => {
    const domain = "test";
    const clientId = "test";
    const clientSecret = "test";
    let module: TestingModule;

    @Injectable()
    class TestService {
        public constructor(@InjectAuthenticationClient() public readonly auth0AuthenticationClient: AuthenticationClient) { }
    }

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                Auth0AuthenticationModule.forRoot({ 
                    domain: domain, 
                    clientId,
                    clientSecret,
                }),
            ],
            providers: [TestService],
        }).compile();
    });

    describe("when decorating a class constructor parameter", () => {
        it("should inject the Auth0 AuthenticationClient", () => {
            const testService = module.get(TestService);
            expect(testService).toHaveProperty("auth0AuthenticationClient");
            expect(testService.auth0AuthenticationClient).toBeInstanceOf(AuthenticationClient);
        });
    });
});