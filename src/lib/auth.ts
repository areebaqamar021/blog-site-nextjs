import NextAuth, { CredentialsSignin } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { db } from "./db"
import { User } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt"
declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
  constructor(message: string) {
    super(message)
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    CredentialProvider({
      name: "Login",
      id: "login",
      credentials: {
        email: { name: "email", label: "Email", required: true },
        password: { name: "password", label: "Password", required: true, type: "password" }
      },
      authorize: async (request) => {
        const email = request.email as string
        const password = request.password as string
        const user = await db.user.findUnique({ where: { email } })
        if (!user) {
          throw new InvalidLoginError("User not found.")
        } else if (user.password !== password) {
          throw new InvalidLoginError("Wrong Password.")
        }
        return user
      }
    }),
    CredentialProvider({
      name: "Sign Up",
      id: "signup",
      credentials: {
        name: { name: "name", label: "Name", required: true },
        email: { name: "email", label: "Email", required: true },
        password: { name: "password", label: "Password", required: true, type: "password" }
      },
      authorize: async (request) => {
        const email = request.email as string
        const password = request.password as string
        const name = request.name as string
        const user = await db.user.create({
          data: {
            name,
            email,
            password
          }
        })
        return user
      }
    }),
    GoogleProvider({

    }),
  ],
  callbacks: {
    jwt: ({ token, user, account }) => {
      if (account?.provider && ["signup", "login"].includes(account.provider) && user) {
        token.user = {
          ...user,
          id: (user.id)
        } as User
      }
      return token
    },
    session: ({ session, token }) => {
      return { ...session, user: { ...session.user, ...token.user } }
    }
  },
  session: {
    strategy: "jwt"
  }
})