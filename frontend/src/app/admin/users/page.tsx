import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Users, Shield, UserCheck, UserPlus } from "lucide-react";
import { UserSearch } from "~/components/user-search";

export default async function AdminUsersPage() {
  const session = await getServerAuthSession();

  // Check if user is authenticated
  if (!session?.user) redirect("/auth/signin");

  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/"); // Redirect non-admin users
  }

  const [users, stats] = await Promise.all([
    api.user.getAllUsers(),
    api.user.getUserStats(),
  ]);

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">
            User Management
          </h1>
          <p className="mt-1 text-neutral60 dark:text-neutral40">
            Manage user accounts and permissions
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Admin Only
        </Badge>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-neutral20 dark:border-neutral70">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral70 dark:text-neutral30">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-neutral60 dark:text-neutral40" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-white">
              {stats.total}
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral20 dark:border-neutral70">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral70 dark:text-neutral30">
              Administrators
            </CardTitle>
            <Shield className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-white">
              {stats.adminCount}
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral20 dark:border-neutral70">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral70 dark:text-neutral30">
              Verified Users
            </CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-white">
              {stats.verifiedCount}
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral20 dark:border-neutral70">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral70 dark:text-neutral30">
              Recent Users
            </CardTitle>
            <UserPlus className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-white">
              {stats.recentUsers}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users List with Search */}
      <UserSearch users={users} currentUserId={session.user.id} />
    </div>
  );
}
