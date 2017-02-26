echo "=== process status"
ps -ef | grep 1_llisco.js
echo "=== qui escolta al port 3535 ?"
sudo netstat -ntpl | grep 3535
echo "=== Ara fes ... sudo kill -9 <pid>"
