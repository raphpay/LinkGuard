export default interface ISubscriptionPlan {
  id?: string;
  name: Name;
  price: number;
  maxUrls: number;
  scanFrequency: ScanFrequency;
}

export enum Name {
  free = "free",
  starter = "starter",
  pro = "pro",
  team = "team",
}

export enum ScanFrequency {
  daily = "daily",
  weekly = "weekly",
  monthly = "monthly",
}
