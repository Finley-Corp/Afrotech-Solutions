import { getAdminStats } from "@/lib/admin-data";
import { adminJson, requireAdmin } from "@/lib/admin-api";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const stats = await getAdminStats();
    return adminJson(stats);
  } catch (error) {
    console.error("[admin/stats]", error);
    return adminJson({ quotations: 0, contacts: 0, newsletter: 0 });
  }
}
