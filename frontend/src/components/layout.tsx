import { Header } from "./header";

export const Content = ({ children }: any) => (
  <div className="content-container">{children}</div>
);

export const Layout = ({ children }: any) => (
  <div id="layout">
    <Header pathName="/" />
    <Content>{children}</Content>
  </div>
);
