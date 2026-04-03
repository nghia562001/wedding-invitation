import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/supabase";

export const dynamic = "force-dynamic";

const TABLE_NAME = "wishes";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const limit = Math.max(Number(searchParams.get("limit") || 2), 1);

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabaseAdmin
      .from(TABLE_NAME)
      .select("*", { count: "exact" })
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("GET /api/wishes error:", error);
      return NextResponse.json(
        { error: "Không thể tải danh sách lời chúc." },
        { status: 500 }
      );
    }

    const total = count ?? 0;
    const totalPages = Math.max(Math.ceil(total / limit), 1);

    return NextResponse.json({
      items: data ?? [],
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("GET /api/wishes unexpected error:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi tải lời chúc." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body?.name || "").trim();
    const phone = String(body?.phone || "").trim();
    const message = String(body?.message || "").trim();
    const isAttending = Boolean(body?.isAttending ?? true);

    if (!name || !message) {
      return NextResponse.json(
        { error: "Vui lòng nhập tên và lời chúc." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from(TABLE_NAME)
      .insert([
        {
          name,
          phone: phone || null,
          message,
          is_attending: isAttending,
          is_approved: true, // để gửi xong hiển thị luôn
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("POST /api/wishes error:", error);
      return NextResponse.json(
        { error: "Không thể gửi lời chúc." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      item: data,
      message: "Gửi lời chúc thành công.",
    });
  } catch (error) {
    console.error("POST /api/wishes unexpected error:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi gửi lời chúc." },
      { status: 500 }
    );
  }
}