import { supabase } from "@/libs/supabase";
import { useQuery } from "@tanstack/react-query";

import { useSession } from '@/providers/session';
import { Profile } from "@/types/profile";

export function useProfile() {
  const  session  = useSession();
  const user = session?.user;
  const query = useQuery({
    queryKey: [`profile/${user?.id}`],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (error) {
        // no rows - edge case of user being deleted
        if (error.code === "PGRST116") {
          await supabase.auth.signOut();
          return null;
        }
        throw new Error(error.message);
      }
      return data as Profile | null;
    },
  });

  return { ...query };
}
