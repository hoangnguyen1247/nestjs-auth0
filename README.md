<p align="center">
  <h3 align="center">
    nestjs-auth0
  </h3>

  <p align="center">
    Injectable Auth0 Authentication client for your nestjs projects
  </p>

</p>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [About](#about)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Example](#example)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## About

`nestjs-auth0` implements a module, `Auth0Module`, which when imported into
your nestjs project provides a Auth0 AuthenticationClient to any class that injects it. This
lets Auth0 be worked into your dependency injection workflow without having to
do any extra work outside of the initial setup.

## Installation

```bash
npm install --save auth0 nestjs-auth0
```

## Getting Started

The simplest way to use `nestjs-auth0` is to use `Auth0Module.forRoot`

```typescript
import { Module } from '@nestjs-common';
import { Auth0AuthenticationModule } from 'nestjs-auth0';

@Module({
  imports: [
    Auth0AuthenticationModule.forRoot({
      domain: '',
      client_id: '',
      client_secret: '',
    }),
  ],
})
export class AppModule {}
```

You can then inject the Auth0 AuthenticationClient into any of your injectables by using a
custom decorator

```typescript
import { Injectable } from '@nestjs/common';
import { InjectAuthenticationClient } from 'nestjs-auth0';
import { AuthenticationClient } from 'auth0';

@Injectable()
export class AppService {
  public constructor(@InjectAuthenticationClient() private readonly authenticationClient: AuthenticationClient) {}
}
```

Asynchronous setup is also supported

```typescript
import { Module } from '@nestjs-common';
import { Auth0AuthenticationModule } from 'nestjs-auth0';

@Module({
  imports: [
    Auth0AuthenticationModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        domain: configService.get('auth0_domain'),
        client_id: configService.get('auth0_client_id'),
        client_secret: configService.get('auth0_client_secret'),
      }),
    }),
  ],
})
export class AppModule {}
```

## Example

In order to run the example run the following commands in your terminal. The
expected output of the example is to show that the Auth0 AuthenticationClient was
successfully injected into the `AppService`.

```bash
cd example
npm install
npm run start
```

## Contributing

I would greatly appreciate any contributions to make this project better. Please
make sure to follow the below guidelines before getting your hands dirty.

1. Fork the repository
2. Create your branch (`git checkout -b my-branch`)
3. Commit any changes to your branch
4. Push your changes to your remote branch
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [nestjs](https://nestjs.com)
- [node-auth0](https://github.com/auth0/node-auth0)

Copyright &copy; 2022 Hoàng Nguyễn
