"user client";
import { UserBasicType } from "@/types/basicUUType";
import { DEFAULT_COLORS } from "@/utils/colorsConstants";
import UserCard from "./components/userCard";

const users: UserBasicType[] = [
  {
    id: 1,
    name: "Luis",
    email: "luisfj_pr@hotmail.com",
    nrUes: 2,
  },
  {
    id: 2,
    name: "Rafaela",
    email: "rafa@hotmail.com",
    nrUes: 2,
    color: DEFAULT_COLORS[2],
  },
  {
    id: 3,
    name: "Cleomar",
    email: "teste@teste.com",
    nrUes: 2,
    color: null,
  },
  {
    id: 1,
    name: "Luis",
    email: "luisfj_pr@hotmail.com",
    nrUes: 2,
  },
  {
    id: 2,
    name: "Rafaela",
    email: "rafa@hotmail.com",
    nrUes: 2,
  },
  {
    id: 3,
    name: "Cleomar",
    email: "teste@teste.com",
    nrUes: 2,
  },
  {
    id: 2,
    name: "Rafaela",
    email: "rafa@hotmail.com",
    nrUes: 2,
  },
  {
    id: 3,
    name: "Cleomar",
    email: "teste@teste.com",
    nrUes: 2,
  },
  {
    id: 3,
    name: "Cleomar",
    email: "teste@teste.com",
    nrUes: 2,
  },
];

export default function UsersPage() {
  return (
    <div className="mt-10 w-full">
      <UserCard users={users} />
    </div>
  );
}
