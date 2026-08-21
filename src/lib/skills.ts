import { getDb } from "./firebase";
import type { SkillItem } from "@/types/portfolio";

function normalizeSkillItem(
  id: string,
  data: FirebaseFirestore.DocumentData
): SkillItem {
  return {
    id,
    name: data.name ?? "",
    content: data.content ?? "",
    image: data.image ?? "",
    level: data.levels ?? 0,
    levelstyle: data.levelstyle ?? false,
  };
}

export async function fetchSkills(): Promise<SkillItem[]> {
  const snapshot = await getDb().collection("skils").get();
  return snapshot.docs.map((doc) => normalizeSkillItem(doc.id, doc.data()));
}
