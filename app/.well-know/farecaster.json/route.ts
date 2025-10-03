function withValidProperties(properties: Record<string, undefined | string | string[]>) {
    return Object.fromEntries(
        Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
    );
}

export async function GET() {
    const URL = process.env.NEXT_PUBLIC_URL as string;
    return Response.json({
        "accountAssociation": {
            "header": "",
            "payload": "",
            "signature": ""
        },
        "baseBuilder": {
            "allowedAddresses": [""]
        },
        "miniapp": {
            "version": "1",
            "name": "Split Safe",
            "homeUrl": "https://baseapp-iota.vercel.app/",
            "iconUrl": "https://baseapp-iota.vercel.app/icon.png",
            "splashImageUrl": "https://baseapp-iota.vercel.app/splash.png",
            "splashBackgroundColor": "#000000",
            "webhookUrl": "https://baseapp-iota.vercel.app/api/webhook",
            "subtitle": "Fast, fun, social",
            "description": "A fast, fun way to challenge friends in real time.",
            "screenshotUrls": [
                "https://baseapp-iota.vercel.app/s1.png",
                "https://baseapp-iota.vercel.app/s2.png",
                "https://baseapp-iota.vercel.app/s3.png"
            ],
            "primaryCategory": "social",
            "tags": ["example", "miniapp", "baseapp"],
            "heroImageUrl": "https://baseapp-iota.vercel.app/og.png",
            "tagline": "Play instantly",
            "ogTitle": "Split Safe",
            "ogDescription": "Challenge friends in real time.",
            "ogImageUrl": "https://baseapp-iota.vercel.app/og.png",
            "noindex": true
        }
    }); // see the next step for the manifest_json_object
}