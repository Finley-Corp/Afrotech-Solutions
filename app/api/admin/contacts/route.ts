import { getAdminContacts } from "@/lib/admin-data";
import { adminJson, requireAdmin } from "@/lib/admin-api";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const items = await getAdminContacts();
    return adminJson({ items });
  } catch (error) {
    console.error("[admin/contacts]", error);
    return adminJson({ items: [] });
  }
}
