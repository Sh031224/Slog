
cd public

rm -rf sitemap
mkdir sitemap

cd ../

# # robots.txt 생성
# node ./robots.js

# 정적 sitemap 생성
echo "정적 sitemap 생성중.."
ts-node ./server/sitemap/sitemap-static.ts
echo "정적 sitemap 생성 완료!"

#동적 sitemap 생성
echo "동적 sitemap 조회 및 생성중.."
ts-node ./server/sitemap/sitemap-post.ts
echo "동적 sitemap 생성 완료!"

# sitemap 압축 및 병합
echo "sitemap gzip 압축중"
ts-node ./server/sitemap/sitemap-compress.ts
ts-node ./server/sitemap/sitemap.ts
echo "sitemap 압축 완료"

curl https://google.com/ping?sitemap=https://slog.website/sitemap.xml
