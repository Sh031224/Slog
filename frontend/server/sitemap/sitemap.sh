
cd public

rm -rf sitemap
mkdir sitemap

cd ../

# # robots.txt 생성
# node ./robots.js

# 정적 sitemap 생성
ts-node ./server/sitemap/sitemap.ts
echo "sitemap 생성 완료"

curl https://google.com/ping?sitemap=https://slog.website/sitemap.xml
