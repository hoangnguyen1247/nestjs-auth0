import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Auth0AuthenticationModule } from "nestjs-auth0";
import { AppService } from "./app.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        Auth0AuthenticationModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                domain: configService.get('auth0_domain'),
                clientId: configService.get('auth0_client_id'),
                clientSecret: configService.get('auth0_client_secret'),
            }),
        }),
    ],
    providers: [AppService],
})
export class AppModule {

}