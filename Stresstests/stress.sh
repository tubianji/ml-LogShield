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
echo '--- Concurrent Connections: 1024 ---