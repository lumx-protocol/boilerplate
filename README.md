# **Welcome!**

This is a basic boilerplate setup made to quickly interact with [Lumx-Protocol](https://docs.lumx.io/get-started/introduction)

## Getting started

### CLI

To get your API key, contractId and itemTypeId head over to our [Documentation](https://docs.lumx.io/get-started/introduction) and generate them there.

The fastest way to get your project running is to use our [CLI](https://github.com/Lumx-Protocol/cli) and put the respective keys when asked to.

```npx @lumx-protocol/create-dapp@latest ```


### Manual

If you wish to clone this repository, make sure to follow these steps accordingly.

- Create a .env.local file and insert your api key on the `LUMX_API_KEY` variable
- On the root directory, go to the lumx.json file and replace the itemTypeId, contractId and clientId accordingly.

> Don't know what is your clientId? Given your API key, it's the sequence of numbers and letters after the slash.

```apiKey.split('/')[1] ```

## Running the project

First, run the development server, our default package manager is npm but feel free to choose your favorite.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to the working demo!

## Questions

To learn more about the boilerplate project, you can go to our (Documentation)[https://docs.lumx.io/get-started/introduction] or if you have any doubts feel free to reach us on our (Discord)[https://discord.gg/sSGvyywSKS]
