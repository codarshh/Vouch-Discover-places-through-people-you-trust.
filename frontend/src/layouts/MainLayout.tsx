import React, { useState } from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { NoticeBanner } from '../components/ui/NoticeBanner';

export interface MainLayoutProps {
  children: React.ReactNode;
  showDemoNotice?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showDemoNotice = false,
}) => {
  const [noticeVisible, setNoticeVisible] = useState(showDemoNotice);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {noticeVisible && (
        <div className="bg-indigo-50/80 border-b border-indigo-100 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <NoticeBanner
              variant="demo"
              message="Phase 1 Frontend UI Prototype: Browsing with local sample data. Authentication, real Places API, and persistence are planned for subsequent phases."
              onDismiss={() => setNoticeVisible(false)}
            />
          </div>
        </div>
      )}

      <main className="flex-1 w-full">{children}</main>

      <Footer />
    </div>
  );
};
