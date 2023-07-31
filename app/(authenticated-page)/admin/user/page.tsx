import { TypographyH2 } from "@/components/ui/typography";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminStrukturPage() {
  return (
    <>
      <TypographyH2>User</TypographyH2>
      <UserTable />
    </>
  );
}

const users = [
  {
    name: "Wahyu Syahputra",
    role: "Admin",
    createdAt: "2 August",
  },
  {
    name: "Ogi Hendrikson",
    role: "User",
    createdAt: "2 August",
  },
];

export function UserTable() {
  return (
    <Table>
      <TableCaption>A list of recent users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Dibuat Pada</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.name}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
