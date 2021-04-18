import Services from "../services";
import { navigate } from "@reach/router";
import { useContext, useEffect } from "react";
import { LogedInActionType, LogedInUser } from "../providers/loged-in-user";
import { User, Email, Password, Credentials } from "../entities";

export default function useLogin(credentials: Credentials | null): User | null {
  const { loginService } = useContext(Services);
  const { dispatch, state = { user: null } } = useContext(LogedInUser);

  useEffect(() => {
    if (!credentials || !dispatch) {
      return;
    }

    try {
      loginService
        .login(
          Email.check({ value: credentials.email }),
          Password.check({ value: credentials.password })
        )
        .then((user: User) =>
          dispatch!({ type: LogedInActionType.LOG_IN, payload: user })
        )
        .then(() => navigate("/"))
        .catch((e) => alert(e.message));
    } catch (e) {
      alert(e);
    }
  }, [credentials, dispatch, loginService]);

  return state.user;
}
