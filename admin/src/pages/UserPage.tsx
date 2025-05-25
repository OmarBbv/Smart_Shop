import { Error } from "@/components/error";
import { Loading } from "@/components/loading";
import { Box } from "@/components/ui/Box";
import { CustomButton } from "@/components/ui/CustomButton";
import { Typography } from "@/components/ui/Typography";
import { UserTable } from "@/components/user/UserTable";
import { userService } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";

export default function UserPage() {
  const [refresh, setRefresh] = useState(0);
  const { data: allUser, isLoading, isError } = useQuery({
    queryKey: ['all/users', refresh],
    queryFn: () => userService.handleAllUser()
  })

  if (isLoading) return <Loading />
  if (isError) return <Error />

  return (
    <div className="container mx-auto">
      <Box className="flex items-center justify-between">
        <Typography className="mb-6 text-2xl font-bold">Team Members</Typography>
        <CustomButton
          onClick={() => setRefresh(prev => prev + 1)}
          className="px-2 py-0.5 bg-green-600 leading-5 text-white font-semibold rounded-sm flex items-center gap-2 justify-center cursor-pointer">
          <span>Yenilə</span>
          <RefreshCcw className="w-3 h-3" />
        </CustomButton>
      </Box>
      <UserTable allUser={allUser ?? []} />
    </div>
  )
}