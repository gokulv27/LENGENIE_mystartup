import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/payment/confirm
 * Alchemy webhook for on-chain USDT payment confirmation.
 * Alchemy sends a JSON payload when activity is detected on the wallet address.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Alchemy webhook event — check for EXTERNAL_TX or TOKEN_ACTIVITY event
    const event = body?.event;
    const activity = event?.activity?.[0];

    if (!activity) {
      return NextResponse.json({ error: "No activity data" }, { status: 400 });
    }

    const { fromAddress, toAddress, value, asset } = activity;

    // Validate the transaction is to our wallet
    const WALLET = "BXa6QNeVGgXKCuMVzikvDgLDfjKaA4gQXpLp9jErLrdj";
    if (toAddress?.toLowerCase() !== WALLET.toLowerCase()) {
      return NextResponse.json({ error: "Wrong recipient" }, { status: 400 });
    }

    // Log confirmed payment
    console.log(`✅ Payment confirmed:`, {
      from: fromAddress,
      amount: value,
      asset,
      timestamp: new Date().toISOString(),
    });

    // TODO: Trigger onboarding email via your email service
    // TODO: Mark order as paid in your database
    // TODO: Send confirmation to client

    return NextResponse.json({
      success: true,
      message: "Payment confirmed",
      data: { from: fromAddress, amount: value, asset },
    });

  } catch (err) {
    console.error("Payment confirm error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
