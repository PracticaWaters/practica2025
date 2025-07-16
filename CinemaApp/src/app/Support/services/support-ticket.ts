export interface SupportTicket {
  id: number;
  message: string;
  name: string;
  email: string;
  status: boolean;
  createdAt: string;
  selectat?: boolean;
}
