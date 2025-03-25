import 'next';

declare module 'next' {
  export type PageProps = {
    params: Record<string, string>;
    searchParams?: { [key: string]: string | string[] | undefined };
  };
}