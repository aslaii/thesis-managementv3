import Head from "next/head";
import { Box, Divider, Card, CardHeader, Container, Stack, Typography } from "@mui/material";
import { SettingsNotifications } from "src/sections/settings/settings-notifications";
import { SettingsPassword } from "src/sections/settings/settings-password";
import { SendMockData } from "src/sections/mockdata/mockdata-send";
import MockTable from "src/sections/mockdata/mocktable";
import MockMetrics from "src/sections/mockdata/mockmetrics";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => (
  <>
    <Head>
      <title>MockData | Trash </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2}>
          <Card>
            <CardHeader
              subheader="Sending mock data to the Firebase Realtime Database"
              title="Mock Data"
            />
            <Divider />
            <Stack direction="row" spacing={0}>
              <SendMockData name="Biodegradable" weight={25} />
              <SendMockData name="Recylable" weight={60} />
            </Stack>
            <MockMetrics></MockMetrics>
            <MockTable></MockTable>
          </Card>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
