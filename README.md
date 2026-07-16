# Chime Time

Chime Time is a React and TypeScript web application that displays an
animated digital clock synchronized to network time. It plays soft
audio chimes at configurable intervals and shows the offset between
your system clock and the NTP server. An embedded Express server
handles NTP queries over UDP and serves the application in both
development and production.

## Features

- Animated digit display using smooth spring transitions
- System clock synchronized against an NTP server
- Configurable chime intervals: quarterly, half-hourly, or hourly
- Responsive layout that adapts to any screen size
- Light and dark theme support via system preference

## Run Locally

### With just

1. Clone the repository.

    ```shell
    git clone https://github.com/sheeeng/chime-time.git
    cd chime-time
    ```

2. Install [just](https://github.com/casey/just).

3. Install dependencies.

    ```shell
    just install
    ```

4. Run the development server.

    ```shell
    just dev
    ```

5. Open your browser and navigate to the URL shown in the terminal.

    `http://localhost:3000`

### With npm

If you prefer not to install [just](https://github.com/casey/just),
use [npm](https://github.com/npm/cli) directly.

1. Clone the repository.

    ```shell
    git clone https://github.com/sheeeng/chime-time.git
    cd chime-time
    ```

2. Install dependencies.

    ```shell
    npm install
    ```

3. Run the development server.

    ```shell
    npm run dev
    ```

4. Open your browser and navigate to the URL shown in the terminal.

    `http://localhost:3000`

## Technology Stack

- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) version 4
- [Vite](https://vitejs.dev) 8
- [Express](https://expressjs.com) 5
- [motion](https://motion.dev) for animations
- [Lucide React](https://lucide.dev) for icons

## License

This work is dual licensed under the [Apache License 2.0](LICENSE-APACHE) and the [MIT License](LICENSE-MIT).

You may choose either license when you use this work.

`SPDX-License-Identifier: Apache-2.0 OR MIT`
