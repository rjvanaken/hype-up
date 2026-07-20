import type { ReactNode } from "react";

function TwoColumnLayout({ children, rightColumn }: { children: ReactNode; rightColumn: ReactNode }) {
  return (
    <div className="dashboard-grid">
      <div className="main-col">{children}</div>
      <div className="right-col">{rightColumn}</div>
    </div>
  );
}

export default TwoColumnLayout