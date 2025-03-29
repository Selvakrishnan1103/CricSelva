import { connectToMongoDb } from "@/lib/mongodb"
import User from "@/models/User";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    session : { strategy : "jwt"},
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret : process.env.NEXTAUTH_SECRET,
    callbacks : {
        async signIn( { user }){
            await connectToMongoDb();
            const existingUser = await User.findOne({ email : user.email})
            if(!existingUser){
                await User.create({ name : user.name , email : user.email})
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                name: token.name,
                email: token.email,
            };
            return session;
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET , handler as POST}