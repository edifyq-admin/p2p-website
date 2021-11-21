import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import DefaultLayout from '../components/layouts/default';
import { MortgageInputForm } from '../components/forms/MortgageInputForm';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import { MortgageSummaryPanel } from '../components/panels/MortgageSummaryPanel';
import { MortgageDetailPanel } from '../components/panels/MortgageDetailPanel';

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <Grid>
        <GridRow columns={2}>
          <GridColumn><MortgageInputForm /></GridColumn>
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
