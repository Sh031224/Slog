import { SettingsIcon } from 'lucide-react';

import Aside from '@/shared/components/aside';
import Container from '@/shared/components/container';
import SideNav from '@/shared/components/side-nav';

type Props = {
  children: React.ReactNode;
};

export default function UserLayout({ children }: Props) {
  return (
    <div className="flex min-h-[calc(100vh-14rem)] w-full flex-col md:mt-8 md:flex-row">
      <Aside>
        <SideNav href="/settings">
          <SettingsIcon className="mr-2 h-4 w-4" />
          Settings
        </SideNav>
      </Aside>

      <Container>{children}</Container>
    </div>
  );
}
