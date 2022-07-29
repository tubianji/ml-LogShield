target='http://localhost:7000'
duration=60

echo '============================================='
echo '========== Stress Testing Mass GET =========='
echo '============================================='
echo ''
echo '--- Concurrent Connections: 64 ---'
loadtest $target -t $duration -c 64 -r
echo ''
echo '--- Concurrent Connections: 128 ---'
loadtest $target -t $duration -c 128 -r
echo ''
echo '--- Concurrent Connections: 256 ---'
loadtest $target -t $duration -c 256 -r
echo ''
echo '--- Concurrent Connections: 512 ---'
loadtest $target -t $duration -c 512 -r
echo ''
echo '--- Concurrent Connections: 1024 ---'
loadtest $target -t $duration -c 1024 -r
echo ''
echo '--- Concurrent Connections: 2048 ---'
loadtest $target -t $duration -c 2048 -r
echo ''
echo '--- Concurrent Connections: 4096 ---'
loadtest $target -t $duration -c 4096 -r
echo ''
echo '============================================='
echo '=== Stress Testing Nonce Submission Flood ==='
echo '============================================='
echo ''
echo '--- Concurrent Connections: 64 ---'
loadtest $target/pow -t $duration -c 64 -r -m POST -P '{"type":"Buffer","data":[0,0,1,127,8,25,226,45,246,166,45,51,5,64,236,27]}'
echo ''
echo '--- Concurrent Connections: 128 ---'
loadtest $target/pow -t $duration -c 128 -r