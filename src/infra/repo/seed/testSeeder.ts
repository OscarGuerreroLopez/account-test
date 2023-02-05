import { AddAdminUser, AddUsers } from ".";
import { LoadMethods } from "../dbMethods";

export default async (): Promise<void> => {
  console.log("@@@loading data for test");
  await LoadMethods();
  await AddAdminUser();
  await AddUsers();
};
