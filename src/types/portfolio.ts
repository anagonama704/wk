export interface WorkItem {
  id: string;
  image: string;
  name: string;
  others: string;
  info: string;
  period: string;
  link: string;
}

export interface SkillItem {
  id: string;
  name: string;
  image: string;
  level: number;
  levelstyle: boolean;
  content: string;
}

export interface ContactFormData {
  mailName: string;
  mailFrom: string;
  mailTxt: string;
}
