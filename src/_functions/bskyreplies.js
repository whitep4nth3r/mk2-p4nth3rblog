let cachedSession = null;
let authPromise = null;
/*
cachedSession shape:
{
  accessJwt: string,
  expiresAt: number (ms timestamp)
}
*/

async function authenticate() {
  const identifier = "whitep4nth3r.com";
  const password = process.env.BSKY_APP_PASSWORD;

  if (!identifier || !password) {
    throw new Error("Missing Bluesky credentials");
  }

  const res = await fetch("https://bsky.social/xrpc/com.atproto.server.createSession", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Auth failed: ${text}`);
  }

  const session = await res.json();
  const now = Date.now();

  cachedSession = {
    accessJwt: session.accessJwt,
    // Prefer expiresAt if provided, fallback to conservative TTL
    expiresAt: session.expiresAt ? new Date(session.expiresAt).getTime() : now + 1000 * 60 * 110,
  };

  return cachedSession.accessJwt;
}

async function getCachedSession() {
  const now = Date.now();

  if (cachedSession && cachedSession.expiresAt > now + 60_000) {
    return cachedSession.accessJwt;
  }

  if (!authPromise) {
    authPromise = authenticate().finally(() => {
      authPromise = null;
    });
  }

  return authPromise;
}

function filterHiddenRepliesByThreadGate(data) {
  if (!data.thread || !Array.isArray(data.thread.replies)) return data.thread;
  const hiddenPostUris = data.threadgate?.record.hiddenReplies;
  const filteredReplies = data.thread.replies.filter((r) => !hiddenPostUris.includes(r.post?.uri));

  return {
    thread: {
      ...data.thread,
      replies: filteredReplies,
    },
  };
}

export const handler = async (event) => {
  const postUri = event.queryStringParameters?.postUri;

  if (!postUri) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Missing postUri query parameter" }),
    };
  }

  try {
    let accessJwt = await getCachedSession();

    let apiRes = await fetch(
      `https://bsky.social/xrpc/app.bsky.feed.getPostThread?uri=${encodeURIComponent(postUri)}`,
      {
        headers: {
          Authorization: `Bearer ${accessJwt}`,
        },
      },
    );

    // Retry once if token expired early
    if (apiRes.status === 401) {
      cachedSession = null;
      accessJwt = await getCachedSession();

      apiRes = await fetch(`https://bsky.social/xrpc/app.bsky.feed.getPostThread?uri=${encodeURIComponent(postUri)}`, {
        headers: {
          Authorization: `Bearer ${accessJwt}`,
        },
      });
    }

    if (!apiRes.ok) {
      const text = await apiRes.text();
      return {
        statusCode: apiRes.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Failed to fetch post thread",
          details: text,
        }),
      };
    }

    let data = await apiRes.json();

    if (data?.threadgate?.record?.hiddenReplies.length > 0) {
      data = filterHiddenRepliesByThreadGate(data);
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Unexpected error",
        message: err.message,
      }),
    };
  }
};
