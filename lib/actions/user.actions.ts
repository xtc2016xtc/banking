"use server"

import { ID } from 'node-appwrite'
import {cookies} from "next/headers";
import {createAdminClient, createSessionClient} from "@/lib/appwrite";
import {parseStringify} from "@/lib/utils";

export const signIn = async ({email,password}:signInProps) => {
    try {
      const { account } = await createAdminClient();
      const response = await account.
      createEmailPasswordSession(email, password);

      return parseStringify(response);
    }catch (error) {
    console.log(error,'Error')
  }
}

export const signUp = async (userData:SignUpParams) => {
  const { email,password,firstName,lastName } = userData

  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
        ID.unique(),
        userData.email,
        userData.password,
        `${firstName} ${lastName}`
    );
    const session = await account.
    createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  }catch (error) {
    console.log(error,'Error')
  }
}

export async function getLoggedInUser() {
  try {
    const {account} = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);

  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    return null;
  }
}


