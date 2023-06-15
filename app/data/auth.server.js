import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { hash, compare } from "bcryptjs";
import { prisma } from "./database.server";

const SESSION_SECRET = process.env.SESSION_SECRET;
const sessionStorage = createCookieSessionStorage({
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        secrets: [SESSION_SECRET],
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, //7 days
        httpOnly: true
    }
});

async function createUserSession(userId, redirectPath) {
    const session = await sessionStorage.getSession();
    session.set('user', userId);
    return redirect(redirectPath, {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session),
        },
    });
}

export async function getUserFromSession(request) {
    const session = await sessionStorage.getSession(
        request.headers.get('Cookie')
    );

    const userId = session.get('user');
    if (!userId) {
        return null;
    }
    return userId;
}

export async function destroyUserSession(request) {
    const session = await sessionStorage.getSession(
        request.headers.get('Cookie')
    );

    return redirect('/login', {
        headers: {
            'Set-Cookie': await sessionStorage.destroySession(session),
        },
    })
}

export async function requireUserSession(request) {
    const userId = await getUserFromSession(request);
    if (!userId) {
        throw redirect('/login');
    }

    return userId;
}

export async function signup({ username, password, role }) {
    const existingUser = await prisma.pengguna.findFirst({ where: { username } });

    if (existingUser) {
        const error = new Error('Username must unique');
        error.status = 422;
        throw error;
    }

    const passwordHash = await hash(password, 12)
    try {
        return await prisma.pengguna.create({
            data: {
                username: username,
                password: passwordHash,
                role: role,
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error('cant create to Pengguna');
    }
}

export async function login({ username, password }) {
    const existingUser = await prisma.pengguna.findFirst({ where: { username } });
    if (!existingUser) {
        const error = new Error('Cannot login, please check the provided credentials.');
        error.status = 401;
        throw error;
    }

    const passwordCorrect = await compare(password, existingUser.password);
    if (!passwordCorrect) {
        const error = new Error('Wrong password, please check the provided credentials.');
        error.status = 401;
        throw error;
    }

    return createUserSession(existingUser, '/');
}

export async function getPengguna() {
    try {
        const user = await prisma.pengguna.findMany();
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Pengguna');
    }
}

export async function getPenggunaId(id) {
    try {
        const user = await prisma.pengguna.findFirst({
            where: { id }
        });
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Pengguna Id');
    }
}

export async function deletePengguna(id) {
    try {
        return await prisma.pengguna.delete({
            where: { id }
        })
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete Pengguna');
    }
}