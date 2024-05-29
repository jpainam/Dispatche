import { SessionContext } from "@/providers/auth";
import { useContext } from "react";

export const useSessionContext = () => useContext(SessionContext);
