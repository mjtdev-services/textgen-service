curl -fsSL https://bun.sh/install | bash
apt-get update
apt-get install curl
curl -fsSL https://bun.sh/install | bash
apt-get install unzip
curl -fsSL https://bun.sh/install | bash
bun --help
vi ~/.bash_profile
echo "export BUN_INSTALL="$HOME/.bun" >> ~/.bash_profile
echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bash_profile
echo 'export PATH=$BUN_INSTALL/bin:$PATH' >> ~/.bash_profile 
. ~/.bash_profile 
which bun
bun --version
rm -rf node_modules/
exit
bun dist/index.js 
. ~/.bash_profile 
bun dist/index.js 
exit
. ~/.bash_profile 
bun dist/index.js 
bun dist/index.js 
exit
