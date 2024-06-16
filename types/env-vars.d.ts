declare namespace NodeJS {
  export interface ProcessEnv {
    MONGODB_URI?: string;

    NEXTAUTH_URL?: string;
    NEXTAUTH_URL_INTERNAL?: string;
    NEXTAUTH_SECRET?: string;

    GITHUB_ID?: string;
    GITHUB_SECRET?: string;

    GOOGLE_ID?: string;
    GOOGLE_SECRET?: string;

    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?: string;
    NEXT_PUBLIC_CLOUDINARY_PRESET_NAME?: string;

    NEXT_PUBLIC_TINY_MCE?: string;
  }
}
