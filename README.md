This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, create .env file, you can copy it from .env.example file and change the `API_TOKEN` with yours:

```bash
cp -R .env.example .env
```

Second, install the dependencies:

```bash
npm run install
# or
yarn install
```

After that, run the seeder command to input data to CRUDCRUD endpoints:

```bash
make data-import
# this command should logging success message in your terminal
# if this command not work, please run the command in Makefile manually :)
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Once you open it, you will redirected to the product list page.

### Announcements

1. This Frontend application already using redux to caching the product list data, so you need to hit refresh button manually to refresh the data. Delete / adding new data will automatically refresh the data
2. All of the image you input when adding new product will stored in `/public/images/uploads` directory and it will not push to the Github
3. This Frontend application already implementing clean-code and DRY principles with Typescript
4. This Frontend application already implementing responsive UI/UX
