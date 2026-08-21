import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Header.module.css";

const LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/my-portfolio-30354.appspot.com/o/logo.png?alt=media&token=09825437-2b18-4e5b-b870-8d0f67db100a";

const pages = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#bbb" }}
      className={styles.header}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Image src={LOGO_URL} alt="WK-portfolio ロゴ" width={50} height={40} />
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="ナビゲーションメニューを開く"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} component={Link} href="/">
                Top
              </MenuItem>
              {pages.map((page) => (
                <MenuItem
                  key={page.href}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={page.href}
                  sx={{ textDecoration: "none", color: "#000" }}
                >
                  {page.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Image src={LOGO_URL} alt="WK-portfolio ロゴ" width={50} height={50} />
          </Typography>
          <Box
            component="nav"
            sx={{
              flexGrow: 0.3,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
            }}
            className={styles.menucmp}
          >
            <Button
              component={Link}
              href="/"
              onClick={handleCloseNavMenu}
              sx={{
                color: "white",
                display: "block",
                textAlign: "center",
              }}
            >
              Top
            </Button>
            {pages.map((page) => (
              <Button
                key={page.href}
                component={Link}
                href={page.href}
                onClick={handleCloseNavMenu}
                sx={{
                  color: "white",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
