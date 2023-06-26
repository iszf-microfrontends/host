import { Routes, Route } from "react-router-dom";
import { Layout } from "../widgets/layout";
import { Title } from "@mantine/core";

export function Pages(): JSX.Element | null {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Title>Hello World!</Title>} />
      </Route>
    </Routes>
  );
}
