import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    name: "Wahyu Syahputra",
    role: "Admin",
    createdAt: "2 August",
  },
];

export function UsersTable() {
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
