import  prisma from '@/lib/prisma';
import { object, string, TypeOf } from "zod";

const HookBodySchema = object({
    email: string(),
    secret: string(),
});

export const POST = async (req: Request) => {
    const { secret, email}: TypeOf<typeof HookBodySchema> = await req.json();


    if (req.method !== 'POST') {
        return Response.json({ message: 'Method not allowed' }, { status: 403 })
    }

    if (secret !== process.env.AUTH0_HOOK_SECRET) {
        return Response.json({ message: `You must provide the secret 🤫` }, { status: 403 });
    }

    if (email) {

        await prisma.user.create({
            data: { email },
        });
        return Response.json({
            message: `User with email: ${email} has been created successfully!`,
        });
    }
}