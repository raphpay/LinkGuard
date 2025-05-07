import ILinkResult from "./ILinkResult";

export default interface IScan {
  id?: string;
  input: string;
  createdAt: string;
  email?: string;
  user?: IUserID;
  linkResult: ILinkResult;
}

export interface IScanInput {
  input: string;
  userID: string;
}

export interface IScanInputWithoutAccount {
  input: string;
  email: string;
}

interface IUserID {
  id: string;
}
