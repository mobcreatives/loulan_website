export type TContactDetails = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: TStatus;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

export type TStatus = "NEW" | "RESPONDED" | "CLOSED";

export type TToggleStatusArgs = {
  id: number;
  status: TStatus;
};
