import { TypographyH2 } from "@/components/ui/typography";
import { UsersTable } from "@/components/ui/user-table";

export default function AdminUsersPage() {
  return (
    <>
      <TypographyH2>User</TypographyH2>
      <UsersTable />
    </>
  );
}
