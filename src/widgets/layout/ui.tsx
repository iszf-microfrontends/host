import { AppShell, Navbar, Header } from "@mantine/core";
import { Outlet } from "react-router-dom";

export function Layout(): JSX.Element | null {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height="100%" p="xs">
          {/* Navbar content */}
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}
