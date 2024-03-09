import React, { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ThesisTable } from "src/sections/thesis/thesis-table";
import { ThesisSearch } from "src/sections/thesis/thesis-search";
import { applyPagination } from "src/utils/apply-pagination";
import { addThesis, viewAllThesis } from "src/utils/thesis";
import ThesisModal from "src/sections/thesis/thesis-modal";
import { useSelection } from "src/hooks/use-selection";

// Dummy data replaced by Firebase data fetching
// const data = [];

const useTheses = (page, rowsPerPage) => {
  const [theses, setTheses] = useState([]);

  useEffect(() => {
    const fetchTheses = async () => {
      const allTheses = await viewAllThesis();
      if (allTheses) {
        console.log(allTheses);
        setTheses(allTheses);
      }
    };

    fetchTheses();
  }, []);

  return useMemo(() => {
    return applyPagination(theses, page, rowsPerPage);
  }, [theses, page, rowsPerPage]);
};

const useThesisIds = (theses) => {
  return useMemo(() => {
    return theses.map((thesis) => thesis.id);
  }, [theses]);
};

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleSubmitThesis = (formData) => {
    console.log(formData);
    addThesis(formData);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theses = useTheses(page, rowsPerPage);
  const thesisIds = useThesisIds(theses);
  const thesisSelection = useSelection(thesisIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Thesis Manager</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h4">Thesis Manager</Typography>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                onClick={handleOpenModal}
              >
                Add Thesis
              </Button>
            </Stack>
            <ThesisSearch />
            {/* <ThesisTable
              count={theses.length}
              items={theses}
              onDeselectAll={thesisSelection.handleDeselectAll}
              onDeselectOne={thesisSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={thesisSelection.handleSelectAll}
              onSelectOne={thesisSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={thesisSelection.selected}
            /> */}
          </Stack>
        </Container>
      </Box>
      <ThesisModal open={openModal} handleClose={handleCloseModal} onSubmit={handleSubmitThesis} />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
