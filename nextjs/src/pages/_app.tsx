import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "@/server/routers/_app";
import { Session } from 'next-auth';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.NEXTAUTH_URL
                ? `http://${process.env.NEXTAUTH_URL}/api/trpc`
                : `http://localhost:3000/api/trpc`;

    return {
      url,
      headers: {
        "x-ssr": "1"
      },
    };
  },
  ssr: true
})(MyApp);