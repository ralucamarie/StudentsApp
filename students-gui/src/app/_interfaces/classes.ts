import { Student } from "./student.interface";

export interface Classes {
  id: Number;
  name: String;
  credits?: Number;
  students?: Student[]
}
