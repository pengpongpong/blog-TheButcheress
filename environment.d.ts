declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_PROJECT_ID: string;
            NEXT_PUBLIC_DATASET: "production";
            NEXT_PUBLIC_API_VERSION: "2023-04-24";
            NEXT_PUBLIC_MONGO_URI: string;
            NEXT_PUBLIC_EMAIL: "test";
            NEXTAUTH_SECRET: string;
            NEXTAUTH_URL: string;
            AWS_ACCESS_KEY: string;
            AWS_SECRET_ACCESS_KEY: string
        }
    }
}