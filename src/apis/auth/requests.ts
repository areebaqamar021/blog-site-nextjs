import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, signInAction, signOutAction } from "./actions";
import { AuthInput } from "./dto";

export const useAuth = () => useMutation<void, string, AuthInput>({
    mutationKey: ["auth"],
    mutationFn: async (props) => await signInAction(props)
})

export const useSignout = () => useMutation({
    mutationKey: ["signout"],
    mutationFn: signOutAction
})

export const useUser = () => useQuery({
    queryKey: ["user"],
    queryFn: getUser
})