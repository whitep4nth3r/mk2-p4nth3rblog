async function authenticate() {
  const identifier = "whitep4nth3r.com";
  const password = process.env.BSKY_APP_PASSWORD;

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

  return session.accessJwt;
}

function sortByCreatedAt(a, b) {
  if (a.post.record.createdAt > b.post.record.createdAt) {
    return 1;
  }

  if (b.post.record.createdAt > a.post.record.createdAt) {
    return -1;
  }

  return 0;
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

exports.handler = async (event) => {
  const postUri = event.queryStringParameters?.postUri;

  if (!postUri) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Missing postUri query parameter" }),
    };
  }

  try {
    let accessJwt = await authenticate();

    let apiRes = await fetch(
      `https://bsky.social/xrpc/app.bsky.feed.getPostThread?uri=${encodeURIComponent(postUri)}`,
      {
        headers: {
          Authorization: `Bearer ${accessJwt}`,
        },
      },
    );

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

    const sortedReplies = data.thread.replies.sort(sortByCreatedAt);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, thread: { ...data.thread, replies: sortedReplies } }),
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
