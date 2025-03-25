import 'next';

declare module 'next' {
  export type PageProps<T extends Record<string, string> = {}> = {
    params: T;
    searchParams?: { [key: string]: string | string[] | undefined };
  };
}