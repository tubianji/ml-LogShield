self.addEventListener('message', async (event) => {
  const { prefix, difficulty, startNonce, numWorkers } = event.data;

  const nonce = await calculateNonce(prefix, difficulty, startNonce, numWorkers);
  self.postMessage({ nonce });
});

function calculateNonce(prefix, difficulty, startNonce, numWorkers) {
  return new Promise((resolve) => {
    let nonce = startNonce;
    const chunkSize = 1000;

    const processChunk = () => {
      for (let i = 0; i < chunkSize; i++) {
        const currentNonce = nonce + i * num