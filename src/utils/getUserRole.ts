import { UserRoles } from '@/types/user';

export default function getUserRole(role: string): string {
  return UserRoles[role as keyof typeof UserRoles] ?? 'otro';
}
