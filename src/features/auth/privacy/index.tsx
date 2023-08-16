import Link from "next/link";

import { buttonVariants } from "@/shared/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/shared/components/ui/table";
import { cn } from "@/lib/utils";

export function Privacy() {
  return (
    <article className="h-auto w-full py-6 lg:py-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight transition-colors lg:text-5xl">
        개인정보 처리 방침
      </h1>

      <ul className="mt-10 flex w-fit flex-col gap-2">
        <Link
          href="#1"
          className={cn(
            buttonVariants({ variant: "link" }),
            "h-fit w-fit py-0 text-muted-foreground"
          )}
        >
          <li>1. 개인정보의 처리 목적</li>
        </Link>

        <Link
          href="#2"
          className={cn(
            buttonVariants({ variant: "link" }),
            "h-fit w-fit py-0 text-muted-foreground"
          )}
        >
          <li>2. 수집하는 개인정보의 처리 및 보유 기간</li>
        </Link>

        <Link
          href="#3"
          className={cn(
            buttonVariants({ variant: "link" }),
            "h-fit w-fit py-0 text-muted-foreground"
          )}
        >
          <li>3. 처리하는 개인정보의 항목</li>
        </Link>

        <Link
          href="#4"
          className={cn(
            buttonVariants({ variant: "link" }),
            "h-fit w-fit py-0 text-muted-foreground"
          )}
        >
          <li>4. 개인정보의 파기절차 및 파기방법</li>
        </Link>

        <Link
          href="#5"
          className={cn(
            buttonVariants({ variant: "link" }),
            "h-fit w-fit py-0 text-muted-foreground"
          )}
        >
          <li>5. 개인정보의 안전성 확보조치에 관한 사항</li>
        </Link>

        <Link
          href="#6"
          className={cn(
            buttonVariants({ variant: "link" }),
            "h-fit w-fit py-0 text-muted-foreground"
          )}
        >
          <li>6. 개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항</li>
        </Link>

        <Link
          href="#7"
          className={cn(
            buttonVariants({ variant: "link" }),
            "h-fit w-fit py-0 text-muted-foreground"
          )}
        >
          <li>7. 정보주체의 권익침해에 대한 구제방법</li>
        </Link>
      </ul>

      <h2
        id="1"
        className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors"
      >
        1. 개인정보의 처리 목적
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Slog(이하 &quot;사이트&quot;) 는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를
        보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
        개인정보 처리방침을 수립·공개합니다.
      </p>

      <p className="leading-7 [&:not(:first-child)]:mt-6">1) 사이트 회원가입 및 관리</p>

      <ul>
        <li className="pl-4 leading-7">
          사이트 회원가입 및 관리 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증
          목적으로 개인정보를 처리합니다.
        </li>
      </ul>

      <h2
        id="2"
        className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors"
      >
        2. 수집하는 개인정보의 처리 및 보유 기간
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        사이트는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
        동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
        <span className="inline-block">각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</span>
      </p>

      <p className="leading-7 [&:not(:first-child)]:mt-6">1) 사이트 회원가입 및 관리</p>

      <ul>
        <li className="pl-4 leading-7">
          홈페이지 회원가입 및 관리와 관련한 개인정보는 수집.이용에 관한 동의일로부터 준영구 까지 위
          이용목적을 위하여 보유.이용됩니다.
        </li>
      </ul>

      <h2
        id="3"
        className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors"
      >
        3. 처리하는 개인정보의 항목
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        사이트는 다음의 개인정보 항목을 처리하고 있습니다.
      </p>

      <p className="leading-7 [&:not(:first-child)]:mt-6">1) 사이트 회원가입 및 관리</p>

      <ul>
        <li className="pl-4 leading-7">필수 항목: 접속 IP 정보, 쿠키, 접속 로그, 이메일</li>
      </ul>

      <h2
        id="4"
        className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors"
      >
        4. 개인정보의 파기절차 및 파기방법
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        사이트는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
        지체없이 해당 개인정보를 파기합니다.
      </p>

      <p className="leading-7 [&:not(:first-child)]:mt-6">1) 파기절차</p>

      <ul>
        <li className="pl-4 leading-7">파기 사유가 발생한 개인정보를 선정하고 즉시 파기합니다.</li>
      </ul>

      <p className="leading-7 [&:not(:first-child)]:mt-6">2) 파기방법</p>

      <ul>
        <li className="pl-4 leading-7">
          전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.
        </li>
      </ul>

      <h2
        id="5"
        className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors"
      >
        5. 개인정보의 안전성 확보조치에 관한 사항
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        사이트는 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
      </p>

      <p className="leading-7 [&:not(:first-child)]:mt-6">1) 개인정보에 대한 접근 제한</p>

      <ul>
        <li className="pl-4 leading-7">
          개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경을 통하여 개인정보에
          대한 접근통제를 위하여 필요한 조치를 하고 있습니다.
        </li>
      </ul>

      <h2
        id="6"
        className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors"
      >
        6. 개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항
      </h2>

      <p className="leading-7 [&:not(:first-child)]:mt-6">
        1) 사이트는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로
        불러오는 쿠키(cookie)를 사용합니다.
      </p>

      <ul>
        <li className="pl-4 leading-7">
          개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경을 통하여 개인정보에
          대한 접근통제를 위하여 필요한 조치를 하고 있습니다.
        </li>
      </ul>

      <p className="leading-7 [&:not(:first-child)]:mt-6">
        2) 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는
        소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.
      </p>

      <ul>
        <li className="pl-4 leading-7">
          가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태,
          인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.
        </li>

        <li className="mt-3 pl-4 leading-7">
          나. 쿠키의 설치 및 운영 및 거부 : 웹브라우저 상단의 도구&gt;인터넷 옵션&gt;개인정보 메뉴의
          옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.
        </li>

        <li className="mt-3 pl-4 leading-7">
          다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
        </li>
      </ul>

      <h2
        id="7"
        className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors"
      >
        7. 정보주체의 권익침해에 대한 구제방법
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원
        개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타
        개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
      </p>

      <p className="leading-7 [&:not(:first-child)]:mt-6">1) 개인정보에 대한 접근 제한</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>처리기관</TableHead>
            <TableHead>연락처</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>개인정보분쟁조정위원회</TableCell>
            <TableCell>(국번없이) 1833-6972 (www.kopico.go.kr)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>개인정보침해신고센터</TableCell>
            <TableCell>(국번없이) 118 (privacy.kisa.or.kr)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>대검찰청</TableCell>
            <TableCell>(국번없이) 1301 (www.spo.go.kr)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>경찰청</TableCell>
            <TableCell>(국번없이) 182 (ecrm.cyber.go.kr)</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <p className="leading-7 [&:not(:first-child)]:mt-6">
        「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의
        처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여
        권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수
        있습니다.
        <p>
          ※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기
          바랍니다.
        </p>
      </p>

      <p className="leading-7 [&:not(:first-child)]:mt-8">공고일자: 2023년 07월 10일</p>
      <p className="leading-7 [&:not(:first-child)]:mt-2">시행일자: 2023년 08월 20일</p>
    </article>
  );
}
