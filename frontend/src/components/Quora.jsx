import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import QuoraHeader from "./QuoraHeader";
import Sidebar from "./SidebarOptions";
import Feed from "./Feed";
import Widget from "./Widget";
import { Box, Grid, useMediaQuery, createTheme, ThemeProvider } from "@mui/material";
import "./css/Quora.css";

function Quora() {
  const user = useSelector(selectUser);
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
    },
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts here if needed
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: "background.default", color: "text.primary", minHeight: "100vh" }}>
        <QuoraHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <Grid container spacing={2} sx={{ p: { xs: 1, md: 2 }, mt: 0, justifyContent: "center" }}>
          {!isMobile && (
            <Grid item xs={false} sm={3} md={2.5} lg={2}>
              <Sidebar />
            </Grid>
          )}

          <Grid item xs={12} sm={isMobile ? 12 : 9} md={isMobile ? 12 : 7} lg={6.5}>
            <Feed posts={posts} />
          </Grid>

          {!isMobile && (
            <Grid item xs={false} sm={false} md={2.5} lg={2.5}>
              <Widget />
            </Grid>
          )}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Quora;
