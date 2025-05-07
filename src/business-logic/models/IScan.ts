import ILinkResult from "./ILinkResult";

export default interface IScan {
  id?: string;
  input: string;
  createdAt: string;
  email?: string;
  user?: IUserID;
  linkResult: ILinkResult;
}

interface IUserID {
  id: string;
}
