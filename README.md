This is a [Next.js](https://nextjs.org) project of Pocket Knowledge Bot deployed on Vercel, an OpenAI-powered MVP of virtual assistant chatbot providing answers based local storage knowledge base.

User can manually edit their own knowledge base up to 10 facts (to avoid massive prompt which would generate accidentally high charge from OpenAI).

## Getting Started

Before starting local development server, configure the necessary environment for OpenAI API access.

Create config file ".env.local", with the following content:
```
OPENAI_API_KEY=sk-xxxx // Your own OpenAI API Key
OPENAI_MODEL=gpt-xxxx // Select an OpenAI model, default model is "gpt-4o-mini"
```

To run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

Before deployment, make sure any ".env.*" environment variables config file is included in the file types listed in ".gitignore" so that no important credential like API key is made public to access by others. Add back those environment variables to the platform manually.