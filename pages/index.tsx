import type { NextPage } from 'next'

import DefaultLayout from '../components/layouts/default';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import { MortgageSummaryPanel } from '../components/panels/MortgageSummaryPanel';
import { MortgageDetailPanel } from '../components/panels/MortgageDetailPanel';
import { MortgageFormPanel } from '../components/panels/MortgageFormPanel';

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <Grid stackable>
        <GridRow columns={2}>
          <GridColumn><MortgageFormPanel /></GridColumn>
          <GridColumn><MortgageSummaryPanel /></GridColumn>
        </GridRow>
        <GridRow columns={1}>
          <GridColumn><MortgageDetailPanel /></GridColumn>
        </GridRow>
      </Grid>
    </DefaultLayout>
  )
}

export default Home
