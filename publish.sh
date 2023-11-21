
RED='\033[31m'
GREEN='\033[32m'
YELLOW='\033[33m'
BLUE='\033[34m'
RESET='\033[0m'
domain="stockbull.live"

if [ "$#" -ne 1 ]; then
    echo -e "${RED}Usage: $0 <COMMIT MESSAGE>${RESET}"
    exit 1
fi


if [ -z "$STOCKBUll_PASSWORD" ]; then
  echo 'Enter server password...'

  read STOCKBUll_PASSWORD

fi

commitMessage=$1
# npm run build

git add .

git commit -m "$commitMessage"

git push

ip_address=$(dig +short "$domain")

if [ -n "$ip_address" ]; then
  echo -e "IP address of ${BLUE}$domain${RESET} is ${YELLOW}$ip_address${RESET}"
  
  # SSH into the remote server and execute commands
  sshpass -p "$STOCKBUll_PASSWORD" ssh "root@$ip_address" '
    cd /var/www/frontend
    git stash
    git pull
  
    npm run generate
    exit
  '

  echo -e "${GREEN}You have successfully published your changes.${RESET}"
  
else
  echo "${RED}Failed to retrieve the IP address for $domain${RESET}"
fi