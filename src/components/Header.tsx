import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  ButtonGroup,
  Box,
  Stack,
  Button,
  Container,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu as Menus,
  styled,
  useTheme,
  AppBarProps as MuiAppBarProps,
  useMediaQuery,
  IconButton,
  Typography,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AccountMenu } from "./AccountButton";
import { useNews } from "../hooks/news/useNews";
import { LanguageContext } from "../context/userLangctx";
import Marquee from "react-easy-marquee";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const Header = (props: { hideNewsBar: boolean }) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { language } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const news = useNews(language, 20);

  return (
    <>
      <AppBar
        sx={{
          borderBottom: (t) => `1px solid ${t.palette.primary}`,
          height: {
            xs: "100px",
            md: "120px",
          },
          // @ts-ignore
          background:
            "linear-gradient(90deg, rgba(130,24,36,1) 35%, rgba(216,83,46,1) 100%);",
          borderRadius: 0,
        }}
        position="sticky"
        elevation={0}
      >
        <Container
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" sx={{ mt: 5 }}>
              <Box component="a" display="block">
                <Box
                  component="img"
                  alt="test"
                  src="/logo.png"
                  height={{ xs: 45, md: 55, display: "block" }}
                  width="auto"
                />
              </Box>

              <Box component="a" display="block">
                <Box
                  component="img"
                  alt="test"
                  src="/logo-desc.png"
                  height={{ xs: 50, md: 70, display: "block" }}
                  width="auto"
                />
              </Box>
            </Stack>
          </Box>

          <>
            <MenuIcon
              onClick={handleDrawerOpen}
              sx={{
                fontSize: 30,
                cursor: "pointer",
                display: { xs: "flex", md: "none" },
              }}
            />

            <AccountMenu />
          </>
        </Container>
      </AppBar>

      <Box>
        <ButtonGroup
          fullWidth
          aria-label="text button group"
          variant="text"
          color="inherit"
          sx={{ fontSize: 30, display: { xs: "none", md: "flex" } }}
        >
          <Button variant="text" component={Link} to="/home">
            Home
          </Button>
          <Button component={Link} to="/news">
            News
          </Button>

          <Button component={Link} to="/gallery">
            Gallery
          </Button>

          <Button component={Link} to="/contact">
            Contact
          </Button>

          <Button variant="text" component={Link} to="/library">
            Library
          </Button>

          <Button component={Link} to="/register">
            Join Us
          </Button>
        </ButtonGroup>
      </Box>

      {props.hideNewsBar ? null : (
        <>
          <Box
            style={{ width: "100%", backgroundColor: "#EFEFEF", padding: 20 }}
          >
            <Marquee
              duration={50000}
              height="20px"
              width="100%"
              align="center"
              pauseOnHover={true}
            >
              {news.isSuccess && (
                <>
                  {news.data.data.map(
                    (article: { title: string; _id: string }) => {
                      return (
                        <Typography
                          variant="body1"
                          component={Link}
                          to={`/post/${article?._id}`}
                          key={article._id}
                          fontWeight={500}
                          style={{
                            marginLeft: 50,
                            marginRight: 50,
                            textDecoration: "none",
                          }}
                        >
                          {article?.title}
                        </Typography>
                      );
                    }
                  )}
                </>
              )}
            </Marquee>
          </Box>
        </>
      )}

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box mr={28}>
              <Stack direction="row" spacing={2}>
                <Box component="a" display="block">
                  <Box
                    component="img"
                    alt="test"
                    src="/logo.png"
                    height={{ xs: 45, md: 55, display: "block" }}
                    width="auto"
                  />
                </Box>
              </Stack>
            </Box>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <CloseIcon />
              ) : (
                <KeyboardBackspaceIcon />
              )}
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={"home"} disablePadding>
            <ListItemButton component={Link} to="/home">
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"news"} disablePadding>
            <ListItemButton component={Link} to="/news">
              <ListItemText primary={"News"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"gallery"} disablePadding>
            <ListItemButton component={Link} to="/gallery">
              <ListItemText primary={"Gallery"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"gallery"} disablePadding>
            <ListItemButton component={Link} to="/library">
              <ListItemText primary={"Library"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"contact"} disablePadding>
            <ListItemButton component={Link} to="/contact">
              <ListItemText primary={"Contact"} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"join"} disablePadding>
            <ListItemButton component={Link} to="/register">
              <ListItemText primary={"Join Us"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </>
  );
};
