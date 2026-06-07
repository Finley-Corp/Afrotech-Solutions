import { deleteNewsletterSubscriber, getAdminNewsletter } from "@/lib/admin-data";
import { adminJson, requireAdmin } from "@/lib/admin-api";
import { revalidateTag } from "next/cache";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const items = await getAdminNewsletter();
    return adminJson({ items });
  } catch (error) {
    console.error("[admin/newsletter]", error);
    return adminJson({ items: [] });
  }
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { id } = await request.json();
    if (!id || typeof id !== "string") {
      return adminJson({ error: "Missing id" }, 400);
    }

    const ok = await deleteNewsletterSubscriber(id);
    if (!ok) {
      return adminJson({ error: "Delete failed" }, 500);
    }

    revalidateTag("admin");
    return adminJson({ ok: true });
  } catch (error) {
    console.error("[admin/newsletter DELETE]", error);
    return adminJson({ error: "Invalid request" }, 400);
  }
}
