import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { mysqlTable } from "~/server/db/schema";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, mysqlTable),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
