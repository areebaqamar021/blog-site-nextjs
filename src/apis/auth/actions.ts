"use server"

import { auth, signIn, signOut } from "@src/lib"
import { AuthInput } from "./dto"

export const signInAction = async (props: AuthInput) => {
    await signIn(props.type, props.input)
}

export const signOutAction = async () => {
    await signOut()
}

export const getUser = async () => {
    return (await auth())?.user
}
