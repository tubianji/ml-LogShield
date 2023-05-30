
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function submitResult(prefix, nonce, difficulty) {
  const targetUrl = `${window.location.origin}/verify-ray`;
  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prefix, nonce, difficulty }),
  });

  return response.ok;
}
