import { sendRedirect } from "h3";
import { defineAuthHandlers } from "@zoobz-io/rampart/server";

const stubUser = { id: "example-user" };

export default defineAuthHandlers({
  me: (_event, session) => session,
  login: (event) => sendRedirect(event, "/auth/login/callback"),
  callback: async (_event, { setSession }) => {
    await setSession({ user: stubUser });
  },
  logout: () => {},
});
