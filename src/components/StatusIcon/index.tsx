import { FilterStatus } from "@/types/FilterStatus";
import { CircleDashed, CircleCheck } from "lucide-react-native";

export function StatusIcon({ status }: { status: FilterStatus }) {
  return status === FilterStatus.DONE ? (
    <CircleCheck size={20} color="#2c46b1"/> // Caso de status DONE, mostrar ícone de check
  ) : (
    <CircleDashed size={20} color="#000000"/> // Caso de status PENDING, mostrar ícone de dashed
  );
}
