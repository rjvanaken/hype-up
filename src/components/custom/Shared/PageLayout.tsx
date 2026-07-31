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


export default PageLayout