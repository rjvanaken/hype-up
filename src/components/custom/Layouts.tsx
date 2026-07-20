import { type ReactNode } from 'react';

function PageLayout({
  children,
  maxWidth = 620,
  centerPage = false,
}: {
  children: ReactNode;
  maxWidth?: number;
  centerPage?: boolean;
}) {
  return (
    <div className={`page-layout ${centerPage ? 'page-layout-centered' : ''}`}>
      <div className="bg-blob one" />
      <div className="bg-blob two" />
      <div className="bg-blob three" />
      <div className="page-content" style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}



function TwoColumnLayout({ children, rightColumn }: { children: ReactNode; rightColumn: ReactNode }) {
  return (
    <div className="dashboard-grid">
      <div className="main-col">{children}</div>
      <div className="right-col">{rightColumn}</div>
    </div>
  );
}

export { TwoColumnLayout, PageLayout}