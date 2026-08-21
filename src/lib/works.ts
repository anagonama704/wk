import { getDb } from "./firebase";
import type { WorkItem } from "@/types/portfolio";

function normalizeWorkItem(
  id: string,
  data: FirebaseFirestore.DocumentData
): WorkItem {
  const others = data.others ?? "";
  return {
    id,
    name: data.name ?? "",
    others: typeof others === "string" ? others.replace(/<br\s*\/?>/gi, "\n") : "",
    info: data.info ?? "",
    image: data.image ?? "",
    period: data.period ?? "",
    link: data.link ?? "",
  };
}

export async function fetchWorks(): Promise<WorkItem[]> {
  const snapshot = await getDb().collection("works").get();
  return snapshot.docs.map((doc) => normalizeWorkItem(doc.id, doc.data()));
}
