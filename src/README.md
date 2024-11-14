# Books Library API

This project is a Books Library API built with NestJS. Below is a description of the key files and their functionality.

## Files Description

### `src/users/users.service.ts`

This file contains the `UsersService` class, which provides methods to manage users, such as creating a new user and finding a user by username.

### `src/users/users.module.ts`

This file defines the `UsersModule`, which imports the necessary modules and provides the `UsersService` to be used in other parts of the application.

### `src/users/user.entity.ts`

This file defines the `User` entity, which represents a user in the database. It includes fields for `id`, `username`, and `password`.

### `src/users/dto/login-user.dto.ts`

This file defines the `LoginUserDto` class, which is a Data Transfer Object (DTO) used for user login. It includes validation rules for `username` and `password`.

### `src/users/dto/create-user.dto.ts`

This file defines the `CreateUserDto` class, which is a DTO used for creating a new user. It includes validation rules for `username` and `password`.

### `src/auth/jwt.strategy.ts`

This file contains the `JwtStrategy` class, which is used to validate JWT tokens. It checks if the user exists and is authorized.

### `src/auth/jwt-auth.guard.ts`

This file defines the `JwtAuthGuard` class, which is a guard that uses the JWT strategy to protect routes.

### `src/auth/auth.service.ts`

This file contains the `AuthService` class, which provides methods for user authentication, such as validating a user, logging in, and registering a new user.

### `src/auth/auth.module.ts`

This file defines the `AuthModule`, which imports the necessary modules and provides the `AuthService` and `JwtStrategy` to be used in other parts of the application.

### `src/auth/auth.controller.ts`

This file contains the `AuthController` class, which defines the authentication endpoints for registering and logging in users. It includes the following endpoints:

- `POST /auth/register`: Registers a new user.
- `POST /auth/login`: Logs in an existing user and returns a JWT token.

### `src/books/books.service.ts`

This file contains the `BooksService` class, which provides methods to manage books, such as creating a new book, finding books, updating a book, and deleting a book.

### `src/books/books.module.ts`

This file defines the `BooksModule`, which imports the necessary modules and provides the `BooksService` to be used in other parts of the application.

### `src/books/books.entity.ts`

This file defines the `Book` entity, which represents a book in the database. It includes fields for `id`, `title`, `author`, `description`, `publicationDate`, and `category`.

### `src/books/dto/create-book.dto.ts`

This file defines the `CreateBookDto` class, which is a DTO used for creating a new book. It includes validation rules for `title`, `author`, `description`, `publicationDate`, and `category`.

### `src/books/dto/update-book.dto.ts`

This file defines the `UpdateBookDto` class, which is a DTO used for updating an existing book. It includes validation rules for `title`, `author`, `description`, `publicationDate`, and `category`.

### `src/books/books.controller.ts`

This file contains the `BooksController` class, which defines the endpoints for managing books. It includes the following endpoints:

- `POST /books`: Creates a new book.
- `GET /books`: Retrieves a list of all books.
- `GET /books/:id`: Retrieves a specific book by its ID.
- `PUT /books/:id`: Updates an existing book by its ID.
- `DELETE /books/:id`: Deletes a book by its ID.
