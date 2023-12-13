import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/requestApi";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
