import { Student } from "./student.interface";
import { Teacher } from "./teacher.interface";

export interface Classes {
  id: Number;
  name: String;
  credits?: Number;
  students?: Student[]
  teacher?:Teacher;
}
